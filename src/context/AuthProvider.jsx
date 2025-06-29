import React, { createContext } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const Users = {}
    return (
        <div>
            <AuthContext.Provider value={Users}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;