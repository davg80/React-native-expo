import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { useFirebase } from '../Hooks/useFirebase';
import { useMovies } from '../Hooks/useMovies';

const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";
const HomeScreen = () => {
    const { user } = useFirebase();
    const { movies } = useMovies();
    console.log(movies);

    const listMovies = () => {

    };
    return (
        <View style={styles.containerMovies}>
            <HeaderComponent user={user}></HeaderComponent>
            {
                movies.map((movie) => {
                    return (
                        <View key={movie.id} style={{ margin: 10 }}>
                            <Text>{movie.title}</Text>
                            <Text>{movie.overview}</Text>
                        </View>
                    );
                })
            }
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