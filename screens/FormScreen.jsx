import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { BLUE_LIGHT_BG, GRAY_LIGHT, BLUE_BG, RED, WHITE } from '../Constantes';
import { doc, setDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { useFirebase } from '../Hooks/useFirebase.js';

const image = { uri: `https://www.themoviedb.org/t/p/w1280/555u92RGJOrQnWAxXxcUGZouREu.jpg` };

const FormScreen = ({ navigation }) => {
    const { db, user } = useFirebase();
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState("");
    const submit = async () => {
        if (title !== "" && description !== "") {
            try {
                // Add a new document in collection "posts"
                await setDoc(doc(db, "posts", title), {
                    title: title,
                    description: description,
                    user: user
                });
                Toast.show({
                    type: 'success',
                    text2: 'Votre post a été ajouté avec succés! 👋'
                });
                navigation.navigate('ListPosts');
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

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.boxCard}>
                    <View style={[styles.card, styles.elevation]}>
                        <Text style={styles.title}>Ajouter un post</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
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
    }
});

export default FormScreen;