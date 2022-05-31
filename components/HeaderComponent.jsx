import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFirebase } from '../Hooks/useFirebase';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";
const HeaderComponent = ({ user }) => {
    const { auth, signOut } = useFirebase();
    const navigation = useNavigation();

    const logout = () => {
        signOut(auth).then(() => {
            console.log("Salut");
            Toast.show({
                type: 'success',
                text2: `À Bientôt ${user.lastname} ${user.firstname} !!`
            });
            navigation.navigate('Home');
        }).catch((error) => {
            console.log(error);
            Toast.show({
                type: 'error',
                text2: `Une erreur est survenue!!`
            });
        })
    }
    return (
        <View style={styles.containerMovies}>
            <View style={styles.boxUsername}>
                <View>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/images/avatar.png')}
                    />
                </View>
                <View>
                    {user !== null && <Text style={styles.userText}>Bonjour {user.firstname} {user.lastname}</Text>}
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.button} >
                        <Text style={styles.buttonText}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxUsername: {
        backgroundColor: RED,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
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

export default HeaderComponent;