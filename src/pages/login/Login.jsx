import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import LoginCover from '../../assets/Login.png'
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import '../../../src/App.css'
import { InputField } from '../../utils/Themes';
import { AuthContext } from '../../provider/AuthProvider';
import { RiseLoader } from 'react-spinners';
import { useDispatch,} from 'react-redux';
import { userDetails } from '../../slice/user/UserInfoSlice';


const Login = () => {
    const { user, SingInUser, GoogleLogin, verifyEmail, logOut, ResetEmail } = useContext(AuthContext)
    const [PassError, setPassError] = useState('')
    const navigate = useNavigate()
    const [emailError, setEmailError] = useState('')
    const [Visible, setVisible] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [updatePass, setUpdatePass] = useState(false)
    const [varifyEmail, setVarifyEmail] = useState('')
    const [emailSend, setEmailSend] = useState(false)
    const Dispatch = useDispatch()
    


    const hendlerLogin = e => {
        e.preventDefault();

        const form = e.target;
        const Email = form.email.value;
        const Password = form.password.value;

        const CharecterCheck = /^[A-Za-z\d@$!%*?#&]{8,}$/;
        const NumCheck = /^(?=.*\d)/;
        const SmallLetterCheck = /^(?=.*[a-z])/;
        const CapitalLetterCheck = /^(?=.*[A-Z])/;
        const SCharecterCheck = /^(?=.*[@$!%*?#&])/;
        const ValidPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        const ValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!ValidEmail.test(Email)) {
            setEmailError('')
            return setEmailError('Please Entart A valid Email')
        }
        if (!Password) {
            setEmailError('')
            return setPassError('Please Entart A 8 Digit Password');
            // console.log(PassError);
        }
        if (!NumCheck.test(Password)) {
            setPassError('')
            setEmailError('')
            return setPassError('Please Entart At least 1 Number on Password');
        }
        if (!SmallLetterCheck.test(Password)) {
            setPassError('')
            setEmailError('')
            return setPassError('Please Entart At least 1 Lowercase Charecter (like: a, b, c) on Password');
        }
        if (!CapitalLetterCheck.test(Password)) {
            setPassError('')
            setEmailError('')
            return setPassError('Please Entart At least 1 Uppercase Charecter (like: A, B, C) on Password');
        }
        if (!SCharecterCheck.test(Password)) {
            setPassError('')
            setEmailError('')
            return setPassError('Please Entart At least 1 Special Charecter (like: #, $, %) on Password');
        }
        if (!CharecterCheck.test(Password)) {
            setPassError('')
            setEmailError('')
            return setPassError('Please Entart A 8 Digit Password');
        }

        if (ValidPass.test(Password) && ValidEmail.test(Email)) {
            setPassError('')
            setEmailError('')
            SingInUser(Email, Password)
                .then(() => {
                    setLoading(true)
                    setError('')
                    if (user.emailVerified) {
                        Dispatch(userDetails(user))
                        localStorage.setItem('userInfo:', JSON.stringify(user))
                        setLoading(false)
                        navigate('/')
                    } else {
                        setError('Your email is not verified. A verification link has been sent to your email address.')
                        setLoading(false)
                        verifyEmail(user)
                        logOut()
                    }
                })
                .catch((error) => {
                    if (error.message === 'Firebase: Error (auth/invalid-credential).') {
                        setError('Provided Email And Password is Not Valid')
                    }
                })
        }
    }
    const hendlerSingInWithGoogle = () => {
        GoogleLogin()
            .then(() => {
                if (user.emailVerified) {
                    Dispatch(userDetails(user))
                    localStorage.setItem('userInfo:', JSON.stringify(user))
                    setLoading(false)
                    navigate('/')
                } else {
                    setError('Your email is not verified. A verification link has been sent to your email address.')
                    setLoading(false)
                    verifyEmail(user)
                    logOut()
                }
            })
            .catch(error => alert(error))
    }

    const hendlerSendEmail = (e) => {
        e.preventDefault();
        const form = e.target;
        const Email = form.email.value;



        if (!Email) {
            setVarifyEmail('Please Enter you valid Email Address')
        } else {
            setVarifyEmail('')
            ResetEmail(Email)
                .then(() => {
                    console.log('Email Send')
                    setEmailSend(true)
                })
                .catch(err => {
                    const errorMessage = err.message;
                    console.log(errorMessage);
                })
        }

    }


    return (
        <>
            <div className="lg:h-screen flex justify-center items-center bg-gray-100">
                <div className='md:flex lg:flex my-5 md:m-10 lg:m-20 justify-between border-2 border-[#0000001F] rounded-2xl bg-white'>
                    {/* LoginForm Start */}
                    <div className="p-8 w-full md:p-8 lg:p-18 md:w-2/3 lg:w-2/4  my-auto lg:flex lg:flex-col ">
                        <div className="mb-2 md:mb-8 lg:mb-8">
                            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center text-[#087A8E] mb-2 ">Login to your account!</h1>
                            <p className='text-center'>Welcome back! Please enter your details.</p>
                            <p className='text-red-500 mt-4 text-sm text-center'>{error}</p>
                        </div>
                        <form onSubmit={hendlerLogin}>

                            <div className="flex flex-col mb-6 w-full">
                                <InputField label="Your valid Email Address" variant="outlined" type='' name='email' />
                                <p className='text-red-500 mt-1 text-sm'>{emailError}</p>
                            </div>

                            <div className="flex flex-col mb-6 relative">
                                <InputField label="Your Password" variant="outlined" type={!Visible ? "password" : "text"} name='password' />
                                <div className="absolute top-5 right-5 font-semibold text-xl" onClick={() => setVisible(!Visible)}>{Visible ? <FaEye className="text-[#087A8E]" /> : <FaEyeSlash className="text-[#087A8E]" />}</div>
                                <p className='text-red-500 mt-1 text-sm'>{PassError}</p>
                            </div>

                            <div className="flex justify-end items-center mb-2 w-full">
                                <p onClick={() => setUpdatePass(true)} className='text-end cursor-pointer'>Forget password</p>
                            </div>

                            <Button type="submit" variant="PrimaryBtn">{loading ? <RiseLoader color={'white'} size={10} /> : 'Login'}</Button>
                        </form>
                        <Button onClick={hendlerSingInWithGoogle} type="submit" variant="SecendaryBtn"><FcGoogle className='text-2xl mr-3' /> Login With Google</Button>

                        <p className="text-center mt-8 text-gray-400 font-semibold text-base">Already Have An Account ? <Link className="text-[#087A8E] font-black hover:cursor-pointer " to='/register'>Register</Link></p>
                    </div>
                    {/* LoginForm End */}
                    <div className='hidden md:inline md:w-2/3 lg:w-2/4'>
                        <img className='rounded-r-xl md:h-full lg:w-full' src={LoginCover} alt="" />
                    </div>
                </div>
            </div>

            <div className={`w-full h-screen ${!updatePass && 'hidden'}  ${updatePass && 'absolute top-0 left-0'} flex justify-center items-center shadow-2xl bg-[#00000052] `}>
                <div className='bg-white w-[30%] p-16 rounded-2xl '>
                    <h2 className={`${emailSend && 'hidden'} text-3xl font-bold text-[#087A8E] mb-8`}>Enter you Email Address</h2>

                    <h2 className={`${!emailSend && 'hidden'} text-3xl font-bold text-[#087A8E]`} >Check you Email and Reset your Password</h2>

                    <form className={`${emailSend && 'hidden'}`} onSubmit={hendlerSendEmail}>
                        <div className="flex flex-col mb-6 w-full">
                            <InputField label="Your valid Email Address" variant="outlined" type='email' name='email' />
                            <p className='text-red-500 mt-1 text-sm'>{varifyEmail}</p>
                        </div>
                        <div className='flex gap-6'>
                            <Button onClick={() => setUpdatePass(false)} type="submit" variant="PrimaryBtn">{loading ? <RiseLoader color={'white'} size={10} /> : 'Back to login'}</Button>
                            <Button type="submit" variant="PrimaryBtn">{loading ? <RiseLoader color={'white'} size={10} /> : 'send code'}</Button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default Login;