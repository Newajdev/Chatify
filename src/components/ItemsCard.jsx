import placeholder from '../assets/placeholder.jpg'
const ItemsCard = ({UserData}) => {
       
    return (
        <div className='w-full  flex items-center my-4'>
            <div className='w-18 h-18 rounded-full overflow-hidden'>
                <img className='rounded-full' src={UserData?.photo ? UserData?.photo : UserData?.RreciverImg ? UserData?.ReciverImg : placeholder } alt="" />
            </div>
            <div className='ml-5 flex-1'>
                <h4 className='font-bold text-2xl'>{UserData?.username ? UserData?.username : 'User Name'}</h4>
                <p>{UserData?.email ? UserData?.email : 'user Email'}</p>
            </div>
        </div>
    );
};

export default ItemsCard;