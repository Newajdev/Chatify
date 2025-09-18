import CategoryCard from '../../components/CategoryCard'
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set, push, remove, query, orderByChild, equalTo, get } from "firebase/database";
import { useSelector } from 'react-redux';

const Alluser = () => {
    const db = getDatabase();
    const UserInfo = useSelector((state) => state.activeUser.value)
    const [alluser, setAllUser] = useState([])
    const [friends, setFriends] = useState([])
    // const [currentfriend, setCurrentFriend] = useState([])
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
    }, [db, UserInfo.uid])

    useEffect(() => {
        const FriendRequest = ref(db, 'friendrequests/');
        onValue(FriendRequest, (snapshot) => {

            const FullId = []
            snapshot.forEach(user => {
                FullId.push(user.val().SenderId + user.val().ReciverId)

            })
            setConcetId(FullId)

        });
    }, [db])

    useEffect(() => {
        const userListRef = ref(db, 'friendlist/');
        onValue(userListRef, (snapshot) => {
            const Friends = []
            snapshot.forEach(user => {

                const Reciver = user.val().ReciverId
                const Sender = user.val().SenderId
                Friends.push(Reciver, Sender)

            })


            const uniqueFriends = Friends.reduce((acc, curr) => {
                if (!acc.includes(curr)) {
                    acc.push(curr);
                }
                return acc;
            }, []);

            setFriends(uniqueFriends);
        });
    }, [db])

    // All ready Friend
    useEffect(() => {
        const userListRef = ref(db, 'friendlist/');
        onValue(userListRef, (snapshot) => {
            const Users = []
            snapshot.forEach(user => {
                Users.push({ ...user.val(), UserId: user.key })
            })
            setFriends(Users)
        });
    }, [db])

    const isFriend = (UserId) => {
        return friends.some((fnd) =>
            (fnd.ReciverId == UserInfo.uid && fnd.SenderId == UserId) ||
            (fnd.SenderId == UserInfo.uid && fnd.ReciverId == UserId)
        )

    }

    const hendleSendRequest = (user) => {

        set(push(ref(db, 'friendrequests/')), {
            SenderId: UserInfo.uid,
            SenderName: UserInfo.displayName,
            Senderphoto: UserInfo.photoURL,

            ReciverId: user.UserId,
            Reciverusername: user.username,
            Reciverphoto: user.photo

        });

    }

    const hendleDelateRequest = (user) => {

        const FriendRequestQuery = query(
            ref(db, "friendrequests"),
            orderByChild("ReciverId"),
            equalTo(user.UserId)
        );


        get(FriendRequestQuery).then((snapshot) => {
            snapshot.forEach((child) => {
                remove(ref(db, "friendrequests/" + child.key));
            });
        });

    }

    const hendleAcceptRequest = (user) => {

        const FriendRequestQuery = query(
            ref(db, "friendrequests"),
            orderByChild("SenderId"),
            equalTo(user.UserId)
        );
        get(FriendRequestQuery).then((snapshot) => {
            snapshot.forEach(() => {
                set(push(ref(db, 'friendlist/')), {
                    SenderId: UserInfo.uid,
                    SenderName: UserInfo.displayName,
                    Senderphoto: UserInfo.photoURL,

                    ReciverId: user.UserId,
                    Reciverusername: user.username,
                    Reciverphoto: user.photo

                });

            });
        });

        get(FriendRequestQuery).then((snapshot) => {
            snapshot.forEach((child) => {
                remove(ref(db, "friendrequests/" + child.key));
            });
        });

    }

    const hendleUnFriend = (user) => {
        const unFriendSender = query(
            ref(db, "friendlist"),
            orderByChild("SenderId"),
            equalTo(user.UserId)
        );
         const unFriendReciver = query(
            ref(db, "friendlist"),
            orderByChild("ReciverId"),
            equalTo(user.UserId)
        );


        get(unFriendSender).then((snapshot) => {
            snapshot.forEach((child) => {
                remove(ref(db, "friendlist/" + child.key));
            });
        });
        get(unFriendReciver).then((snapshot) => {
            snapshot.forEach((child) => {
                remove(ref(db, "friendlist/" + child.key));
            });
        });
    }




    return (
        <CategoryCard CardTitle={'All User'}>
            {
                alluser?.map((user, idx) => <>
                    <div key={idx} className='flex items-center'>
                        <div className='w-full  flex items-center my-4'>
                            <div className='w-18 h-18 rounded-full overflow-hidden'>
                                <img className='rounded-full' src={user?.photo} alt="" />
                            </div>
                            <div className='ml-5 flex-1'>
                                <h4 className='font-bold text-2xl'>{user.username}</h4>
                                <p>{user?.email}</p>
                            </div>
                        </div>

                        {
                            isFriend(user.UserId) ?

                                <button onClick={() => hendleUnFriend(user)} className='bg-[#ff0000] px-4 py-1 rounded-lg text-white text-lg font-semibold'>unfriend</button>

                                :

                                ConcetID.includes(UserInfo.uid + user.UserId)
                                    ?

                                    <button onClick={() => hendleDelateRequest(user)} className='bg-[#ff0000] px-4 py-1 rounded-lg text-white text-lg font-semibold'>Remove</button> :
                                    ConcetID.includes(user.UserId + UserInfo.uid) ?
                                        <button onClick={() => hendleAcceptRequest(user)} className='bg-[#018165] px-4 py-1 rounded-lg text-white text-xl font-semibold'>Accept</button>

                                        :
                                        <button onClick={() => hendleSendRequest(user)} className='bg-[#5F35F5] px-4 py-1 rounded-lg text-white text-xl font-semibold'>Add</button>



                        }





                    </div>
                </>)
            }
        </CategoryCard>
    );
};

export default Alluser;