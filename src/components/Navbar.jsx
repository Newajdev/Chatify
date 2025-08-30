import { IoMdNotificationsOutline } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { createRef, useContext, useRef, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { MdFileUpload } from "react-icons/md";
import placeHolder from "../assets/placeholder.jpg"
import { Button } from "@mui/material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { getDatabase, ref as dbRef, update } from "firebase/database";


const Navbar = () => {
    const storage = getStorage();
    const database = getDatabase()
    const { user, logOut, } = useContext(AuthContext)
    const navigate = useNavigate()
    const [uploadImage, setUploadImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const clieckref = useRef(null)
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();
  



    const hendlerSingOut = () => {
        logOut()
        navigate('/login')
        localStorage.removeItem("userInfo:")
    }

    const hendleClickOutSite = (e) => {
        if (clieckref.current.contains(e.target) === false) {
            setUploadImage(false)
        }
    }

    const onChange = (e) => {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);


        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {


        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

            const storageRef = ref(storage, user?.uid);

            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then(() => {

            });
            getDownloadURL(storageRef).then((downloadURL) => {
                updateProfile(user, {
                    photoURL: `${downloadURL}`
                }).then(() => {
                    setUploadImage(false)
                }
                )

                const userRef = dbRef(database, `AllUsers/${user?.uid}`);
                update(userRef, {photo: downloadURL})
            });

        }
    };

    return (
        <>
            <div className='bg-[#5F35F5] h-full rounded-3xl flex flex-col items-center py-10 justify-between'>

                <div className="w-full flex flex-col justify-center items-center flex-wrap gap-4 h-[25%] ">
                    <div className='bg-white w-28 h-28  rounded-full overflow-hidden group relative'>
                        <img className="rounded-full object-cover" src={user.photoURL ? user.photoURL : placeHolder} alt="" />

                        <div onClick={() => setUploadImage(true)} className="w-full h-full bg-[#00000036] rounded-full opacity-0 group-hover:opacity-100 duration-300 absolute top-0 left-0">
                            <div className="w-full h-full flex items-center justify-center">
                                <MdFileUpload className="text-4xl text-white animate-bounce" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-center w-full text-2xl font-bold text-white ">{user.displayName}</h2>
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
                    <RiLogoutBoxRLine onClick={hendlerSingOut} className="text-5xl text-white hover:cursor-pointer hover:text-6xl duration-200" />
                </div>
            </div>
            {/* ------------------------- */}
            <div onClick={hendleClickOutSite} className={`w-full h-screen ${!uploadImage && 'hidden'}  ${uploadImage && 'absolute top-0 left-0 z-10'} flex justify-center items-center shadow-2xl bg-[#00000052] `}>
                <div ref={clieckref} className='bg-white w-[30%] p-16 rounded-2xl '>
                    <div style={{ width: "100%" }}>
                        <h2>Upload your Profile Image</h2>
                        <div className="border flex justify-center items-center p-2 rounded-xl bg-gray-200 ">
                            <input className="w-full " type="file" onChange={onChange} />
                        </div>

                        <div className="my-4">
                            {
                                image && <Cropper
                                    ref={cropperRef}
                                    style={{ width: "100%" }}
                                    initialAspectRatio={1}
                                    preview=".img-preview"
                                    src={image}
                                    viewMode={1}
                                    minCropBoxHeight={10}
                                    minCropBoxWidth={10}
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                    checkOrientation={false}
                                    guides={true}
                                />
                            }
                        </div>

                    </div>

                    <div className='flex gap-6'>
                        <Button onClick={() => setUploadImage(true)} type="submit" variant="PrimaryBtn">{loading ? <RiseLoader color={'white'} size={10} /> : 'Back to home'}</Button>
                        <Button onClick={getCropData} type="submit" variant="PrimaryBtn">{loading ? <RiseLoader color={'white'} size={10} /> : 'Upload'}</Button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Navbar;