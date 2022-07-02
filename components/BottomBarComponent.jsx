import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { GRAY_LIGHT, BLUE_BG, WHITE } from '../Constantes';
import { getData } from './Helpers/functions';

const BottomBarComponent = ({ user }) => {
    const navigation = useNavigation();
    const logout = () => {
        console.log("logout");
        getData(navigation);
    }

    return (
        <View style={styles.bottomBar}>
            <View style={styles.boxButtons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Movies')}>
                    <AntDesign name="home" size={24} color="white" />
                    <Text style={styles.textlogout}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Form')}>
                    <AntDesign name="plus" size={24} color="white" />
                    <Text style={styles.textlogout}>Form</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListPosts')}>
                    <AntDesign name="picture" size={24} color="white" />
                    <Text style={styles.textlogout}>MyPosts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={logout}>
                    <AntDesign name="disconnect" size={24} color="white" />
                    <Text style={styles.textlogout}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        width: 420,
        position: 'absolute',
        bottom: 0,
        marginTop: 40
    },
    boxButtons: {
        backgroundColor: BLUE_BG,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    userText: {
        color: GRAY_LIGHT,
        textTransform: 'uppercase',
        marginLeft: 10,
        marginRight: 10,
    },
    avatar: {
        width: 40,
        height: 40,
    },
    exit: {
        borderWidth: 1,
        width: 40,
        height: 40,
        borderColor: GRAY_LIGHT,
        borderRadius: 50
    },
    textlogout: {
        color: GRAY_LIGHT,
        marginLeft: 5
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
});

export default BottomBarComponent;