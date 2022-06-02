import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFirebase } from '../Hooks/useFirebase';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { GRAY_LIGHT, BLUE_BG, WHITE } from '../Constantes';

const HeaderComponent = ({ user }) => {
    const { auth, signOut } = useFirebase();
    const navigation = useNavigation();

    const logout = () => {
        signOut(auth).then(() => {
            Toast.show({
                type: 'success',
                text2: `À Bientôt ${user.lastname} ${user.firstname} !!`
            });
            navigation.navigate('Home');
        }).catch((error) => {
            Toast.show({
                type: 'error',
                text2: `Une erreur est survenue!!`
            });
        })
    }
    return (
        <View style={styles.header}>
            <View style={styles.boxUsername}>
                <View>
                    <AntDesign name="user" size={24} color="white" />
                </View>
                <View>
                    {user !== null && <Text style={styles.userText}>Bonjour {user.firstname} {user.lastname}</Text>}
                </View>
                <TouchableOpacity style={styles.button} onPress={logout}>
                    <AntDesign name="disconnect" size={24} color="white" />
                    <Text style={styles.textlogout}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'space-around',
    },
    boxUsername: {
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

export default HeaderComponent;