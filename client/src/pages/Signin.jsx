import React from 'react'
import { Link } from 'react-router-dom'
import { Label, TextInput, Button } from 'flowbite-react'

const Signin = () => {
    return (
        <>
            <div className='max-h-screen'>
                <div className='mt-10 flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5'>

                    <div className='flex-1 order-2 md:order-1'>

                        <form className='flex flex-col gap-5'>
                            <div>
                                <Label value='Your email' />
                                <TextInput type='email' placeholder='name@company.com' id='email' />
                            </div>
                            <div>
                                <Label value='Your password' />
                                <TextInput type='password' placeholder='password' id='password' />
                            </div>
                            <Button gradientDuoTone={"purpleToBlue"} type='submit' >Sign up</Button>
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