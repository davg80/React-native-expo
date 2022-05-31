import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { useFirebase } from '../Hooks/useFirebase.js';

const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";

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
                user = userCredential.user;
                // Register data
                setDoc(doc(db, "users", email), {
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.boxCard}>
                    <View style={[styles.card, styles.elevation]}>
                        <Text style={styles.title}>Create an account!</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your email"
                            onChangeText={setEmail}
                            defaultValue={email}
                            keyboardType="email-address"
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password"
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            defaultValue={password}
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your firstname"
                            onChangeText={setFirstname}
                            defaultValue={firstname}
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your lastname"
                            onChangeText={setLastname}
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
    },
    button: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 15,
        backgroundColor: "#f92045",
        elevation: 4,
        borderWidth: 0,
        textAlign: "center"
    },
    buttonText: {
        color: "#F1F1F1",
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
        borderBottomColor: "red",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    boxCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: 'white',
        opacity: .7,
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal: 25,
        marginVertical: 10,
        width: 300
    },
    elevation: {
        elevation: 20,
        shadowColor: '#52006A',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: '100%'
    }
});

export default SignUpScreen;