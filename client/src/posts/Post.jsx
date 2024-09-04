import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "flowbite-react"
import Loader from "../components/Loader"
import CallToAction from "../components/CallToAction"
import CommentSection from "../components/CommentSection"
const Post = () => {
    const { slug } = useParams()
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const getData = async () => {
                setLoading(true)
                const res = await axios.get(`/post/getpost?slug=${slug}`)
                setPost(res.data.posts[0])
                console.log("Author: ", res.data.posts[0].userId)
                const authorRes = await axios.get(`/user/getuser/${res.data.posts[0].userId}`)
                console.log("Author: ", authorRes.data)
                setAuthor(authorRes.data)
                setLoading(false)
            }
            getData()
        } catch (error) {
            console.log("Error: ", error.response.data.message)
        }
    }, [slug])

    const getReadTime = (content) => {
        if (!content || typeof content !== "string") {
            return 0;
        }
        return content.trim().length / 1000;
    }

    return (
        <>
            {
                loading
                    ? <Loader />
                    : <>
                        <div className="p-4">
                            <div className="max-w-4xl mx-auto">
                                <h1 className="text-3xl font-serif my-6">{post?.title}</h1>
                                <span className="">By: {author?.username}</span>
                                <Link to={`/search?q=${post?.category}`}>
                                    <Button pill color="light" size="sm" className="mb-6 mx-auto text-teal-400">{post?.category}</Button>
                                </Link>

                                <img className="w-full max-h-[600px] object-cover" src={post?.image} alt={post?.title} />

                                <div className="flex justify-between my-6 text-gray-500 text-xs p-3 mx-auto max-w-2xl border-b border-slate-400 ">
                                    <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
                                    <span className="italic">{getReadTime(post?.content).toFixed(0)} min read</span>
                                </div>
                                <span className="max-w-4xl mx-auto post-content">
                                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                </span>
                            </div>
                            <div className='max-w-4xl mx-auto w-full'>
                                <CallToAction />
                            </div>
                            <CommentSection postId={post._id} />
                        </div>

                    </>
            }
        </>
    )
}

export default Post