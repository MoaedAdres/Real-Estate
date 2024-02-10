import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { navLinks } from '../constants'
import { Link, NavLink } from 'react-router-dom'
const Header = () => {
    return (
        <header className='bg-slate-200 shadow-md '>
            <div className='flex items-center p-3 justify-between max-w-6xl mx-auto'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Sahand </span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form className='flex items-center bg-slate-100 p-3 rounded-lg'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent outline-none w-24 sm:w-64' />
                    <FaSearch className='text-slate-600 cursor-pointer' />
                </form>
                <ul className='flex gap-4'>
                    {navLinks.map((link, index) => (
                        <NavLink key={link.linkText} to={link.path}
                        // className={({ isActive, isPending }) => isActive ? "text-red-700 underline" : ''}
                        >
                            <li className='hidden sm:inline text-slate-700 hover:underline'>{link.linkText}</li>
                        </NavLink>
                    ))}
                </ul>
            </div>
        </header>
    )
}

export default Header