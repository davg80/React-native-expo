import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import { BLUE_BG, BLUE_LIGHT_BG, GRAY_LIGHT, RED, WHITE, OUTER_SPACE } from '../Constantes';
import Toast from 'react-native-toast-message';
import { deleteDoc, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import BottomBarComponent from '../components/BottomBarComponent';
import { firebaseApp, useFirebase } from '../Hooks/useFirebase';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import HeaderComponent from '../components/HeaderComponent';

const EditPostScreen = ({ route, navigation }) => {
    const { db, user } = useFirebase();
    const { itemId } = route.params;
    const [description, setDescription] = useState('');
    const [error, setError] = useState("");
    const [post, setPost] = useState([]);
    const [image, setImage] = useState(null);
    const getPost = async () => {
        const querySnapshot = await getDoc(doc(db, "posts", itemId));
        if (querySnapshot.exists()) {
            setPost(querySnapshot.data());
            setDescription(querySnapshot.data().description)
        } else {
            Toast.show({
                type: 'error',
                text2: `Erreur de récupération des données!`
            });
        }
    }
    useEffect(async () => {
        getPost();
    }, [])

    const submit = async () => {
        if (description !== "" || image !== "") {
            console.log('Image =>', image);
            //Upload Image
            const storage = await getStorage(firebaseApp);

            const res = await fetch(image);
            const blob = await res.blob();

            const photoPath = `/posts/${itemId}`;

            const storageRef = ref(storage, photoPath);
            const metadata = {
                contentType: 'image/jpeg',
            };
            await uploadBytes(storageRef, blob, metadata);
            const url = await getDownloadURL(storageRef);

            try {
                // Add a new document in collection "posts"
                await setDoc(doc(db, "posts", itemId), {
                    title: post.title,
                    description: description,
                    author: user,
                    like: post.like,
                    comments: post.comments,
                    image: url,
                });
                Toast.show({
                    type: 'success',
                    text2: 'Votre post a été modifié avec succés! 👋'
                });
                navigation.navigate('ListPosts');
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code);
                setError(error.message);
                Toast.show({
                    type: 'error',
                    text2: `Une erreur est survenue lors de la modification du post👋`
                });
            }
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return (
        <View style={styles.containerEditPost}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderComponent user={user}></HeaderComponent>
                <View style={styles.cardEditPost}>
                    <Text style={styles.title}>Modification</Text>
                    {image !== null &&
                        < View style={styles.boxImage}>
                            <Image source={{ uri: image }} style={styles.imageUpload} />
                        </View>
                    }
                    <View style={styles.containerUpload}>
                        <TouchableOpacity onPress={pickImage}>
                            <View style={styles.button} >
                                <Text style={styles.buttonText}>   <Entypo name="circle-with-plus" size={18} color="white" />Choose Picture</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textAreaContainer} >
                        <TextInput
                            style={styles.textArea}
                            multiline={true}
                            numberOfLines={4}
                            selectionColor={RED}
                            placeholder="Enter your description"
                            placeholderTextColor={GRAY_LIGHT}
                            onChangeText={setDescription}
                            defaultValue={description}
                        />
                    </View>
                    {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                    <TouchableOpacity onPress={submit}>
                        <View style={styles.button} >
                            <Text style={styles.buttonText}>Modifier votre synopsis</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView >
            <BottomBarComponent />
        </View >
    )
}

export default EditPostScreen

const styles = StyleSheet.create({
    containerEditPost: {
        flex: 1,
        backgroundColor: BLUE_BG,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardEditPost: {
        flex: 1,
        width: 350,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginBottom: 25,
        padding: 30,
    },
    textInput: {
        height: 40,
        backgroundColor: WHITE,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        padding: 4,
        color: OUTER_SPACE,
        borderBottomColor: "red",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    textAreaContainer: {
        borderColor: GRAY_LIGHT,
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 20,
        color: RED
    },
    button: {
        height: 40,
        margin: 12,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 15,
        backgroundColor: RED,
        elevation: 4,
        borderWidth: 0,
        textAlign: "center"
    },
    buttonText: {
        color: GRAY_LIGHT,
        fontSize: 15
    },
    textInput: {
        height: 40,
        backgroundColor: WHITE,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        padding: 4,
        color: OUTER_SPACE,
        borderBottomColor: "red",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    boxImage: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageUpload: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerUpload: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});