import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../firebase/Firebase.config';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setuser] = useState([])
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()



    const LoginUser = (Email, Password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, Email, Password)
    }
    const verifyEmail = (user) => {
        setLoading(false)
        return sendEmailVerification(user);
    };
    const SingInUser = (Email, Password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth, Email, Password)
    }

    const GoogleLogin = () => {
        setLoading(false)
        return signInWithPopup(auth, provider)
    }


    const logOut = ()=>{
        setLoading(false)
        return signOut(auth)

    }
    

    useEffect(() => {
        const unsubsrcibe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setuser(currentUser)

        });
        return () => {
            return unsubsrcibe()
        }
        
    })

    

    const Usersinfo = {
        user,
        loading,
        LoginUser,
        verifyEmail,
        SingInUser,
        GoogleLogin,
        logOut,
       
    }
    return (
        <AuthContext.Provider value={Usersinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;