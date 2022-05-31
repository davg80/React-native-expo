import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { useFirebase } from '../Hooks/useFirebase';

const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";
const HomeScreen = () => {
    const { user } = useFirebase();
    console.log("user => " + user.email);
    return (
        <View style={styles.containerMovies}>
            <HeaderComponent user={user}></HeaderComponent>
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