import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { BLUE_LIGHT_BG, GRAY_LIGHT, BLUE_BG, RED } from '../Constantes';
import { Entypo } from '@expo/vector-icons';

const image = {
    uri: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9j21DXo7Gwtfxj81iC20AbOqumt.jpg"
}

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={RED} animated={true} />
            <ImageBackground resizeMode="contain" style={styles.image}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        resizeMode="contain"
                        source={image}
                        style={styles.posterHome}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', textAlign: "center" }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Get amazing movie & Tv shows with new movies on demand app...
                            Join us!!</Text>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "center" }}>
                                <Entypo name="login" size={24} color="white" />
                                <Text style={styles.buttonText} > Go to Login</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "center" }}>
                                <Entypo name="circle-with-plus" size={24} color="white" />
                                <Text style={styles.buttonText}>Go to Register</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 120,
        margin: 12,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        backgroundColor: BLUE_LIGHT_BG,
        elevation: 5,
        borderWidth: 0,
        textAlign: 'center'
    },
    posterHome: {
        flex: 1,
        width: 350,
        marginTop: 20,
        borderRadius: 15
    },
    buttonText: {
        color: GRAY_LIGHT,
    },
    title: {
        textAlign: "center",
        width: 350,
        color: GRAY_LIGHT,
        fontWeight: 'bold',
        fontSize: 22,
        backgroundColor: BLUE_LIGHT_BG,
        elevation: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        padding: 15
    },
    container: {
        flex: 1,
        display: 'flex',
        marginTop: 15,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    image: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: BLUE_BG
    },
    logo: {
        width: 150,
        height: 150,
    },
});

export default HomeScreen;