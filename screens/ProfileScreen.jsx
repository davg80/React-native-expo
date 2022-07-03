import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import { BLUE_BG, BLUE_LIGHT_BG, GRAY_LIGHT, RED, WHITE, OUTER_SPACE } from '../Constantes';
import Toast from 'react-native-toast-message';
import { deleteDoc, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import BottomBarComponent from '../components/BottomBarComponent';
import { useFirebase } from '../Hooks/useFirebase';
import HeaderComponent from '../components/HeaderComponent';

function ProfileScreen() {
    const { db, user } = useFirebase();
    return (
        <View style={styles.containerProfile}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderComponent user={user}></HeaderComponent>
                <Text>Profile</Text>
            </ScrollView >
            <BottomBarComponent />
        </View >
    )
}

export default ProfileScreen
const styles = StyleSheet.create({
    containerProfile: {
        flex: 1,
        backgroundColor: BLUE_BG,
        alignItems: 'center',
        justifyContent: 'center',
    },
});