import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    User as FirebaseUser,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
    UserCredential
} from "firebase/auth";
import { auth } from "../firebase";
import {getDatabase, set, ref, get} from "firebase/database";
//import { useNavigate } from "react-router-dom";

interface User {
    email: string;
    password: string;
    name: string;
    last_name: string;
    group: string;
}

interface UserContextValue {
    createUser: (user: User) => Promise<void>;
    user: FirebaseUser | null;
    logout: () => Promise<void>;
    login: (user: { email: string, password: string }) => Promise<{creds: UserCredential, role: string | null}>;
    forgotPassword: (email: string) => Promise<void>;
    role?: string | null;
    setRole?: (role: string | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [role, setRole] = useState<string | null>(null);

    const createUser = async (user: User) => {
        const { email, password, name, last_name, group } = user;

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
        } catch (error) {
            console.log(error);
        }
    };

    const login = async ({ email, password }: { email: string, password: string }) => {
        const creds = await signInWithEmailAndPassword(auth, email, password);
        const db = getDatabase();
        const { uid } = creds.user;

        const professorReference = ref(db, `professors/${uid}`);
        const professorSnap = await get(professorReference);

        if (professorSnap.exists()) {
            setRole('professor');
        } else {
            const studentReference = ref(db, `users/${uid}`);
            const studentSnap = await get(studentReference);
            if (studentSnap.exists()) {
                setRole('student');
            } else {
                setRole(null);
                console.log('No role found');
            }
        }
        return { creds, role };
    };


    const logout = () => {
        return signOut(auth);
    };

    const forgotPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            //console.log(currentUser);
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider
            value={{ createUser, user, logout, login, forgotPassword, role, setRole}}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = (): UserContextValue => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthContextProvider");
    }
    return context;
};
