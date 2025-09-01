import { useEffect,} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MyGroup from './MyGroup';
import FriendList from './FriendList';
import Alluser from './Alluser';
import FriendRequests from './FriendRequests';
import AllGroups from './AllGroups';
import BlockedUser from './BlockedUser';


const Home = () => {
    const UserInfo = useSelector((state) => state.activeUser.value)
    const navigate = useNavigate()

    useEffect(() => {
        if (!UserInfo) {
            navigate('/login')
        }
    }, [])
  
    return (
        <div className='p-10'>
            <div className='grid grid-cols-3 grid-rows-2 gap-4 '>
                <MyGroup/>
                <FriendList/>
                <Alluser/>
                <FriendRequests/>
                <AllGroups/>
                <BlockedUser/>
            </div>
        </div>
    );
};

export default Home;