import React from 'react';
import { IoSearch } from "react-icons/io5";
import ItemsCard from './ItemsCard';

const categoryCard = ({ CardTitle, children }) => {
    return (
        <div className='w-full shadow-xl h-[431px] p-5'>
            <div className='relative'>
                <input type="text" className='border-[#2e2a2a] border-2 rounded-full w-full p-2 pl-12' />
                <IoSearch className='text-2xl absolute top-3 left-4' />
            </div>
            <h4 className='font-bold my-3 text-xl'>{CardTitle}</h4>

            <div className={`${children ? 'overflow-y-scroll' : '' } h-[300px]`}>
            {children}
            </div>
        </div>
    );
};

export default categoryCard;