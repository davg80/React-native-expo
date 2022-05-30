import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";
const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your name"
                    onChangeText={newText => setName(newText)}
                    defaultValue={name}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
                    onChangeText={newText => setPassword(newText)}
                    secureTextEntry={true}
                    defaultValue={password}
                />
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}> Sign Up</Text>
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