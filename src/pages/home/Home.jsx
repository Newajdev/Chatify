import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const UserInfo = useSelector((state)=> state.activeUser.value)
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!UserInfo){
            navigate('/login')
        }
    },[])

    const hendlerSingOut = () => {
        logOut()
        navigate('/login')
        localStorage.removeItem("userInfo:")
    }

    return (
        <div>

            <button className='px-3 py-2 rounded-sm bg-amber-500' onClick={hendlerSingOut}>Sign Out</button>
            This Is Home
        </div>
    );
};

export default Home;