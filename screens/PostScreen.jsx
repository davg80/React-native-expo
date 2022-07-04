import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import { BLUE_BG, BLUE_LIGHT_BG, GRAY_LIGHT, RED, WHITE, OUTER_SPACE, GRAY_LYNCH } from '../Constantes';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { deleteDoc, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import BottomBarComponent from '../components/BottomBarComponent';
import { useFirebase } from '../Hooks/useFirebase';
import HeaderComponent from '../components/HeaderComponent';

const PostScreen = ({ route, navigation }) => {
    const { db, user } = useFirebase();
    const { itemId } = route.params;
    const [post, setPost] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [countComment, setCountComment] = useState(0);
    const [comment, setComment] = useState([]);
    const [error, setError] = useState("");
    const [isLike, setIsLike] = useState(post.like);

    const getPost = async () => {
        const querySnapshot = await getDoc(doc(db, "posts", itemId));
        if (querySnapshot.exists()) {
            setPost(querySnapshot.data());
            setIsLike(querySnapshot.data().like);
            setCountComment(querySnapshot.data().comments.length);
        } else {
            Toast.show({
                type: 'error',
                text2: `Erreur de récupération des données!`
            });
        }
    }
    useEffect(async () => {
        getPost();
    }, [])

    const deletePost = async (id) => {
        await deleteDoc(doc(db, "posts", id))
        Toast.show({
            type: 'success',
            text2: `Votre post ${id} a été supprimé avec succès!`
        });
        navigation.navigate('Movies')
    }

    const handleLike = async () => {
        if (isLike) {
            await setDoc(doc(db, "posts", post.title), {
                ...post, like: false
            });
            setIsLike(false);
        } else {
            await setDoc(doc(db, "posts", post.title), {
                ...post, like: true
            });
            setIsLike(true);
        }
    }

    const handleComment = async () => {
        setIsVisible(!isVisible);
    }

    const submit = async () => {
        if (comment !== "") {
            let comments = post.comments;
            comments.push(comment)
            try {
                // Add a new document in collection "posts"
                await setDoc(doc(db, "posts", post.title), {
                    title: post.title,
                    description: post.description,
                    author: user,
                    like: post.like,
                    comments: comments
                });
                Toast.show({
                    type: 'success',
                    text2: 'Votre commentaire a été ajouté avec succés! 👋'
                });
                navigation.navigate('Movies');
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(error.code);
                setError(error.message);
                Toast.show({
                    type: 'error',
                    text2: `Une erreur est survenue lors de l'ajout du commentaire.👋`
                });
            }
        }
    }

    if (post) {
        return (
            <View style={styles.containerPost}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeaderComponent user={user}></HeaderComponent>
                    <View style={styles.cardPost}>
                        <View>
                            <Text style={styles.titlePost}>{post.title}</Text>
                            {post.image &&
                                <Image
                                    resizeMode="contain"
                                    source={{ uri: `${post.image}` }}
                                    style={styles.poster}
                                />
                            }
                            <Text>{post.description}</Text>
                            <View style={styles.containerIcons} >
                                {isLike ?
                                    (<Text style={styles.icons} onPress={() => handleLike()}> <Entypo name="heart" size={26} color="red" /></Text>)
                                    :
                                    (<Text style={styles.icons} onPress={() => handleLike()}> <Entypo name="heart-outlined" size={26} color="red" /></Text>)
                                }
                                <TouchableOpacity
                                    style={styles.buttonComment}
                                    onPress={() => handleComment()} >
                                    <View style={styles.commentBlock}>
                                        <FontAwesome5 name="comment-alt" size={24} color="red" />
                                        <Text>{countComment}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.push('EditPost', { itemId: post.title })}>
                                    <Text style={styles.icons}>
                                        <Entypo name="edit" size={26} color="red" />
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deletePost(post.title)}>
                                    <Text style={styles.icons} >
                                        <Entypo name="trash" size={26} color="red" />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Modal
                            animationType={"slide"}
                            transparent={false}
                            visible={isVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has now been closed.');
                            }}>
                            {post.comments == [] ?
                                <Text style={styles.text}>Aucun commentaire pour le moment...</Text>
                                :
                                <View style={styles.comments}>
                                    <Text style={styles.text}>Les commentaires</Text>
                                    {post.comments &&
                                        post.comments.map((comment, index) => {
                                            return (
                                                <View key={index}>
                                                    <Text style={styles.comment}>{comment}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            }
                            <TextInput
                                style={styles.textInput}
                                selectionColor={RED}
                                placeholder="Enter your comment"
                                placeholderTextColor={GRAY_LYNCH}
                                onChangeText={setComment}
                                defaultValue={comment}
                            />
                            {error !== "" && <Text style={{ fontSize: 9, color: RED, marginLeft: 20 }}>{error}</Text>}
                            <TouchableOpacity onPress={submit}>
                                <View style={styles.button} >
                                    <Text style={styles.buttonText}>Ajouter un commentaire</Text>
                                </View>
                            </TouchableOpacity>
                            <Text
                                style={styles.closeText}
                                onPress={() => setIsVisible(!isVisible)}><Entypo name="cross" size={26} color="black" /></Text>
                        </Modal>
                    </View>
                </ScrollView >
                <BottomBarComponent />
            </View>
        )
    }
}

export default PostScreen;

const styles = StyleSheet.create({
    containerPost: {
        flex: 1,
        backgroundColor: BLUE_BG,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titlePost: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    cardPost: {
        flex: 1,
        width: 350,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginBottom: 25,
        padding: 30,
    },
    containerIcons: {
        marginTop: 15,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icons: {
        marginRight: 10
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        paddingTop: 40,
    },
    closeText: {
        position: 'absolute',
        right: 30,
        top: 10,
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    },
    commentBlock: {
        width: 40,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    comments: {
        marginTop: 50
    },
    textInput: {
        width: 380,
        height: 50,
        marginLeft: 15,
        marginTop: 25,
        backgroundColor: GRAY_LIGHT,
        color: OUTER_SPACE,
        paddingLeft: 10,
        borderRadius: 10
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
    buttonComment: {
        height: 40,
        borderRadius: 15,
        textAlign: "center"
    },
    buttonText: {
        color: GRAY_LIGHT,
        fontSize: 15
    },
    comment: {
        marginLeft: 15,
        width: 380,
        backgroundColor: GRAY_LIGHT,
        padding: 10,
        marginBottom: 10,
    },
    poster: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginLeft: 50
    },
})