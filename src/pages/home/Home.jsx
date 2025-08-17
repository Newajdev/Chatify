import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    const hendlerSingOut = () => {
        logOut()
        navigate('/login')
    }

    return (
        <div>

            <button className='px-3 py-2 rounded-sm bg-amber-500' onClick={hendlerSingOut}>Sign Out</button>
            This Is Home
        </div>
    );
};

export default Home;