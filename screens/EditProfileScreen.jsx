import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { BLUE_BG, BLUE_LIGHT_BG, GRAY_LIGHT, RED, WHITE, OUTER_SPACE } from '../Constantes';
import Toast from 'react-native-toast-message';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { firebaseApp, useFirebase } from '../Hooks/useFirebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import BottomBarComponent from '../components/BottomBarComponent';

const EditProfileScreen = ({ route, navigation }) => {
    const { db, user } = useFirebase();
    const { itemId } = route.params;
    const [image, setImage] = useState(user.image);
    const [email, setEmail] = useState(user.firstname);
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [error, setError] = useState("");

    console.log("User => ", user);

    const submit = async () => {
        if ((email !== "" || firstname !== "" || lastname !== "") || image !== "") {

            console.log('Image =>', image);
            //Upload Image
            const storage = await getStorage(firebaseApp);

            const res = await fetch(image);
            const blob = await res.blob();

            const photoPath = `/posts/${email}`;

            const storageRef = ref(storage, photoPath);
            const metadata = {
                contentType: 'image/jpeg',
            };
            await uploadBytes(storageRef, blob, metadata);
            const url = await getDownloadURL(storageRef);

            try {
                // Add a new document in collection "posts"
                await setDoc(doc(db, "users", email), {
                    firstname: firstname,
                    lastname: lastname,
                    image: url
                });
                Toast.show({
                    type: 'success',
                    text2: 'Votre profil a été modifié avec succés! 👋'
                });
                navigation.navigate('Movies');
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code);
                setError(error.message);
                Toast.show({
                    type: 'error',
                    text2: `Une erreur est survenue lors de la modification du profil.👋`
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
        <View style={styles.containerProfile}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderComponent user={user}></HeaderComponent>
                <View style={styles.boxCard}>
                    <View style={[styles.card, styles.elevation]}>
                        <Text style={styles.title}>Modifier mon profil</Text>
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
                            selectionColor={RED}
                            placeholder="Modify your firstname"
                            placeholderTextColor={GRAY_LIGHT}
                            onChangeText={setFirstname}
                            defaultValue={firstname}
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TextInput
                            style={styles.textInput}
                            selectionColor={RED}
                            placeholder="Modify your lastname"
                            placeholderTextColor={GRAY_LIGHT}
                            onChangeText={setLastname}
                            defaultValue={lastname}
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TouchableOpacity onPress={submit}>
                            <View style={styles.button} >
                                <Text style={styles.buttonText}>Change my profile</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <BottomBarComponent />
        </View>
    )
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    containerProfile: {
        flex: 1,
        backgroundColor: BLUE_BG,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerInfoProfileAvatar: {
        marginBottom: 20
    },
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
        justifyContent: 'center',
        borderRadius: 50
    },
    containerUpload: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});