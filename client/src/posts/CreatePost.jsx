import { Alert, Button, Select, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase/Firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        image: '',
        content: ''
    });

    const optionData = [
        { id: 1, value: "general", name: "General" },
        { id: 2, value: "programming", name: "Programming" },
        { id: 3, value: "tech", name: "Tech" },
        { id: 4, value: "cinema", name: "Cinema" },
        { id: 5, value: "food", name: "Food" },
        { id: 6, value: "sports", name: "Sports" },
        { id: 7, value: "beauty", name: "Beauty" }
    ];

    const handleFormOnChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleImageOnChange = (e) => {
        const img = e.target.files[0];
        setFile(img);
        setUploadError('');
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleImageUpload = (file) => {
        if (!file) {
            return setUploadError('Please select an image');
        }
        setUploadError('');

        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
        }, (error) => {
            setUploadError(error.message);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setFormData(prevData => ({
                    ...prevData,
                    image: downloadURL
                }));
            });
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.category || !formData.content) {
            return setUploadError('Please fill all the fields');
        }
        if (!formData.image) {
            return setUploadError('Please upload an image');
        }

        setUploading(true);
        setUploadError('');

        try {
            const res = await axios.post('/post/create', formData);
            if (res.status === 200) {
                navigate(`/posts/${res.data.slug}`);
            } else {
                setUploadError(res.data.message);
            }
        } catch (error) {
            setUploadError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center my-7 text-3xl font-semibold'>Create Post</h1>

            {uploadError && <Alert className='my-3 font-semibold text-center' color="failure">{uploadError}</Alert>}

            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 md:flex-row">
                    <TextInput className='flex-1' id="title" type="text" placeholder="Title" required={true} onChange={handleFormOnChange} />
                    <Select id="category" required={true} onChange={handleFormOnChange}>
                        <option>Select Category</option>
                        {optionData.map((option) => (
                            <option key={option.id} value={option.value}>{option.name}</option>
                        ))}
                    </Select>
                </div>

                <div className='flex gap-4 items-center justify-between border-dotted border-4 border-teal-400 p-3'>
                    <TextInput id='file' accept='image/*' type="file" required={true} onChange={handleImageOnChange} />
                    {progress > 0 && (
                        <CircularProgressbar
                            value={progress}
                            text={`${progress.toFixed(2)}%`}
                            className='w-16 h-16 ml-auto'
                        />
                    )}
                </div>

                {formData.image && <img src={formData.image} alt="uploaded pic" className='w-full h-60 object-cover' />}

                <ReactQuill
                    className='p-3 h-72 mb-12'
                    theme="snow"
                    required
                    placeholder='Write something...'
                    value={formData.content}
                    onChange={(value) => setFormData(prevData => ({ ...prevData, content: value }))}
                />

                <Button type='submit' gradientDuoTone={"pinkToOrange"}>
                    {uploading ? <Spinner aria-label="Publishing" size="md" /> : 'Publish'}
                </Button>
            </form>
        </div>
    );
};

export default CreatePost;
