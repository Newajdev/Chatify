import placeholder from '../assets/placeholder.jpg'
const ItemsCard = ({UserData, hendleSendRequest, btnText}) => {
       
    return (
        <div className='w-full  flex items-center my-4'>
            <div className='w-18 h-18 rounded-full overflow-hidden'>
                <img className='rounded-full' src={UserData?.photo ? UserData?.photo : placeholder } alt="" />
            </div>
            <div className='ml-5 flex-1'>
                <h4 className='font-bold text-2xl'>{UserData?.username ? UserData?.username : 'User Name'}</h4>
                <p>{UserData?.email ? UserData?.email : 'user Email'}</p>
            </div>
            <div className=''>
                <button onClick={()=>hendleSendRequest(UserData)} className='bg-[#5F35F5] px-4 py-1 rounded-lg text-white text-xl font-semibold'>{btnText ? btnText : 'Button'}</button>
            </div>
        </div>
    );
};

export default ItemsCard;