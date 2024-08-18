import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'
const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <>
            <div className='max-w-lg mx-auto p-3 w-full'>
                <h1 className="my-7 font-semibold text-center text-3xl">Profile</h1>

                <form className="flex flex-col gap-4">
                    <img src={currentUser?.profilePic} alt="Could not be loaded" className='w-32 h-32 rounded-full mx-auto' />

                    <TextInput type="name" id="name" label="username" placeholder='Username' defaultValue={currentUser?.username} />
                    <TextInput type="email" id="email" label="Email address" placeholder='Email address' defaultValue={currentUser?.email} />
                    <TextInput type="pssword" id="password" label="Password" placeholder='**********'  />
                    <Button type="submit" gradientDuoTone="purpleToBlue" outline>Update</Button>
                </form>
            </div>
        </>
    )
}

export default DashProfile