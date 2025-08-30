import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/CategoryCard'
import ItemsCard from '../../components/ItemsCard';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { FaUserPlus } from 'react-icons/fa';


const Home = () => {
    const db = getDatabase();
    const UserInfo = useSelector((state) => state.activeUser.value)
    const navigate = useNavigate()
    const [alluser, setAllUser] = useState([])
    const [SendRequest, setSendRequest] = useState(false)
    console.log(UserInfo);



    useEffect(() => {
        if (!UserInfo) {
            navigate('/login')
        }
    }, [])
    // Data loading Fuctions---------------------------Start

    useEffect(() => {
        const userListRef = ref(db, 'AllUsers/');
        onValue(userListRef, (snapshot) => {

            const Users = []
            snapshot.forEach(user => {
                if (user.key != UserInfo.uid) {
                    Users.push({ ...user.val(), UserId: user.key })
                }
            })

            setAllUser(Users)
        });
    }, [])
    // Data loading Fuctions---------------------------End

    // Click Fuctions---------------------------Start

    const hendleSendRequest = (usersData) => {
        set(push(ref(db, 'friendrequests/')), {
            RsenderId: UserInfo.uid,
            RsenderName: UserInfo.displayName,

            RreciverId: usersData.UserId,
            RreciverName: usersData.username,
            RreciverImg: usersData.photo

        });
        setSendRequest(true)


    }
    // Click Fuctions---------------------------End



    return (
        <div className='p-10'>
            <div className='grid grid-cols-3 grid-rows-2 gap-4 '>
                <CategoryCard CardTitle={'My Groups'}>
                    <ItemsCard />
                    <ItemsCard />
                    <ItemsCard />
                    <ItemsCard />

                </CategoryCard>
                <CategoryCard CardTitle={'FriendList'}>
                    <ItemsCard />
                </CategoryCard>
                <CategoryCard CardTitle={'All User'}>
                    {
                        alluser?.map((user, idx) => <ItemsCard key={idx} UserData={user} hendleSendRequest={hendleSendRequest} btnText={SendRequest ? 'hello' : <FaUserPlus />} />)
                    }
                </CategoryCard>
                <CategoryCard CardTitle={'Requests'} />
                <CategoryCard CardTitle={'All Groups'} />
                <CategoryCard CardTitle={'Blocked user'} />
            </div>
        </div>
    );
};

export default Home;