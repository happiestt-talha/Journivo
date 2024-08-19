import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
const DashProfile = () => {
    const { currentUser } = useSelector((state) => state.user)
    const fileRef = useRef()

    const [img, setImg] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    const handleImageOnChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImg(file)
            setImgUrl(URL.createObjectURL(file))
        }
        console.log(img)
        console.log(imgUrl)
    }
    const handleImageUpload = () => {
        fileRef.current.click()
    }

    useEffect(() => {
        if (img) {
            handleImageUpload()
        }
    })
    return (
        <>
            <div className='max-w-lg mx-auto p-3 w-full'>
                <h1 className="my-7 font-semibold text-center text-3xl">Profile</h1>

                <form className="flex flex-col gap-4">
                    <TextInput type='file' accept='image/*' onChange={handleImageOnChange} ref={fileRef} className='hidden' />
                    <img src={currentUser?.profilePic} alt="Could not be loaded" className='w-32 h-32 rounded-full mx-auto cursor-pointer' onClick={handleImageUpload} />

                    <TextInput type="name" id="name" label="username" placeholder='Username' defaultValue={currentUser?.username} />
                    <TextInput type="email" id="email" label="Email address" placeholder='Email address' defaultValue={currentUser?.email} />
                    <TextInput type="pssword" id="password" label="Password" placeholder='**********' />
                    <Button type="submit" gradientDuoTone="purpleToBlue" outline>Update</Button>
                </form>
                <div className='text-red-500 flex justify-between mt-3 '>
                    <span className='cursor-pointer hover:text-red-700 '>Delete Account</span>
                    <span className='cursor-pointer hover:text-red-700 '>Sign Out</span>
                </div>
            </div>
        </>
    )
}

export default DashProfile