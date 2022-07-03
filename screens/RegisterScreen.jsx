import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { BLUE_LIGHT_BG, GRAY_LIGHT, BLUE_BG, RED, WHITE } from '../Constantes';
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { useFirebase } from '../Hooks/useFirebase.js';


const image = { uri: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kldfJdqlSVro8yrhaAWnMcAgd0r.jpg" }


const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState("");
    const { auth, db, user, setUser } = useFirebase();
    const submit = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                newUser = userCredential.user;
                // console.log("User" + newUser);
                // Register data
                setDoc(doc(db, "users", email.toLowerCase()), {
                    email: email.toLowerCase(),
                    firstname: firstname,
                    lastname: lastname
                });
                Toast.show({
                    type: 'success',
                    text2: 'Bravo! vous faites partie de notre communauté!! 👋'
                });
                navigation.navigate('Login');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code);
                setError(error.message);
                Toast.show({
                    type: 'error',
                    text2: 'Une erreur est survenue👋'
                });
            });
    }
    //console.log(auth);
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.boxCard}>
                    <View style={[styles.card, styles.elevation]}>
                        <Text style={styles.title}>Create an account!</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your email"
                            onChangeText={setEmail}
                            placeholderTextColor={GRAY_LIGHT}
                            defaultValue={email}
                            keyboardType="email-address"
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            onChangeText={setPassword}
                            placeholderTextColor={GRAY_LIGHT}
                            secureTextEntry={true}
                            defaultValue={password}
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your firstname"
                            onChangeText={setFirstname}
                            placeholderTextColor={GRAY_LIGHT}
                            defaultValue={firstname}
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your lastname"
                            onChangeText={setLastname}
                            placeholderTextColor={GRAY_LIGHT}
                            defaultValue={lastname}
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TouchableOpacity onPress={submit}>
                            <View style={styles.button} >
                                <Text style={styles.buttonText}> Register</Text>
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

export default SignUpScreen;