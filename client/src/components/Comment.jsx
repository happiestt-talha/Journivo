import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaThumbsUp, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Comment = ({ comment, comments, setComments }) => {
    const { currentUser } = useSelector((state) => state.user)
    const [user, setUser] = useState({})
    const [liked, setLiked] = useState(comment.likes.includes(currentUser._id))
    const [totalLikes, setTotalLikes] = useState(comment.totalLikes) // Track totalLikes locally

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(`/user/getuser/${comment.userId}`)
            setUser(res.data)
        }
        getUser()
    }, [comment.userId])

    const handleLike = async () => {
        try {
            // Optimistically update the UI before the request
            setLiked(!liked)
            setTotalLikes(liked ? totalLikes - 1 : totalLikes + 1)

            console.log('Liking comment...')
            console.log('comment: ', comment._id)
            const res = await axios.put(`/comment/like/${comment._id}`)
            console.log(res.data)

            // Update based on the server response
            setLiked(res.data.liked)
            setTotalLikes(res.data.totalLikes)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCommentDelete = async () => {
        try {
            console.log('Deleting comment...')
            setComments(comments.filter((c) => c._id !== comment._id))
            const res = await axios.delete(`/comment/del-comment/${comment._id}/${currentUser._id}`)
            console.log(res.data)
            if (res.status === 200) {
                setComments(comments.filter((c) => c._id !== comment._id))
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex w-full items-center space-x-2 bg-slate-300 p-2 rounded dark:bg-gray-700">
                <img className="w-10 h-10 rounded-full bg-gray-600" src={user.profilePic} alt="" />
                <span className="flex w-full flex-col space-y-1 items-start">
                    <span>
                        <span className="flex items-center space-x-1 ">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">@{user.username}</p>
                            <p>{new Date(comment.createdAt).toDateString()}</p>
                        </span>
                        <p className="text-sm">{comment.comment}</p>
                    </span>
                    <div className="flex w-full space-x-2 items-center justify-between">
                        <span className="flex items-center space-x-1">
                            <span className='cursor-pointer' onClick={handleLike}>
                                {liked ? (
                                    <FaThumbsUp className="text-blue-500" />
                                ) : (
                                    <FaThumbsUp />
                                )}
                            </span>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {totalLikes} {totalLikes === 1 ? 'Like' : 'Likes'}
                            </span>
                        </span>
                        {currentUser._id === comment.userId && (
                            <span className='cursor-pointer text-red-500 hover:text-red-700' onClick={handleCommentDelete}>
                                <FaTrash />
                            </span>
                        )}
                    </div>
                </span>
            </div>
        </>
    )
}

export default Comment
