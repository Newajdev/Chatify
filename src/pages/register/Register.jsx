import '../../../src/App.css'
import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import RegisterCover from '../../assets/Register.png'
import { Button } from '@mui/material';
import { InputField } from '../../utils/Themes';
import { AuthContext } from '../../provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { RiseLoader } from "react-spinners";
import { updateProfile } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { getDatabase, ref, set } from "firebase/database";





const Register = () => {
    const db = getDatabase();
    const { LoginUser, verifyEmail, GoogleLogin, logOut, } = useContext(AuthContext)
    const [Visible, setVisible] = useState(false)
    const [PassError, setPassError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const UserData = useSelector(state => state.activeUser.value)

    const hendlerRegister = e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const FName = form.fname.value;
        const LName = form.lname.value;
        const Email = form.email.value;
        const Password = form.password.value;

        const CharecterCheck = /^[A-Za-z\d@$!%*?#&]{8,}$/;
        const NumCheck = /^(?=.*\d)/;
        const SmallLetterCheck = /^(?=.*[a-z])/;
        const CapitalLetterCheck = /^(?=.*[A-Z])/;
        const SCharecterCheck = /^(?=.*[@$!%*?#&])/;
        const ValidPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
        const ValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!FName) {
            setNameError('')
            setLoading(false)
            return setNameError('Please Entart your Name')
        }

        if (!ValidEmail.test(Email)) {
            setEmailError('')
            setNameError('')
            setLoading(false)
            return setEmailError('Please Entart A valid Email')
        }

        if (!Password) {
            setEmailError('')
            setNameError('')
            setLoading(false)
            return setPassError('Please Entart A 8 Digit Password');
        }
        if (!NumCheck.test(Password)) {
            setPassError('')
            setEmailError('')
            setNameError('')
            setLoading(false)
            return setPassError('Please Entart At least 1 Number');
        }
        if (!SmallLetterCheck.test(Password)) {
            setPassError('')
            setEmailError('')
            setNameError('')
            setLoading(false)
            return setPassError('Please Entart At least 1 Lowercase Charecter (like: a, b, c)');
        }
        if (!CapitalLetterCheck.test(Password)) {
            setPassError('')
            setEmailError('')
            setNameError('')
            setLoading(false)
            return setPassError('Please Entart At least 1 Uppercase Charecter (like: A, B, C)');
        }
        if (!SCharecterCheck.test(Password)) {
            setPassError('')
            setEmailError('')
            setNameError('')
            setLoading(false)
            return setPassError('Please Entart At least 1 Special Charecter (like: #, $, %)');
        }
        if (!CharecterCheck.test(Password)) {
            setPassError('')
            setEmailError('')
            setNameError('')
            setLoading(false)
            return setPassError('Please Entart A 8 Digit Password');
        }


        if (ValidPass.test(Password) && FName && ValidEmail.test(Email)) {
            setPassError('')
            setNameError('')
            setEmailError('')
            LoginUser(Email, Password)
                .then((result) => {
                    updateProfile(result.user, {
                        displayName: LName,
                        photoURL: 'https://firebasestorage.googleapis.com/v0/b/chatify-502b2.firebasestorage.app/o/placeholder.jpg?alt=media&token=32191ed5-8e60-4736-94d1-5266085203ce'
                    }).then(() => {
                        setLoading(false)
                        verifyEmail(result.user)
                        logOut()
                        navigate('/login')
                        set(ref(db, 'AllUsers/'+ result.user.uid), {
                            username: result.user.displayName,
                            email: result.user.email,
                            photo: result.user.photoURL
                        });

                    }).catch((error) => {
                        alert(error);

                    });



                })
                .catch(error => alert(error))
        }


    }

    const henlderGoogleLogin = () => {
        GoogleLogin()
            .then(() => {
                navigate('/')
            })
            .catch(error => toast(error))
    }


    return (
        <div className="lg:h-screen flex justify-center items-center bg-gray-100">
            <div className='md:flex lg:flex my-5 md:m-10 lg:m-20 justify-between border-2 border-[#0000001F] rounded-2xl bg-white'>
                {/* LoginForm Start */}
                <ToastContainer />
                <div className="p-8 w-full md:p-8 lg:p-18 md:w-2/3 lg:w-2/4  my-auto lg:flex lg:flex-col ">
                    <div className="mb-4 md:mb-8 lg:mb-12">
                        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center text-[#087A8E] mb-2 w-11/12 mx-auto ">Get started with easily register</h1>
                        <p className='text-center'>Free register and you can enjoy it</p>
                    </div>

                    <form onSubmit={hendlerRegister}>

                        <div className="flex flex-col mb-6 w-full">

                            <InputField variant="outlined" label="First Name" type='text' name='fname' />
                            <p className='text-red-500 mt-1 text-sm'>{nameError}</p>

                        </div>

                        <div className="flex flex-col mb-6 w-full">
                            <InputField label="Last Name" variant="outlined" type='text' name='lname' />
                        </div>

                        <div className="flex flex-col mb-6 w-full">
                            <InputField label="Your valid Email Address" variant="outlined" type='email' name='email' />
                            <p className='text-red-500 mt-1 text-sm'>{emailError}</p>
                        </div>

                        <div className="flex flex-col mb-6 relative">
                            <InputField label="Your Password" variant="outlined" type={!Visible ? "password" : "text"} name='password' />
                            <div className="absolute top-5 right-5 font-semibold text-xl" onClick={() => setVisible(!Visible)}>{Visible ? <FaEye className="text-[#087A8E]" /> : <FaEyeSlash className="text-[#087A8E]" />}</div>
                            <p className='text-red-500 mt-1 text-sm'>{PassError}</p>

                        </div>
                        <Button type="submit" variant="PrimaryBtn"> {loading ? <RiseLoader color={'white'} size={10} /> : 'Register'} </Button>

                    </form>
                    <Button onClick={henlderGoogleLogin} type="submit" variant="SecendaryBtn"><FcGoogle className='text-2xl mr-3' /> Singup With Google</Button>

                    <p className="text-center mt-8 text-gray-400 font-semibold text-base">Already Have An Account ? <Link className="text-[#087A8E] font-black hover:cursor-pointer " to='/login'>Login</Link></p>
                </div>
                {/* LoginForm End */}
                <div className='hidden md:inline md:w-2/3 lg:w-2/4'>
                    <img className='rounded-r-xl md:h-full lg:w-full' src={RegisterCover} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Register;