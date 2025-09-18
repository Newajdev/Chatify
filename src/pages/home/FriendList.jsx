import CategoryCard from '../../components/CategoryCard'
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendList = () => {

    const db = getDatabase();
    const UserInfo = useSelector((state) => state.activeUser.value)
    const [allRequest, setAlRequest] = useState([])
    
    

    useEffect(() => {
        const FriendListRef = ref(db, 'friendlist/');
        onValue(FriendListRef, (snapshot) => {
            const Friends = []
            snapshot.forEach(user => {
                if (UserInfo.uid == user.val().SenderId || UserInfo.uid == user.val().ReciverId) {
                    Friends.push({ ...user.val(), UserId: user.key })
                }
            })
            setAlRequest(Friends)
        });
    }, [db, UserInfo])

    return (
        <CategoryCard CardTitle={'FriendList'}>
            {
                allRequest.map(user =>
                    <div className='w-full  flex items-center my-4'>
                        <div className='w-18 h-18 rounded-full overflow-hidden'>
                            <img className='rounded-full' src={UserInfo.uid !== user.ReciverId ? user.Reciverphoto : user.Senderphoto} alt="" />
                        </div>
                        <div className='ml-5 flex-1'>
                            <h4 className='font-bold text-2xl'>{UserInfo.uid !== user.ReciverId ? user.Reciverusername : user.SenderName}</h4>
                        </div>
                    </div>
                )
            }
        </CategoryCard>
    );
};

export default FriendList;