import {  useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { RiseLoader } from "react-spinners";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <span><RiseLoader/></span>
    }
    if(user){
        return children
    }

    return <Navigate to={'/login'} state={{from: location}} replace />
};

export default PrivateRoute;