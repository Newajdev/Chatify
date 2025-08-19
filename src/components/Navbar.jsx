
import { GoHome } from "react-icons/go";

const Navbar = () => {
    return (
        <div className='bg-[#5F35F5] h-full rounded-3xl flex flex-col items-center py-10'>
            <div className='bg-white w-28 h-28  rounded-full'>
                <img src="" alt="" />
            </div>
            <div>
                <GoHome />
            </div>
        </div>
    );
};

export default Navbar;