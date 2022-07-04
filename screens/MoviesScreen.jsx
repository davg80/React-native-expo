import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { BLUE_BG, BLUE_LIGHT_BG, GRAY_LIGHT, RED } from '../Constantes';
import { useFirebase } from '../Hooks/useFirebase';
import { useMovies } from '../Hooks/useMovies';
import BottomBarComponent from '../components/BottomBarComponent';


const HomeScreen = ({ navigation }) => {
    const BASE_URL_IMAGE = "https://image.tmdb.org/t/p/w200";
    const { user } = useFirebase();
    const { movies } = useMovies();
    //console.log(movies);

    return (
        <View style={styles.containerMovies}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderComponent user={user}></HeaderComponent>
                {movies.length <= 0 && <ActivityIndicator size="small" color={RED} />}
                {
                    movies.map((movie) => {
                        return (
                            <View key={movie.id} style={styles.cardMovie} >
                                <Image
                                    resizeMode="contain"
                                    source={{ uri: `${BASE_URL_IMAGE}${movie.poster_path}` }}
                                    style={styles.poster}
                                />
                                <TouchableOpacity onPress={() => navigation.push('Details', { itemId: movie.id })}>
                                    <View style={styles.button} >
                                        <Text style={styles.buttonText}>Voir plus</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })
                }
            </ScrollView >
            <BottomBarComponent />
        </View >
    );
}

const styles = StyleSheet.create({
    containerMovies: {
        flex: 1,
        backgroundColor: BLUE_BG
    },
    cardMovie: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BLUE_BG,
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
        backgroundColor: BLUE_LIGHT_BG,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        color: GRAY_LIGHT,
        borderRadius: 15,
    },
    cardOverview: {
        backgroundColor: BLUE_LIGHT_BG,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        color: GRAY_LIGHT,
        textAlign: 'justify',
        borderRadius: 15,
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
        color: GRAY_LIGHT,
        fontSize: 15
    }
});

export default HomeScreen;