import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryCard from '../../components/CategoryCard'
import ItemsCard from '../../components/ItemsCard';


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
                <CategoryCard CardTitle={'My Groups'}>
                    <ItemsCard />
                    <ItemsCard />
                    <ItemsCard />
                    <ItemsCard />

                </CategoryCard>
                <CategoryCard CardTitle={'FriendList'}>
                    <ItemsCard />
                </CategoryCard>
                <CategoryCard CardTitle={'All User'} />
                <CategoryCard CardTitle={'Requests'} />
                <CategoryCard CardTitle={'All Groups'} />
                <CategoryCard CardTitle={'Blocked user'} />
            </div>
        </div>
    );
};

export default Home;