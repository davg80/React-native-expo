import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import { BLUE_BG, BLUE_LIGHT_BG, GRAY_LIGHT, RED, WHITE, OUTER_SPACE } from '../Constantes';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { deleteDoc, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import BottomBarComponent from '../components/BottomBarComponent';
import { useFirebase } from '../Hooks/useFirebase';
import HeaderComponent from '../components/HeaderComponent';

const EditPostScreen = ({ route, navigation }) => {
    const { db, user } = useFirebase();
    const { itemId } = route.params;
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState("");
    const [post, setPost] = useState([]);
    const getPost = async () => {
        const querySnapshot = await getDoc(doc(db, "posts", itemId));
        if (querySnapshot.exists()) {
            setPost(querySnapshot.data());
            setTitle(querySnapshot.data().title)
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
        if (title !== "" && description !== "") {
            try {
                // Add a new document in collection "posts"
                await setDoc(doc(db, "posts", title), {
                    title: title,
                    description: description,
                    author: user,
                    like: post.like,
                    comments: post.comments
                });
                Toast.show({
                    type: 'success',
                    text2: 'Votre post a été modifié avec succés! 👋'
                });
                navigation.navigate('Movies');
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
    return (
        <View style={styles.containerEditPost}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderComponent user={user}></HeaderComponent>
                <View style={styles.cardEditPost}>
                    <Text style={styles.title}>Modification</Text>
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
                            <Text style={styles.buttonText}>Modifier votre Post</Text>
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
});