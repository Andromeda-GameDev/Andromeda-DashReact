import { createContext, useContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    updateProfile} from 'firebase/auth';
import { auth } from '../firebase';
import { getDatabase, set, ref } from 'firebase/database';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const createUser = async (user) => {
        const { email, password, name, last_name, group} = user;

        try {
            const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(newUser, {
                displayName: `${name} ${last_name}`,
            });

            const db = getDatabase();
            const usersReference = ref(db, `users/${newUser.uid}`);
            await set(usersReference, {
                email,
                group,
                last_name,
                name,
            });

        } catch (error){
            console.log(error);
        }
    };

    const login = async (user) => {
        const { email, password } = user;
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser);
        })

        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <UserContext.Provider value={{createUser, user, logout, login}}>
        {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}