import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const image = {
    uri: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9j21DXo7Gwtfxj81iC20AbOqumt.jpg"
}
const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";
const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "center" }}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View>
                    <Text style={styles.title}>Get an amazing movie & TV Shows</Text>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity>
                        <View style={styles.button}>
                            <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}> Got to Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.button}>
                            <Text style={styles.buttonText} onPress={() => navigation.navigate('Register')}>Go to Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
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
        color: "#F1F1F1",
    },
    title: {
        textAlign: "center",
        color: WHITE,
        fontWeight: 'bold',
        fontSize: 22,
        backgroundColor: RED
    },
    container: {
        width: 500,
        display: 'flex',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    image: {
        flex: 1,
        justifyContent: "center"
    }
});

export default HomeScreen;