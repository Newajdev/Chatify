const ItemsCard = ({UserData, hendleSendRequest, btnText}) => {
       
    return (
        <div className='w-full  flex items-center my-4'>
            <div className='w-18 h-18 rounded-full overflow-hidden'>
                <img className='rounded-full' src={UserData?.photo} alt="" />
            </div>
            <div className='ml-5 flex-1'>
                <h4 className='font-bold text-2xl'>{UserData?.username}</h4>
                <p>{UserData?.email}</p>
            </div>
            <div className=''>
                <button onClick={()=>hendleSendRequest(UserData)} className='bg-[#5F35F5] px-4 py-1 rounded-lg text-white text-xl font-semibold'>{btnText}</button>
            </div>
        </div>
    );
};

export default ItemsCard;