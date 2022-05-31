import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFirebase } from '../Hooks/useFirebase';

const RED = "#f92045";
const WHITE = "#F1F1F1";
const LIGHT_GRAY = "#D3D3D3";
const HomeScreen = () => {
    const { user } = useFirebase();
    console.log("user => " + user.email);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: "center" }}>
            {user && <Text>Bonjour {user.firstname} {user.lastname}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
});

export default HomeScreen;