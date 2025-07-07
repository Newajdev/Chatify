import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import LoginCover from '../../assets/Login.png'
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import '../../../src/App.css'
import { InputField } from '../../utils/Themes';
import { AuthContext } from '../../provider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
    const { user, SingInUser, GoogleSingIn } = useContext(AuthContext)
    const DEmail = user.email;
    const [PassError, setPassError] = useState('')
    const navigate = useNavigate()

    const [Visible, setVisible] = useState(false)
    const HendleCheckPassword = () => {
        setVisible(!Visible)
    }
   

    const hendlerRegister = e => {
        e.preventDefault();
        
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;


        const CharecterCheck = /^[A-Za-z\d@$!%*?#&]{8,}$/;
        const NumCheck = /^(?=.*\d)/;
        const SmallLetterCheck = /^(?=.*[a-z])/;
        const CapitalLetterCheck = /^(?=.*[A-Z])/;
        const SCharecterCheck = /^(?=.*[@$!%*?#&])/;
        const ValidPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

        if (!password) {
            return setPassError('Please Entart A 8 Digit Password');
            // console.log(PassError);
        }
        if (!NumCheck.test(password)) {
            setPassError('')
            return setPassError('Please Entart At least 1 Number on Password');
        }
        if (!SmallLetterCheck.test(password)) {
            setPassError('')
            return setPassError('Please Entart At least 1 Lowercase Charecter (like: a, b, c) on Password');
        }
        if (!CapitalLetterCheck.test(password)) {
            setPassError('')
            return setPassError('Please Entart At least 1 Uppercase Charecter (like: A, B, C) on Password');
        }
        if (!SCharecterCheck.test(password)) {
            setPassError('')
            return setPassError('Please Entart At least 1 Special Charecter (like: #, $, %) on Password');
        }
        if (!CharecterCheck.test(password)) {
            setPassError('')
            return setPassError('Please Entart A 8 Digit Password');
        }
        if (ValidPass.test(password)) {
            if (email === DEmail) {
                if (!user.emailVerified) {
                    alert('Check your email And Verify that your email is')
                }
                else {
                    SingInUser(email, password)
                        .then(() => {
                            
                            navigate('/home')

                        })
                        .catch((error) => {
                            console.log(error);

                        })
                }
            } else {
                SingInUser(email, password)
                    .then(() => {
                        console.log('Sucsses');

                    })
                    .catch((error) => {
                        console.log(error);

                    })
            }
        }
    }
    var id_token = response.credential
    const credential = GoogleAuthProvider.credential(id_token);
    const hendlerSingIn=() =>{
        GoogleSingIn(credential)
        .catch(error => console.log(error)
        )
    }
    return (
        <div className="lg:h-screen flex justify-center items-center bg-gray-100">
            <div className='md:flex lg:flex my-5 md:m-10 lg:m-20 justify-between border-2 border-[#0000001F] rounded-2xl bg-white'>
                {/* LoginForm Start */}
                <div className="p-8 w-full md:p-8 lg:p-18 md:w-2/3 lg:w-2/4  my-auto lg:flex lg:flex-col ">
                    <div className="mb-4 md:mb-8 lg:mb-12">
                        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center text-[#087A8E] mb-2 ">Login to your account!</h1>
                        <p className='text-center'>Welcome back! Please enter your details.</p>
                        <p className='text-center'>{PassError}</p>
                    </div>
                    <form onSubmit={hendlerRegister}>

                        <div className="flex flex-col mb-6 w-full">
                            <InputField label="Your valid Email Address" variant="outlined" type='' name='email' />
                        </div>

                        <div className="flex flex-col mb-6 relative">
                            <InputField label="Your Password" variant="outlined" type={!Visible ? "password" : "text"} name='password' required />
                            <div className="absolute top-5 right-5 font-semibold text-xl" onClick={HendleCheckPassword}>{Visible ? <FaEye className="text-[#087A8E]" /> : <FaEyeSlash className="text-[#087A8E]" />}</div>
                        </div>
                        <div className="flex justify-between items-center mb-2 w-full">
                            <FormControlLabel control={<Checkbox />} label="Remember me" />
                            <p className='text-end'>Forget password</p>
                        </div>
                        <Button type="submit" variant="PrimaryBtn">Login</Button>
                        <Button onClick={hendlerSingIn} type="submit" variant="SecendaryBtn"><FcGoogle className='text-2xl mr-3' /> Login With Google</Button>

                        <p className="text-center mt-8 text-gray-400 font-semibold text-base">Already Have An Account ? <Link className="text-[#087A8E] font-black hover:cursor-pointer " to='/'>Register</Link></p>

                    </form>
                </div>
                {/* LoginForm End */}
                <div className='hidden md:inline md:w-2/3 lg:w-2/4'>
                    <img className='rounded-r-xl md:h-full lg:w-full' src={LoginCover} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;