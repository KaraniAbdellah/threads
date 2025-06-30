import React from 'react';


const Menu = () => {
    return (
        <div>
            <button className='active'>Home</button>
            <button className='text-yellow-500 font-semibold'>Followers</button>
            <button className='text-yellow-500 font-semibold'>Following</button>
            <button className='text-yellow-500 font-semibold'>Profile</button>
            <button className='text-yellow-500 font-semibold'>Posts</button>
            <button className='text-yellow-500 font-semibold'>Notofications</button>
        </div>
    );
}

export default Menu;
