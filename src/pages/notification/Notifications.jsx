import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
    const UserInfo = useSelector((state)=> state.activeUser.value)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!UserInfo){
            navigate('/login')
        }
    },[])
    return (
        <div className='p-10'>
            This Is Noticifiations
        </div>
    );
};

export default Notifications;