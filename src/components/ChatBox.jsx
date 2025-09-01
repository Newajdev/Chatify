import { IoIosSend } from 'react-icons/io';
import { HiOutlineCamera } from "react-icons/hi2";
import ItemsCard from './ItemsCard';
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import ChatBubble from './ChatBubble';


const ChatBox = () => {
    const [ImgError, setImgError] = useState('')
    const [image, setImage] = useState(null);

    const hendlesubmite = (e) => {
        e.preventDefault()
        console.log('Send Meages');

    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                setImgError(`your file size is ${file.size} which is more the 100 KB`)
                setImage(null)
            }
            const img = new Image();
            img.src = URL.createObjectURL(file)

            img.onload = () => {
                setImgError(``)
                setImage(img.src)
            }

        }
    };
    return (
        <div className='border border-gray-200 h-full mx-10 rounded-2xl shadow-2xl flex flex-col '>
            {/* Profile Area */}
            <div className='w-full flex items-center px-10 border-b-2 rounded-t-2xl border-gray-200 bg-gray-50'>
                <ItemsCard />
                <button className='bg-[#5F35F5] px-4 py-1 rounded-lg text-white text-xl font-semibold'>
                    
                </button>
            </div>

            {/* Chat Area */}
            <div className='w-full flex-1 px-10 overflow-y-scroll h-full'>
                <div className='h-1 flex flex-col justify-between '>
                    <ChatBubble sender message={'hello'} />
                    <ChatBubble reciver message={'hi how are you?'} />
                    <ChatBubble sender message={'I am fine. you?'} />
                    <ChatBubble reciver message={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sequi sint provident ex non eveniet tempora asperiores a impedit alias! Explicabo in reiciendis adipisci dolore minus. Cupiditate obcaecati molestiae rem ducimus eaque ipsa at? Voluptate repellendus accusamus molestias quis consequuntur! Et non nisi neque quos odio suscipit soluta voluptatibus optio?'} />
                    <ChatBubble sender message={' non eveniet tempora asperiores a impedit alias! Explicabo in reiciendis adipisci dolore minus. Cupiditate obcaecati molestiae rem ducimus eaque ipsa at? Voluptate repellendus accusamus molestias quis consequuntur! Et non nisi neque quos odio suscipit soluta v'} />

                </div>
            </div>

            {/* Send Mesage Area */}
            <div className='w-full px-10 py-6 rounded-b-2xl border-t-2 border-gray-200 bg-gray-50'>
                {
                    image &&
                    <div className='w-20 h-20 mb-3 relative'>
                        <img
                            className='max-w-20 h-20'
                            src={image}
                        />
                        <div onClick={() => setImage('')} className='absolute top-0 right-0 bg-gray-200'>
                            <RxCross2 />
                        </div>
                    </div>
                }
                <form className='flex items-center justify-center gap-4 w-full' onSubmit={hendlesubmite}>


                    <div className='border-gray-300 border flex-1 px-5 py-2 rounded-lg flex items-center justify-between gap-2'>
                        <input type="text" placeholder='Write Something . . .' className='flex-1 focus:outline-none' />

                        <input type="file" id='image' className='hidden' onChange={handleImageChange} />
                        <label htmlFor="image" className='text-xl'>
                            <HiOutlineCamera />
                        </label>
                    </div>


                    <label htmlFor="submit" className='bg-[#5F35F5] px-3 py-2 rounded text-white text-xl'>
                        <IoIosSend />
                    </label>
                    <input type="submit" id='submit' className='hidden' />
                </form>
            </div>

        </div>
    );
};

export default ChatBox;