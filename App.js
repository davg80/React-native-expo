// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import MoviesScreen from './screens/MoviesScreen';
import DetailsScreen from './screens/DetailsScreen';
import AuthProvider from './Hooks/useFirebase';
import MoviesProvider from './Hooks/useMovies';
import FormScreen from './screens/FormScreen';
import ListPostScreen from './screens/ListPostScreen';
import BottomBarComponent from './components/BottomBarComponent';
import { LogBox } from 'react-native';


const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["timer"]);

function App() {

  return (
    <>
      <AuthProvider>
        <MoviesProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerShown: false
            }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Details" component={DetailsScreen} />
              <Stack.Screen name="Movies" component={MoviesScreen} />
              <Stack.Screen name="Form" component={FormScreen} />
              <Stack.Screen name="ListPosts" component={ListPostScreen} />
            </Stack.Navigator>
            <BottomBarComponent />
          </NavigationContainer>
          <Toast />
        </MoviesProvider>
      </AuthProvider>
    </>
  );
}

export default App;




