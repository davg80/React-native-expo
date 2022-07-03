import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import { BLUE_BG, BLUE_LIGHT_BG, GRAY_LIGHT, RED, WHITE, OUTER_SPACE } from '../Constantes';
import Toast from 'react-native-toast-message';
import { deleteDoc, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import BottomBarComponent from '../components/BottomBarComponent';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFirebase } from '../Hooks/useFirebase';
import HeaderComponent from '../components/HeaderComponent';

function ProfileScreen() {
    const { db, user } = useFirebase();
    console.log(user);

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
        <View style={styles.containerProfile}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderComponent user={user}></HeaderComponent>
                <View style={styles.cardProfile} >
                    <Entypo name="user" size={36} color="white" style={{ marginBottom: 10 }} />
                    <View style={styles.containerInfoProfileAvatar}>
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
                    </View>
                    <View style={styles.containerInfoProfile}>
                        <Entypo name="mail" size={24} color="white" />
                        <Text style={styles.infoProfile}>{user.email}</Text>
                    </View>
                    <View style={styles.containerInfoProfile}>
                        <Entypo name="v-card" size={24} color="white" />
                        <Text style={styles.infoProfile}>{user.firstname} {user.lastname}</Text>
                    </View>
                    <View style={styles.containerInfoProfile}>
                        <Text style={styles.infoProfile}>Cette application permet de sauvegarder vos films. Qui n'a pas essayer de parler d'un film qu'il avait vu, sans se souvenir du titre. Avec cette application, le 7 ème art ne sera plus un vague souvenir!</Text>
                    </View>
                </View>
            </ScrollView >
            <BottomBarComponent />
        </View >
    )
}

export default ProfileScreen
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
    cardProfile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BLUE_BG,
        marginBottom: 25,
        padding: 30,
    },
    infoProfile: {
        color: "white",
        fontStyle: 'italic',
        fontSize: 22,
        margin: 10
    },
    buttonText: {
        color: GRAY_LIGHT,
        fontSize: 15
    },
    containerInfoProfile: {
        flexDirection: 'row',
        alignItems: 'center'
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