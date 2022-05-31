import React, {useContext, useState} from 'react'
import { initializeApp } from "@firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwZ61Kpwa5qmLFecTk4dRQx7SlHhbKxxk",
    authDomain: "moviesapp-f5d58.firebaseapp.com",
    projectId: "moviesapp-f5d58",
    storageBucket: "moviesapp-f5d58.appspot.com",
    messagingSenderId: "154842023381",
    appId: "1:154842023381:web:68c57a4009d5595c71295c"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig, "app");
const auth = getAuth(firebaseApp);  
const db = getFirestore(firebaseApp);
    
const FirebaseContext = React.createContext();

export const useFirebase = () => useContext(FirebaseContext)

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
  return (
    <FirebaseContext.Provider value={{auth, db, user, setUser, signOut}}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default AuthProvider