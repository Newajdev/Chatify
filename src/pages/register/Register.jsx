import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import RegisterCover from '../../assets/Register.png'
import { Alert, Button } from '@mui/material';
import '../../../src/App.css'
import { InputField } from '../../utils/Themes';
import { AuthContext } from '../../provider/AuthProvider';
import Toast from 'sweetalert2'
import { GoogleAuthProvider } from 'firebase/auth';



const Register = () => {
    const { LoginUser, verifyEmail, GoogleLogin } = useContext(AuthContext)
    const [Visible, setVisible] = useState(false)
    const [PassError, setPassError] = useState('')
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider()

    const HendleCheckPassword = () => {
        setVisible(!Visible)
    }

    const hendlerRegister = e => {
        e.preventDefault()
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

        if (!Password) {
            return setPassError('Please Entart A 8 Digit Password');
            // console.log(PassError);
        }
        if (!NumCheck.test(Password)) {
            setPassError('')
            return setPassError('Please Entart At least 1 Number');
        }
        if (!SmallLetterCheck.test(Password)) {
            setPassError('')
            return setPassError('Please Entart At least 1 Lowercase Charecter (like: a, b, c)');
        }
        if (!CapitalLetterCheck.test(Password)) {
            setPassError('')
            return setPassError('Please Entart At least 1 Uppercase Charecter (like: A, B, C)');
        }
        if (!SCharecterCheck.test(Password)) {
            setPassError('')
            return setPassError('Please Entart At least 1 Special Charecter (like: #, $, %)');
        }
        if (!CharecterCheck.test(Password)) {
            setPassError('')
            return setPassError('Please Entart A 8 Digit Password');
        }
        if (ValidPass.test(Password)) {
            setPassError('')
            LoginUser(Email, Password)
                .then((result) => {
                    verifyEmail(result.user)
                        .then(() => {
                            Toast.fire({
                                icon: 'success',
                                title: 'Verification email sent!'
                            });
                            const UserDetails = { FName, LName, Email }
                            navigate('/login')
                            
                        })
                        .catch((error) => {
                            console.error("Error sending email verification:", error.message);
                        });
                    // Optional: show success alert here

                })
                .catch(error => console.log(error))

            // console.log(UserDetails);

        }


    }

    const henlderGoogleLogin = ()=>{
        GoogleLogin(provider)
        .then(() =>{
            navigate('/login')
        })
        .catch(error => alert(error))
    }

    
    return (
        <div className="lg:h-screen flex justify-center items-center bg-gray-100">
            <div className='md:flex lg:flex my-5 md:m-10 lg:m-20 justify-between border-2 border-[#0000001F] rounded-2xl bg-white'>
                {/* LoginForm Start */}
                <div className="p-8 w-full md:p-8 lg:p-18 md:w-2/3 lg:w-2/4  my-auto lg:flex lg:flex-col ">
                    <div className="mb-4 md:mb-8 lg:mb-12">
                        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center text-[#087A8E] mb-2 w-11/12 mx-auto ">Get started with easily register</h1>
                        <p className='text-center'>Free register and you can enjoy it</p>
                    </div>
                    <form onSubmit={hendlerRegister}>

                        <div className="flex flex-col mb-6 w-full text-red-600">

                            <InputField variant="outlined" label="First Name" type='text' name='fname' required />

                        </div>

                        <div className="flex flex-col mb-6 w-full">
                            <InputField label="Last Name" variant="outlined" type='text' name='lname' />
                        </div>

                        <div className="flex flex-col mb-6 w-full">
                            <InputField label="Your valid Email Address" variant="outlined" type='email' name='email' required />
                        </div>

                        <div className="flex flex-col mb-6 relative">
                            <InputField label="Your Password" variant="outlined" type={!Visible ? "password" : "text"} name='password' />
                            <div className="absolute top-5 right-5 font-semibold text-xl" onClick={HendleCheckPassword}>{Visible ? <FaEye className="text-[#087A8E]" /> : <FaEyeSlash className="text-[#087A8E]" />}</div>
                            <p className='text-red-500 mt-1 text-sm'>{PassError}</p>

                        </div>
                        <Button type="submit" variant="PrimaryBtn">Register</Button>
                        <Button onClick={henlderGoogleLogin} type="submit" variant="SecendaryBtn"><FcGoogle className='text-2xl mr-3' /> Singup With Google</Button>

                        <p className="text-center mt-8 text-gray-400 font-semibold text-base">Already Have An Account ? <Link className="text-[#087A8E] font-black hover:cursor-pointer " to='/login'>Login</Link></p>

                    </form>
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