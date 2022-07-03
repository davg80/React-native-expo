import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { BLUE_LIGHT_BG, GRAY_LIGHT, BLUE_BG, RED, WHITE } from '../Constantes';
import { doc, Firestore, setDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { useFirebase } from '../Hooks/useFirebase.js';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import storage from '@react-native-firebase/storage';
import BottomBarComponent from '../components/BottomBarComponent';

const imageBg = { uri: `https://www.themoviedb.org/t/p/w1280/555u92RGJOrQnWAxXxcUGZouREu.jpg` };

const FormScreen = ({ navigation }) => {
    const { db, user } = useFirebase();
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState("");

    const submit = async () => {
        if (title !== "" && description !== "") {
            //Upload Image

            try {
                // Add a new document in collection "posts"
                await setDoc(doc(db, "posts", title), {
                    title: title,
                    description: description,
                    author: user,
                    like: false,
                    comments: []
                });
                Toast.show({
                    type: 'success',
                    text2: 'Votre post a été ajouté avec succés! 👋'
                });
                navigation.navigate('Movies');
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code);
                setError(error.message);
                Toast.show({
                    type: 'error',
                    text2: `Une erreur est survenue lors de l'ajout du post👋`
                });
            }
        }
    }

    const [image, setImage] = useState(null);

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
        <View style={{ flex: 1 }}>
            <ImageBackground source={imageBg} resizeMode="cover" style={styles.image}>
                <View style={styles.boxCard}>
                    <View style={[styles.card, styles.elevation]}>
                        <Text style={styles.title}>Ajouter un post</Text>
                        {image !== null && < View style={styles.boxImage}>
                            <Image source={{ uri: image }} style={styles.imageUpload} />
                        </View>}
                        <View style={styles.containerUpload}>
                            <TouchableOpacity onPress={pickImage}>
                                <View style={styles.button} >
                                    <Text style={styles.buttonText}>   <Entypo name="circle-with-plus" size={18} color="white" />Choose Picture</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your title"
                            placeholderTextColor={GRAY_LIGHT}
                            onChangeText={setTitle}
                            defaultValue={title}
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TextInput
                            style={styles.textInput}
                            selectionColor={RED}
                            placeholder="Enter your description"
                            placeholderTextColor={GRAY_LIGHT}
                            onChangeText={setDescription}
                            defaultValue={description}
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TouchableOpacity onPress={submit}>
                            <View style={styles.button} >
                                <Text style={styles.buttonText}>Ajouter un Post</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <BottomBarComponent />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 20,
        color: GRAY_LIGHT
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
        color: GRAY_LIGHT,
        borderBottomColor: "red",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    boxCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: BLUE_LIGHT_BG,
        borderRadius: 8,
        opacity: .7,
        paddingVertical: 45,
        paddingHorizontal: 25,
        marginVertical: 10,
        width: 300
    },
    elevation: {
        elevation: 6,
        shadowColor: BLUE_LIGHT_BG,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: BLUE_BG
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

export default FormScreen;