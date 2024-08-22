import React from 'react'
import useOnlineStatus from '../utils/useOnlineStatus'
import profile from "../assets/profile.png"

const Navbar = () => {
    return (
        <div className='justify-end text-black dark:text-white right-0 top-0 z-10 p-4 text-lg flex gap-4 items-center'>

            {useOnlineStatus() ? '🟢 Connected' : '🔴 Disconnected'}
            <img
                src={profile}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-700"
            />
        </div>
    )
}

export default Navbar
