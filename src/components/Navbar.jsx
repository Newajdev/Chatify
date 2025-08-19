import { IoMdNotificationsOutline } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";



const Navbar = () => {
    return (
        <div className='bg-[#5F35F5] h-full rounded-3xl flex flex-col items-center py-10 justify-between'>

            <div className="w-full flex flex-col justify-center items-center flex-wrap gap-4 h-[25%]">
                <div className='bg-white w-28 h-28  rounded-full'>
                    <img src="" alt="" />
                    
                </div>
                <h2 className="text-center w-full text-2xl font-bold text-white ">Md Shale Newaj</h2>
            </div>
            <div className="h-[50%] w-full flex justify-center items-center">
                <ul className="flex flex-col gap-10 ">
                    <NavLink to={'/'}><li className="text-4xl text-white w-48 -mr-20 py-4 px-4 hover:text-[#5F35F5] hover:bg-white duration-300 hover:px-8 "><GoHome /></li></NavLink>
                    <NavLink to={'/inbox'}><li className="text-4xl text-white w-48 -mr-20 py-4 px-4 hover:text-[#5F35F5] hover:bg-white duration-300 hover:px-8  "><LuMessageCircleMore /></li></NavLink>
                    <NavLink to={'/notification'}><li className="text-4xl text-white w-48 -mr-20 py-4 px-4 hover:text-[#5F35F5] hover:bg-white duration-300 hover:px-8 "><IoMdNotificationsOutline /></li></NavLink>
                    <NavLink to={'/setting'}><li className="text-4xl text-white w-48 -mr-20 py-4 px-4 hover:text-[#5F35F5] hover:bg-white duration-300 hover:px-8 "><IoSettingsOutline /></li></NavLink>
                </ul>
            </div>
            <div className="h-[25%] w-full flex items-end justify-center">
                <RiLogoutBoxRLine className="text-5xl text-white" />
            </div>
        </div>
    );
};

export default Navbar;