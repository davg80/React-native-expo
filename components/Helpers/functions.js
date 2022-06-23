import AsyncStorage from '@react-native-async-storage/async-storage';
export const getData = async (navigation) => {
    try {
        const token = await AsyncStorage.getItem('@storage_Key')
        if (token !== null) {
            // console.log(token);
            // value previously stored
            navigation.navigate('Login');
        }
    } catch (e) {
        // error reading value
        console.log(e, "Problème de redirection TOKEN");
    }
}

export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
        // saving error
    }
}