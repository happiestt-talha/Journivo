import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logout, updateFailure, updateStart, updateSuccess } from '../store/user/userSlice'
import { app } from '../firebase/Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'

const DashProfile = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const fileRef = useRef()

    const [img, setImg] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [uploadError, setUploadError] = useState('')
    const [updateProfileError, setUpdateProfileError] = useState('')
    const [updateProfileSuccess, setUpdateProfileSuccess] = useState('')
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        profilePic: ''
    })

    const handleImageOnChange = (e) => {
        const file = e.target.files[0]
        console.log('file: ', file)
        console.log('file type: ', file.type.includes('image/'))
        if (!file.type.includes('image/')) {
            return setUploadError('Only images are allowed!')
        }
        if (file) {
            setImg(file)
            setImgUrl(URL.createObjectURL(file))
        }
    }

    const handleImageUpload = useCallback((() => {
        setUploading(true)
        setProgress(0)
        setUploadError('')
        const storage = getStorage(app)
        const fileName = new Date().getTime() + img.name
        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, img)

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress.toFixed(0))
            },
            (error) => {
                setUploadError('Failed to upload image')
                setProgress(0)
                setUploading(false)
                setImg(null)
                setImgUrl(null)
                console.error(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                    setFormData(data => ({ ...data, profilePic: downloadURL }))
                    setUploading(false)
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

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        console.log('formData: ', formData)
    }

    const handleEditProfile = async (e) => {
        console.log('Updating profile...')
        console.log('formData UP: ', formData)
        console.log('currentUser: ', currentUser)
        e.preventDefault()
        if (Object.keys(formData).length === 0) {
            return setUpdateProfileError('No Changes made')
        }
        if (uploading) {
            return setUpdateProfileError('Please wait while image is uploading...')
        }
        setUpdateProfileSuccess(null)
        setUpdateProfileError(null)
        try {
            dispatch(updateStart())
            const res = await axios.put(`/user/update/${currentUser._id}`, formData)
            // const res = await axios.get("http://localhost:5000/api/user/test")
            console.log('Update res: ', res)
            if (res.status === 200) {
                setUpdateProfileSuccess('Profile updated successfully')
                dispatch(updateSuccess(res.data))
                setUpdateProfileError('')
            } else {
                setUpdateProfileError(res.data)
                setUpdateProfileSuccess('')
                dispatch(updateFailure(res.data))
            }
        } catch (error) {
            setUpdateProfileError(error.message)
        }
    }
    return (
        <>
            <div className='max-w-lg mx-auto p-3 w-full'>
                <h1 className="my-7 font-semibold text-center text-3xl">Profile</h1>

                <form className="flex flex-col gap-4" >
                    <TextInput type='file' accept='image/*' onChange={handleImageOnChange} ref={fileRef} className='hidden' />
                    <span className='bg-gray-400 rounded-full w-36 h-36 flex items-center mx-auto relative'>

                        <img src={imgUrl || currentUser?.profilePic} alt="Could not be loaded" className={` w-32 h-32 rounded-full mx-auto cursor-pointer ${progress && progress < 100 && "opacity-65"}`} onClick={() => fileRef.current.click()} />
                        {uploading && <CircularProgressbar
                            value={progress || 0}
                            text={`${progress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${progress / 100
                                        })`,
                                },
                            }}
                        />}

                    </span>
                    {uploadError && <Alert color="failure">{uploadError}</Alert>}
                    <TextInput onChange={handleFormChange} type="name" id="name" label="username" placeholder='Username' defaultValue={currentUser?.username} />
                    <TextInput onChange={handleFormChange} type="email" id="email" label="Email address" placeholder='Email address' defaultValue={currentUser?.email} />
                    <TextInput onChange={handleFormChange} type="pssword" id="password" label="Password" placeholder='**********' />
                    <Button gradientDuoTone="purpleToBlue" outline onClick={handleEditProfile} >Update</Button>
                </form>
                <div className='text-red-500 flex justify-between mt-3 '>
                    <span className='cursor-pointer hover:text-red-700 '>Delete Account</span>
                    <span className='cursor-pointer hover:text-red-700 ' onClick={handleSignOut}>Sign Out</span>
                </div>

                <div className='mt-3'>
                    {
                        updateProfileError && <Alert color="failure">{updateProfileError}</Alert>
                    }
                    {
                        updateProfileSuccess && <Alert color="success">{updateProfileSuccess}</Alert>
                    }
                </div>
            </div>
        </>
    )
}

export default DashProfile