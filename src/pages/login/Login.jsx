import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            I am Login
            <Link className='font-black ml-10' to={'/'}>Go to Register</Link>
        </div>
    );
};

export default Login;