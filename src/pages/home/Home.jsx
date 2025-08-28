import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/CategoryCard'
import ItemsCard from '../../components/ItemsCard';
import { getDatabase, ref, onValue } from "firebase/database";


const Home = () => {
    const db = getDatabase();
    const UserInfo = useSelector((state) => state.activeUser.value)
    const navigate = useNavigate()
    const [alluser, setAllUser]= useState([])

    useEffect(() => {
        if (!UserInfo) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        const userListRef = ref(db, 'AllUsers/');
        onValue(userListRef, (snapshot) => {
            
            const Users = []
            snapshot.forEach(user => {
                Users.push(user.val())
            })

            setAllUser(Users)
        });
    }, [])



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
                        alluser?.map(user => <ItemsCard  UserData={user} />)
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