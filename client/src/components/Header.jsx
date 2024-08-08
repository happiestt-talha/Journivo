import { Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import logo from '../assets/icons/blog-50.png'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <>
            <Navbar className='border-b-2'>
                <Link to="/"
                    className="flex items-center"
                >
                    <img src={logo} alt="Journivo" />

                    <span
                        className="self-center whitespace-nowrap text-xl font-semibold
                        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-1
                        text-white rounded-lg dark:text-white"
                    >Journivo</span>

                    <span
                        className='font-bold text-xl'
                    >'s Blog</span>
                </Link>

                <TextInput
                    type="search"
                    placeholder="Search..."
                    className="w-80"
                />
            </Navbar>
        </>
    )
}

export default Header