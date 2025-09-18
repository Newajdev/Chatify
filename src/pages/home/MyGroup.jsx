import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import ItemsCard from '../../components/ItemsCard';
import { get, getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';


const MyGroup = () => {
    const db = getDatabase();
    const UserInfo = useSelector((state) => state.activeUser.value)
    const [Friends, setFriend] = useState([])
    const [crtGroup, setCrtGroup] = useState(false)
    const clieckref = useRef(null)
    const [grpMember, setGrpMember] = useState([])
    const [group, setGroup]=useState([])

    console.log(group);
    


    useEffect(() => {
        const fetchFriends = async () => {
            const snapshot = await get(ref(db, "friendlist"));
            let friendArr = [];

            snapshot.forEach((child) => {
                let data = child.val();
                if (
                    data.SenderId === UserInfo.uid ||
                    data.ReciverId === UserInfo.uid
                ) {
                    friendArr.push({
                        UserId:
                            data.SenderId === UserInfo.uid ? data.ReciverId : data.SenderId,
                        username:
                            data.SenderId === UserInfo.uid
                                ? data.Reciverusername
                                : data.SenderName,
                        photo:
                            data.SenderId === UserInfo.uid
                                ? data.Reciverphoto
                                : data.Senderphoto,
                    });
                }
            });

            setFriend(friendArr);
        };

        fetchFriends();
    }, [db, UserInfo])

    useEffect(() => {
        const GroupRef = ref(db, 'Group/');
        onValue(GroupRef, (snapshot) => {
            // console.log(snapshot);
            
            const Groups = []
            snapshot.forEach(grp => {
                        Groups.push({ ...grp.val(), UserId: grp.key })
            })
            setGroup(Groups)
        });
    }, [db, UserInfo])

    const hendleCreateGroup = (e) => {
        e.preventDefault()
        const groupName = e.target.group.value;
        const groupMember = grpMember;
        const Creator = {
            Cid: UserInfo.uid,
            CName: UserInfo.displayName,
            Cphoto: UserInfo.photoURL,

        };

        

        set(push(ref(db, 'Group/')), {
            GroupName:groupName, Creator, groupMember
        });


    }

    const hendleAddtoGrp = (user) => {
        if (!grpMember.find((m) => m.UserId === user.UserId)) {
            setGrpMember([...grpMember, user]);
        };
    }

    const hendleClickOutSite = (e) => {
        if (clieckref.current.contains(e.target) === false) {
            setCrtGroup(false)
        }
    }

    return (
        <>
            <div className='w-full shadow-xl h-[431px] p-5'>
                <div className='relative'>
                    <input type="text" className='border-[#2e2a2a] border-2 rounded-full w-full p-2 pl-12' />
                    <IoSearch className='text-2xl absolute top-3 left-4' />
                </div>
                <div className='flex justify-between py-2'>
                    <h4 className='font-bold my-3 text-xl'>My Groups</h4>
                    <button onClick={() => setCrtGroup(true)} className='bg-[#018165] px-10  rounded-lg text-white font-semibold'>Create</button>
                </div>
                {
                    group.map((grp)=><h1>{grp.Creator.CName}</h1>)
                }

                {/* <div className={`${children ? 'overflow-y-scroll' : ''} h-[300px]`}>
                {children}
            </div> */}
            </div>

            <div onClick={hendleClickOutSite} className={`w-full h-screen ${!crtGroup && 'hidden'}  ${crtGroup && 'absolute top-0 left-0 z-10'} flex justify-center items-center shadow-2xl bg-[#00000052] `}>
                <div ref={clieckref} className='bg-white w-[30%] p-16 rounded-2xl '>
                    <form onSubmit={hendleCreateGroup}>
                        <div style={{ width: "100%" }}>
                            <h2 className='text-2xl font-bold'>Create your on Group</h2>

                            <input className='border rounded-lg my-4 w-full py-2 px-2' type='text' placeholder='Write you Group Name' name='group' />

                        </div>
                        <div className='flex gap-6'>
                            <Button type="submit" variant="PrimaryBtn">Create Group</Button>
                            <Button onClick={() => setCrtGroup(false)} variant="PrimaryBtn">Cancel</Button>
                        </div>
                    </form>
                    <div>
                        <h2 className='text-2xl font-bold'>Add your Friend to you Group</h2>

                        <div className='relative my-2'>
                            <input type="text" className='border-[#2e2a2a] border-2 rounded-full w-full p-2 pl-12' />
                            <IoSearch className='text-2xl absolute top-3 left-4' />
                        </div>

                        <div className='h-[400px] overflow-y-scroll'>

                            {
                                Friends.map(user =>
                                    <div key={user.UserId} className='flex items-center gap-2'>
                                        <div className='w-full  flex items-center my-4'>
                                            <div className='w-18 h-18 rounded-full overflow-hidden'>
                                                <img className='rounded-full' src={user.photo} alt="" />
                                            </div>
                                            <div className='ml-5 flex-1'>
                                                <h4 className='font-bold text-2xl'>{user.username}</h4>
                                            </div>
                                        </div>
                                        <div className='flex  gap-2'>
                                            <button onClick={() => hendleAddtoGrp(user)} className='bg-[#5F35F5] px-4 py-1 rounded-lg text-white text-xl font-semibold'>Add</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default MyGroup;