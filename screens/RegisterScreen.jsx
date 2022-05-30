import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { firebaseConfig } from '../config.js';
import { initializeApp } from "@firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const submit = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                setDoc(doc(db, "users", email), {
                    email: email,
                    firstname: "firstname",
                    lastname: "lastname"
                });
                console.log(user => user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error.code);
                setError(error.message);
            });
    }
    //console.log(auth);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
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
                <TouchableOpacity onPress={submit}>
                    <View style={styles.button} >
                        <Text style={styles.buttonText}> Register</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        color: "#F1F1F1"
    },
    textInput: {
        height: 40,
        backgroundColor: WHITE,
        color: LIGHT_GRAY,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10
    }
});

export default SignUpScreen;