import { IoMdNotificationsOutline } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { MdFileUpload } from "react-icons/md";
import placeHolder from "../assets/placeholder.jpg"
import { Button } from "@mui/material";



const Navbar = () => {
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const [uploadImage, setUploadImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const clieckref = useRef(null)

    const hendlerSingOut = () => {
        logOut()
        navigate('/login')
        localStorage.removeItem("userInfo:")
    }

    const hendleClickOutSite = (e) => {
        if(clieckref.current.contains(e.target) === false){
            setUploadImage(false)
        }  
    }
    // const hendleUploadPhoto = (e) => {
    //     if(clieckref.current.contains(e.target) === false){
    //         setUploadImage(false)
    //     }  
    // }

    return (
        <>
            <div className='bg-[#5F35F5] h-full rounded-3xl flex flex-col items-center py-10 justify-between'>

                <div className="w-full flex flex-col justify-center items-center flex-wrap gap-4 h-[25%] ">
                    <div className='bg-white w-28 h-28  rounded-full group relative'>
                        <img className="rounded-full object-cover" src={placeHolder} alt="" />

                        <div onClick={()=> setUploadImage(true)} className="w-full h-full bg-[#00000036] rounded-full opacity-0 group-hover:opacity-100 duration-300 absolute top-0 left-0">
                            <div className="w-full h-full flex items-center justify-center">
                                <MdFileUpload className="text-4xl text-white animate-bounce" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-center w-full text-2xl font-bold text-white ">Md Shale Newaj</h2>
                </div>
                <div className="h-[50%] w-full flex justify-center items-center">
                    <ul className="flex flex-col gap-10 navbar">

                        <NavLink
                            to="/"

                            className={({ isActive }) =>
                                isActive
                                    ? "text-4xl  w-48 -mr-20 py-4  text-[#5F35F5] bg-white duration-300 px-8 rounded-l-2xl font-bold"
                                    : "text-4xl text-white w-48 -mr-20 py-4 px-4 hover:text-[#5F35F5] hover:bg-white duration-300 hover:px-8 rounded-l-2xl"
                            }
                        >
                            <li><GoHome /></li>
                        </NavLink>

                        <NavLink
                            to="/inbox"

                            className={({ isActive }) =>
                                isActive
                                    ? "text-4xl  w-48 -mr-20 py-4  text-[#5F35F5] bg-white duration-300 px-8 rounded-l-2xl font-bold"
                                    : "text-4xl text-white w-48 -mr-20 py-4 px-4 hover:text-[#5F35F5] hover:bg-white duration-300 hover:px-8 rounded-l-2xl"
                            }
                        >
                            <li><LuMessageCircleMore /></li>
                        </NavLink>
                        <NavLink
                            to="/notifications"

                            className={({ isActive }) =>
                                isActive
                                    ? "text-4xl  w-48 -mr-20 py-4  text-[#5F35F5] bg-white duration-300 px-8 rounded-l-2xl font-bold"
                                    : "text-4xl text-white w-48 -mr-20 py-4 px-4 hover:text-[#5F35F5] hover:bg-white duration-300 hover:px-8 rounded-l-2xl"
                            }
                        >
                            <li><IoMdNotificationsOutline /></li>
                        </NavLink>
                        <NavLink
                            to="/settings"

                            className={({ isActive }) =>
                                isActive
                                    ? "text-4xl  w-48 -mr-20 py-4  text-[#5F35F5] bg-white duration-300 px-8 rounded-l-2xl font-bold"
                                    : "text-4xl text-white w-48 -mr-20 py-4 px-4 hover:text-[#5F35F5] hover:bg-white duration-300 hover:px-8 rounded-l-2xl"
                            }
                        >
                            <li><IoSettingsOutline /></li>
                        </NavLink>






                    </ul>
                </div>
                <div className="h-[25%] w-full flex items-end justify-center">
                    <RiLogoutBoxRLine onClick={hendlerSingOut} className="text-5xl text-white" />
                </div>
            </div>
            {/* ------------------------- */}
            <div onClick={hendleClickOutSite} className={`w-full h-screen ${!uploadImage && 'hidden'}  ${uploadImage && 'absolute top-0 left-0'} flex justify-center items-center shadow-2xl bg-[#00000052] `}>
                <div ref={clieckref} className='bg-white w-[30%] p-16 rounded-2xl '>

                    <form>
                        <div className='flex gap-6'>
                            <Button onClick={()=> setUploadImage(true)} type="submit" variant="PrimaryBtn">{loading ? <RiseLoader color={'white'} size={10} /> : 'Back to home'}</Button>
                            <Button type="submit" variant="PrimaryBtn">{loading ? <RiseLoader color={'white'} size={10} /> : 'Upload'}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default Navbar;