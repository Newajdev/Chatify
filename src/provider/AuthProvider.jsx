import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithCredential, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from '../firebase/Firebase.config';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setuser] = useState([])



    const LoginUser = (Email, Password) => {
        return createUserWithEmailAndPassword(auth, Email, Password)
    }
    const verifyEmail = (user) => {
        return sendEmailVerification(user);
    };
    const SingInUser = (Email, Password) => {
        return signInWithEmailAndPassword(auth, Email, Password)
    }

    const GoogleLogin = (provider) => {
        return signInWithPopup(auth, provider)
    }
    const GoogleSingIn = (credential) => {
        return signInWithCredential(auth, credential)
    }

    useEffect(() => {
        const unsubsrcibe = onAuthStateChanged(auth, currentUser => {

            setuser(currentUser)

        });
        return () => {
            return unsubsrcibe()
        }

    })

    console.log(user);
    

    const Usersinfo = {
        user,
        LoginUser,
        verifyEmail,
        SingInUser,
        GoogleLogin,
        GoogleSingIn
    }
    return (
        <AuthContext.Provider value={Usersinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;