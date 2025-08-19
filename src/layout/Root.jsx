import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";


const Root = () => {
    const location = useLocation()
    return (
        <div className="flex items-center">
            <div className="w-[15%] h-screen p-6">{(location.pathname === '/login' || location.pathname == '/register') || <Navbar></Navbar>}</div>
            <div className=" h-screen flex-1 p-10"><Outlet></Outlet> </div>


        </div>
    );
};

export default Root;