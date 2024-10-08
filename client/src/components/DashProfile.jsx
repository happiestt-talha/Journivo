import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFailure, deleteStart, deleteSuccess, logout, updateFailure, updateStart, updateSuccess } from '../store/user/userSlice'
import { app } from '../firebase/Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'

const DashProfile = () => {
    const navigate = useNavigate()
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
        username: currentUser.username || '',
        email: currentUser.email || '',
        password: '',
        profilePic: currentUser.profilePic || ''
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

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
        console.log('formData: ', formData);
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
            return setUpdateProfileError('Please wait while image is uploading...');
        }

        // Filter out fields that are not modified
        const updatedData = Object.keys(formData).reduce((acc, key) => {
            if (formData[key] !== '' && formData[key] !== currentUser[key]) {
                acc[key] = formData[key];
            }
            return acc;
        }, {});

        if (Object.keys(updatedData).length === 0) {
            return setUpdateProfileError('No changes made');
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
                console.log('Error Data: ', res.data)
                setUpdateProfileError(res.data.message)
                setUpdateProfileSuccess('')
                dispatch(updateFailure(res.data.message))
            }
        } catch (error) {
            console.log('Fetch Error: ', error)
            setUpdateProfileError(error.response.data.message)
        }
    }

    const handleSignOut = async () => {
        const res = await axios.post('/user/logout')
        console.log('res: ', res)
        if (res.status === 200) {
            dispatch(logout())
        }
    }

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteStart())
            const res = await axios.delete(`/user/delete/${currentUser._id}`)
            console.log('res: ', res)
            if (res.status === 200) {
                dispatch(deleteSuccess())
            }
            else {
                dispatch(deleteFailure("Account Couldn't be deleted"))
            }

        } catch (error) {
            dispatch(deleteFailure(error.message))
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
                    <TextInput onChange={handleFormChange} type="name" id="username" label="username" placeholder='Username' defaultValue={currentUser?.username} />
                    <TextInput onChange={handleFormChange} type="email" id="email" label="Email address" placeholder='Email address' defaultValue={currentUser?.email} />
                    <TextInput onChange={handleFormChange} type="password" id="password" label="Password" placeholder='**********' />
                    {
                        currentUser.isAdmin && <Button gradientDuoTone="pinkToOrange"  onClick={() => navigate('/create-post')}>Create Post</Button>
                    }
                    <Button gradientDuoTone="purpleToBlue" outline onClick={handleEditProfile} >Update</Button>
                </form>
                <div className='text-red-500 flex justify-between mt-3 '>
                    <span className='cursor-pointer hover:text-red-700 ' onClick={handleDeleteAccount}>Delete Account</span>
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