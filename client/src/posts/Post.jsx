import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from 'flowbite-react'
const Post = () => {
    const { slug } = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        try {
            const getPost = async () => {
                const res = await axios.get(`/post/getpost?slug=${slug}`)
                // console.log('res: ', res.data.posts[0])
                setPost(res.data.posts[0])
            }
            getPost()
        } catch (error) {
            console.log('Error: ', error.response.data.message)
        }
    }, [slug])

    const getReadTime = (content) => {
        if (!content || typeof content !== 'string') {
            return 0; 
        }
        return content.trim().length / 1000;
    }
    
    return (
        <>
            <div className='p-4'>
                <div className='max-w-4xl mx-auto'>
                    <h1 className='text-3xl font-serif my-6'>{post?.title}</h1>
                    <Link to={`/search?q=${post?.category}`}>
                        <Button pill color="light" size="sm" className='mb-6 mx-auto text-teal-400'>{post?.category}</Button>
                    </Link>

                    <img className='w-full max-h-[600px] object-cover' src={post?.image} alt={post?.title} />

                    <div className='flex justify-between my-6 text-gray-500 text-xs p-3 mx-auto max-w-2xl border-b border-slate-400 '>
                        <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
                        <span className='italic'>{getReadTime(post?.content).toFixed(0)} min read</span>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: post.content }} className='max-w-4xl mx-auto post-content'></div>
                </div>
            </div>
        </>
    )
}

export default Post