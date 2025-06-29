import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
                I am Register
                <Link className='font-black ml-10' to={'/login'}>go to login</Link>
        </div>
    );
};

export default Register;