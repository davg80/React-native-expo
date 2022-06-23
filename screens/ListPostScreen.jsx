import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { BLUE_BG, BLUE_LIGHT_BG, GRAY_LIGHT, RED } from '../Constantes';
import Toast from 'react-native-toast-message';
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from '../Hooks/useFirebase.js';


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
        <View style={styles.containerMovies}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderComponent user={user}></HeaderComponent>
                {
                    posts.map((post, index) => {
                        return (
                            <>
                                <Text>{index}</Text>
                                <Text>{post.title}</Text>
                                <Text>{post.description}</Text>
                            </>
                        )
                    })
                }
            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({

});

export default ListPostScreen;