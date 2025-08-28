import React from 'react';
import placeholder from '../../src/assets/placeholder.jpg'

const ItemsCard = ({UserData}) => {
       
    return (
        <div className='w-full  flex items-center my-4'>
            <div className='w-18 h-18'>
                <img className='rounded-full' src={UserData?.photo} alt="" />
            </div>
            <div className='ml-5 flex-1'>
                <h4 className='font-bold text-2xl'>{UserData?.username}</h4>
                <p>{UserData?.email}</p>
            </div>
            <div className=''>
                <button className='bg-[#5F35F5] px-4 py-1 rounded-lg text-white text-xl font-semibold'>Join</button>
            </div>
        </div>
    );
};

export default ItemsCard;