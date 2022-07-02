import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { BLUE_BG, BLUE_LIGHT_BG, GRAY_LIGHT, RED, WHITE } from '../Constantes';
import Toast from 'react-native-toast-message';
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from '../Hooks/useFirebase.js';
import BottomBarComponent from '../components/BottomBarComponent';


const ListPostScreen = ({ navigation }) => {

    const { db, user } = useFirebase();
    const [posts, setPosts] = useState([])
    let tmpArray = [];
    const getPosts = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            tmpArray.push(doc.data());
        });
        setPosts(tmpArray);
    }
    useEffect(() => {
        getPosts();
    }, [])

    console.log(posts);
    return (
        <View style={styles.containerPosts}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderComponent user={user}></HeaderComponent>
                {
                    posts.map((post, index) => {
                        return (
                            <View style={styles.cardPosts} key={index}>
                                <Text style={styles.titlePost}>{post.title}</Text>
                                <Text style={styles.descriptionPost}>{post.description}</Text>
                                <TouchableOpacity onPress={() => navigation.push('Post', { itemId: post.title })}>
                                    <View style={styles.button} >
                                        <Text style={styles.buttonText}>Voir plus</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView >
            <BottomBarComponent />
        </View >
    );
}

const styles = StyleSheet.create({
    containerPosts: {
        flex: 1,
        backgroundColor: BLUE_BG
    },
    cardPosts: {
        flex: 1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: 45,
        marginTop: 22,
        padding: 30,
    },
    titlePost: {
        color: WHITE
    },
    descriptionPost: {
        color: WHITE,
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

export default ListPostScreen;