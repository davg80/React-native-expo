import React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}>Get an amazing movie & TV Shows</Text>
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}> Got to Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => navigation.navigate('SignUp')}>Go to Sign Up</Text>
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
    },
    buttonText: {
        color: "#F1F1F1"
    },
    container: {
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    }
});

export default HomeScreen;