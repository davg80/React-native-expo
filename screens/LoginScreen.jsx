import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { useFirebase } from '../Hooks/useFirebase';

const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";


const image = {
    uri: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/t9JGg10CW1DzXEdWL54ewkUko6N.jpg"
}
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const { auth, db, user, setUser } = useFirebase()

    const submit = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const newUser = userCredential.user;
                // Read data
                getDoc(doc(db, "users", newUser.email.toLowerCase())).then(currentUser => {
                    if (currentUser.exists()) {
                        console.log("Document data:", currentUser.data());
                        setUser(currentUser.data());
                    } else {
                        console.log("No such document!");
                    }
                })
                Toast.show({
                    type: 'success',
                    text2: `Bienvenue ${user.lastname} ${user.firstname} et bonne visite!! 👋`
                });
                navigation.navigate('Movies')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(error.message);
                Toast.show({
                    type: 'error',
                    text2: 'Une erreur est survenue👋'
                });
            });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.boxCard}>
                    <View style={[styles.card, styles.elevation]}>
                        <Text style={styles.title}>Log in now!</Text>
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
                            selectionColor={RED}
                            secureTextEntry={true}
                            placeholder="Enter your password"
                            onChangeText={setPassword}
                            defaultValue={password}
                        />
                        {error !== "" && <Text style={{ fontSize: 9, color: RED }}>{error}</Text>}
                        <TouchableOpacity onPress={submit}>
                            <View style={styles.button} >
                                <Text style={styles.buttonText}> Login</Text>
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
        borderRadius: 8,
        opacity: .7,
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

export default LoginScreen;