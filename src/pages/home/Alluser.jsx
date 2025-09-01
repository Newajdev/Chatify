import { FaUserPlus } from 'react-icons/fa';
import CategoryCard from '../../components/CategoryCard'
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set, push, remove, query, orderByChild, equalTo, get } from "firebase/database";
import { useSelector } from 'react-redux';
import ItemsCard from '../../components/ItemsCard';

const Alluser = () => {
    const db = getDatabase();
    const UserInfo = useSelector((state) => state.activeUser.value)
    const [alluser, setAllUser] = useState([])
    const [ConcetID, setConcetId] = useState('')

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

    useEffect(() => {
        const FriendRequest = ref(db, 'friendrequests/');
        onValue(FriendRequest, (snapshot) => {

            const FullId = []
            snapshot.forEach(user => {
                FullId.push(user.val().RsenderId + user.val().RreciverId)

            })
            setConcetId(FullId)

        });
    }, [])



    const hendleSendRequest = (user) => {

        set(push(ref(db, 'friendrequests/')), {
            RsenderId: UserInfo.uid,

            RreciverId: user.UserId,
            RreciverName: user.username,
            RreciverImg: user.photo

        });

    }

    const hendleDelateRequest = (user) => {
        console.log(user.UserId);
        const FriendRequestQuery = query(
            ref(db, "friendrequests"),
            orderByChild("RreciverId"),
            equalTo(user.UserId)
        );

        get(FriendRequestQuery).then((snapshot) => {
            snapshot.forEach((child) => {
                remove(ref(db, "friendrequests/" + child.key));
            });
        });

    }

    return (
        <CategoryCard CardTitle={'All User'}>
            {
                alluser?.map((user, idx) => <>
                    <div key={idx} className='flex items-center'>
                        <ItemsCard UserData={user} />

                        {
                            ConcetID.includes(UserInfo.uid + user.UserId) ||
                                ConcetID.includes(user.UserId + UserInfo.uid) ?

                                <button onClick={() => hendleDelateRequest(user)} className='bg-[#ff0000] px-4 py-1 rounded-lg text-white text-xl font-semibold'>Cancel</button> :

                                <button onClick={() => hendleSendRequest(user)} className='bg-[#5F35F5] px-4 py-1 rounded-lg text-white text-xl font-semibold'>Add</button>
                        }


                    </div>
                </>)
            }
        </CategoryCard>
    );
};

export default Alluser;