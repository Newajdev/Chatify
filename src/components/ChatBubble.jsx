import React from 'react';

const ChatBubble = ({ sender, reciver , message }) => {
    return (
        <div className={`flex flex-col py-3 px-2 ${sender && 'items-start'} ${reciver && 'items-end'}`}>
            <div className=''>
                <p
                    className={`text-lg  inline-flex px-3 py-2 relative max-w-xl
                ${sender && 'bg-[#F1F1F1] text-black rounded-t-xl rounded-br-xl Sender text-left'} 
                ${reciver && 'bg-[#5F35F5] text-white rounded-t-xl rounded-bl-xl Reciver text-right'} `}
                >{message}</p>
            </div>
            <p className={`text-sm text-gray-400 uppercase
                ${sender && 'text-left'} 
                ${reciver && 'text-right'}
                `}>time:3:25am</p>
        </div>
    );
};

export default ChatBubble;