import { useEffect, useState } from 'react';
import CategoryCard from '../../components/CategoryCard'
import ItemsCard from '../../components/ItemsCard';
import { equalTo, get, getDatabase, onValue, orderByChild, push, query, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';
import Alluser from './Alluser';

const FriendRequests = () => {
    const db = getDatabase();
    const UserInfo = useSelector((state) => state.activeUser.value)
    const [allRequest, setAlRequest] = useState([])


    useEffect(() => {
        const FriendRequestQuery = query(
            ref(db, "friendrequests"),
            orderByChild("ReciverId"),
            equalTo(UserInfo.uid)
        );
        const FriendRequestRef = ref(db, 'friendrequests/');
        onValue(FriendRequestQuery, (snapshot) => {
            const Requests = []
            snapshot.forEach((user) => {
                Requests.push({ ...user.val(), UserId: user.key })
            })
            setAlRequest(Requests)
        });
    }, [db, UserInfo.uid])

    const hendleCencelRequest = (user) => {
        const FriendRequestQuery = query(
            ref(db, "friendrequests"),
            orderByChild("SenderId"),
            equalTo(user.SenderId)
        );
        get(FriendRequestQuery).then((snapshot) => {
            console.log(snapshot.key);

            snapshot.forEach((child) => {

                remove(ref(db, "friendrequests/" + child.key));
            });
        });

    }

    const hendleAcceptRequest = (user) => {
        set(push(ref(db, 'friendlist/')), {
            SenderId: user.SenderId,
            SenderName: user.SenderName,
            Senderphoto: user.Senderphoto,

            ReciverId: UserInfo.uid,
            Reciverusername: UserInfo.displayName,
            Reciverphoto: UserInfo.photoURL,

        });

        const FriendRequestQuery = query(
            ref(db, "friendrequests"),
            orderByChild("SenderId"),
            equalTo(user.SenderId)
        );
        get(FriendRequestQuery).then((snapshot) => {
            console.log(snapshot.key);

            snapshot.forEach((child) => {

                remove(ref(db, "friendrequests/" + child.key));
            });
        });

    }


    return (
        <CategoryCard CardTitle={'Requests'} >

            {
                allRequest.map(user => <>
                    <div className='flex items-center gap-2'>
                        <div className='w-full  flex items-center my-4'>
                            <div className='w-18 h-18 rounded-full overflow-hidden'>
                                <img className='rounded-full' src={user?.Senderphoto} alt="" />
                            </div>
                            <div className='ml-5 flex-1'>
                                <h4 className='font-bold text-2xl'>{user?.SenderName}</h4>
                            </div>
                        </div>
                        <div className='flex  gap-2'>
                            <button onClick={() => hendleAcceptRequest(user)} className='bg-[#5F35F5] px-4 py-1 rounded-lg text-white text-xl font-semibold'>Add</button>
                            <button onClick={() => hendleCencelRequest(user)} className='bg-[#ff0000] px-4 py-1 rounded-lg text-white text-xl font-semibold'>Cancel</button>
                        </div>
                    </div>
                </>
                )
            }

        </CategoryCard>
    );
};

export default FriendRequests;