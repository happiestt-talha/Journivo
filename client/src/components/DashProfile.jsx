import { Button, TextInput } from 'flowbite-react'
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/user/userSlice'
import { app } from '../firebase/Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DashProfile = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const fileRef = useRef()

    const [img, setImg] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [uploadError, setUploadError] = useState('')

    const notify = () => toast.success('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
    const handleImageOnChange = (e) => {
        const file = e.target.files[0]
        console.log('file: ', file)
        if (file) {
            setImg(file)
            setImgUrl(URL.createObjectURL(file))
            console.log('img: ', img)
            console.log('imgUrl: ', imgUrl)
        }
    }

    const handleImageUpload = useCallback((() => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + img.name
        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, img)

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress.toFixed(0))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                    default:
                        break
                }
            },
            (error) => {
                setUploadError('Failed to upload image')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL)
                    setImgUrl(downloadURL)
                })
            }
        )
    }
    ), [img])

    useEffect(() => {
        if (img) {
            handleImageUpload()
        }
    }, [handleImageUpload, img])

    const handleSignOut = () => {
        dispatch(logout())
    }
    return (
        <>
            <div className='max-w-lg mx-auto p-3 w-full'>
                <h1 className="my-7 font-semibold text-center text-3xl">Profile</h1>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition= "Bounce"
                    />
                <form className="flex flex-col gap-4">
                    <TextInput type='file' accept='image/*' onChange={handleImageOnChange} ref={fileRef} className='hidden' />
                    <span className='bg-gray-400 rounded-full w-36 h-36 flex items-center mx-auto'>
                        <img src={imgUrl || currentUser?.profilePic} alt="Could not be loaded" className='w-32 h-32 rounded-full mx-auto cursor-pointer' onClick={() => fileRef.current.click()} />
                    </span>
                    <Button gradientDuoTone="purpleToBlue" outline onClick={notify}>Notify</Button>

                    <TextInput type="name" id="name" label="username" placeholder='Username' defaultValue={currentUser?.username} />
                    <TextInput type="email" id="email" label="Email address" placeholder='Email address' defaultValue={currentUser?.email} />
                    <TextInput type="pssword" id="password" label="Password" placeholder='**********' />
                    <Button type="submit" gradientDuoTone="purpleToBlue" outline>Update</Button>
                </form>
                <div className='text-red-500 flex justify-between mt-3 '>
                    <span className='cursor-pointer hover:text-red-700 '>Delete Account</span>
                    <span className='cursor-pointer hover:text-red-700 ' onClick={handleSignOut}>Sign Out</span>
                </div>
            </div>
        </>
    )
}

export default DashProfile