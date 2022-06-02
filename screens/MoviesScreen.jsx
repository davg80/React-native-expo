import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Dimensions } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { useFirebase } from '../Hooks/useFirebase';
import { useMovies } from '../Hooks/useMovies';

const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";
const HomeScreen = () => {
    const BASE_URL_IMAGE = "https://image.tmdb.org/t/p/w200";
    const { user } = useFirebase();
    const { movies } = useMovies();
    console.log(movies);

    return (
        <View style={styles.containerMovies}>
            <HeaderComponent user={user}></HeaderComponent>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    movies.map((movie) => {
                        return (
                            <View key={movie.id} style={styles.cardMovie}>
                                <Image
                                    source={{ uri: `${BASE_URL_IMAGE}${movie.poster_path}` }}
                                    style={styles.poster}
                                />
                                <Text style={styles.cardTitle}>{movie.title}</Text>
                                <Text style={styles.cardOverview}>{movie.overview}</Text>
                            </View>
                        );
                    })
                }
            </ScrollView >
        </View >
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
    },
    cardMovie: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: RED,
        marginBottom: 25,
        padding: 30,
    },
    poster: {
        width: 350,
        height: 500,
        borderRadius: 15,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: WHITE
    },
    cardOverview: {
        color: WHITE,
        textAlign: 'justify'
    }
});

export default HomeScreen;