import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFirebase } from '../Hooks/useFirebase';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { GRAY_LIGHT, BLUE_BG, WHITE } from '../Constantes';

const CardMyPostsComponent = ({ post, index }) => {

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BLUE_BG,
        marginBottom: 25,
        padding: 30,
    },
    title: {
        color: WHITE
    },
    description: {
        color: WHITE
    },
});

export default CardMyPostsComponent;