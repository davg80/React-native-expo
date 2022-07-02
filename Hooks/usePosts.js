import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { useFirebase } from '../Hooks/useFirebase.js';

const PostsContext = React.createContext();
export const usePosts = () => useContext(PostsContext);

function PostsProvider({ children }) {
    const { db } = useFirebase();
    const [posts, setPosts] = useState([])
    let tmpArray = [];
    console.log("------------------POSTS----------------------");
    useEffect(() => {
        const getPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posts"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                tmpArray.push(doc.data());
            });
            setPosts(tmpArray);
        }
        getPosts();
    }, []);
    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostsContext.Provider>
    )
}

export default PostsProvider;