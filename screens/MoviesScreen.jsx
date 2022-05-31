import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useFirebase } from '../Hooks/useFirebase';

const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";
const HomeScreen = () => {
    const { user } = useFirebase();
    console.log("user => " + user.email);
    return (
        <View style={styles.containerMovies}>
            <View style={styles.boxUsername}>
                <View>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/avatar.png')}
                    />
                </View>
                <View>
                    {user !== null && <Text style={styles.userText}>Bonjour {user.firstname} {user.lastname}</Text>}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerMovies: {
        marginTop: 40
    },
    boxUsername: {
        backgroundColor: RED,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10
    },
    userText: {
        color: WHITE,
        textTransform: 'uppercase',
        marginLeft: 10
    },
    avatar: {
        width: 40,
        height: 40,
    }
});

export default HomeScreen;