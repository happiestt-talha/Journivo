import { Button, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const CreatePost = () => {
    const optionData = [
        {
            id: 1,
            value: "general",
            name: "General"
        },
        {
            id: 2,
            value: "programming",
            name: "Programming"
        },
        {
            id: 3,
            value: "tech",
            name: "Tech"
        }
    ]
    return (
        <>
            <div className='p-3 max-w-3xl mx-auto min-h-screen'>
                <h1 className='text-center my-7 text-3xl font-semibold'>Create Post</h1>

                <form className='flex flex-col gap-4'>

                    <div className="flex flex-col gap-4 md:flex-row">
                        <TextInput className='flex-1' id="title" type="text" placeholder="Title" required={true} />
                        <Select id="category" required={true}>
                            <option>Select Category</option>
                            {optionData.map((option) => (
                                <option key={option.id} value={option.value}>{option.name}</option>
                            ))}
                        </Select>
                    </div>

                    <div className='flex gap-4 items-center justify-between border-dotted border-4 border-teal-400 p-3'>
                        <TextInput id='file' accept='image/*' type="file" required={true} />
                        <Button gradientDuoTone={"pinkToOrange"} size='sm' outline>Upload image</Button>
                    </div>

                    <ReactQuill className=' p-3 h-72 mb-12'
                        theme="snow"
                        required
                        placeholder='Write something...'
                    />

                    <Button type='submit' gradientDuoTone={"pinkToOrange"}>Publish</Button>
                </form>
            </div>
        </>
    )
}

export default CreatePost