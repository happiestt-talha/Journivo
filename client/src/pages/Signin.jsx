import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label, TextInput, Button } from 'flowbite-react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../store/user/userSlice'
import OAuth from '../components/Auth/OAuth'
// import { login } from '../api/Auth'

const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    //eslint-disable-next-line
    const [user, setUser] = useState(null)
    const handleChange = (e) => {
        setInput((prev) => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.email || !input.password || input.email === "" || input.password === "") return
        try {
            // console.log('Signing in...')
            // console.log('input: ',input)
            dispatch(loginStart())
            const res = await axios.post('/auth/signin', input)
            console.log(res.data)
            dispatch(loginSuccess(res.data))
            navigate('/')
            setUser(res.data)
            console.log('user: ', user)
        } catch (error) {
            console.log('Sign in error', error)
            dispatch(loginFailure(error.message))
        }
        // login(input, setUser)

    }

    return (
        <>
            <div className='max-h-screen'>
                <div className='mt-10 flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5'>

                    <div className='flex-1 order-2 md:order-1'>

                        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                            <div>
                                <Label value='Your email' />
                                <TextInput type='email' placeholder='name@company.com' id='email' value={input.email} onChange={handleChange} />
                            </div>
                            <div>
                                <Label value='Your password' />
                                <TextInput type='password' placeholder='password' id='password' value={input.password} onChange={handleChange} />
                            </div>
                            <Button gradientDuoTone={"purpleToBlue"} type='submit' >Sign in</Button>
                            <OAuth />
                        </form>

                        <div className='flex gap-3 text-sm mt-5 '>
                            <span>Don't have an account?</span>
                            <Link to={'/sign-up'} className='text-blue-500 underline'>Sign up</Link>
                        </div>

                    </div>

                    <div className='flex-1 order-1 md:order-2'>
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

                </div>
            </div>
        </>
    )
}

export default Signin