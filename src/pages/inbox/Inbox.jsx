import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatBox from "../../components/ChatBox";
import MyGroup from '../home/MyGroup';
import FriendList from '../home/FriendList';


const Inbox = () => {
    const UserInfo = useSelector((state)=> state.activeUser.value)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!UserInfo){
            navigate('/login')
        }
    },[])
    return (
        <div className='p-10'>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-2 ">
                    <MyGroup/>
                    <FriendList/>
                </div>
                <div className="col-span-4">
                    <ChatBox/>
                </div>
            </div>
        </div>
    );
};

export default Inbox;