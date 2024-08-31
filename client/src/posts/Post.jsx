import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
    const { slug } = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        try {
            const getPost = async () => {
                const res = await axios.get(`/post/getpost?slug=${slug}`)
                console.log('res: ', res.data.posts[0])
                setPost(res.data.posts[0])
            }
            getPost()
        } catch (error) {
            console.log('Error: ', error.response.data.message)
        }
    }, [slug])
    return (
        <>
            <h1>{post?.title}</h1>
            <h3>Posted by: {post?.author}</h3>
            <h3>Category: {post?.category}</h3>

            <img src={post?.image} alt={post?.title} />
            <h3>Posted on: {new Date(post?.createdAt).toDateString()}</h3>

            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

        </>
    )
}

export default Post