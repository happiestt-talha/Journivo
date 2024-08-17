import { Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../store/userSlice'
import OAuth from '../components/Auth/OAuth'

const Signup = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setInput((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(loginStart())
            const res = await axios.post('http://localhost:5000/api/auth/signup', input)
            console.log(res)
            dispatch(loginSuccess(res.data))
        } catch (error) {
            dispatch(loginFailure(error.message))
        }
    }
    return (
        <>
            <div className='max-h-screen'>
                <div className='mt-10 flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5'>

                    <div className='flex-1 '>
                        <Link to="/" className="flex items-center font-bold text-4xl dark:text-white">
                            <span
                                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-1 text-white rounded-lg dark:text-white">
                                Journivo</span>
                            <span
                                className=''
                            >'s Blog</span>
                        </Link>
                        <p className='text-sm mt-5'>
                            This is a demo project. You can sign up with your email and password
                            or with Google.
                        </p>
                    </div>

                    <div className='flex-1 '>

                        <form className='flex flex-col gap-5'>
                            <div>
                                <Label value='Your username' />
                                <TextInput type='text' placeholder='username' id='username' onChange={handleChange} value={input.username} name='username' />
                            </div>
                            <div>
                                <Label value='Your email' />
                                <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} value={input.email} name='email' />
                            </div>
                            <div>
                                <Label value='Your password' />
                                <TextInput type='password' placeholder='password' id='password' onChange={handleChange} value={input.password} name='password' />
                            </div>
                            <Button gradientDuoTone={"purpleToBlue"} type='submit' onClick={handleSubmit} >Sign up</Button>
                            <OAuth/>
                        </form>

                        <div className='flex gap-3 text-sm mt-5 '>
                            <span>Already have an account?</span>
                            <Link to={'/sign-in'} className='text-blue-500 underline'>Sign in</Link>
                        </div>

                        <div>
                            {
                                currentUser ? <p>Hello {currentUser.username}</p>
                                    : <p>No user</p>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Signup