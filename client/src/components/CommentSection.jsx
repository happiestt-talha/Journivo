import { Alert, Button, Textarea } from 'flowbite-react'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Comment from './Comment'
import { useSelector } from 'react-redux'

const CommentSection = ({ postId }) => {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)
    const { currentUser } = useSelector((state) => state.user)
    const getComments = useCallback(async () => {
        try {
            setError(null)
            console.log('Getting comments...')
            const res = await axios.get(`/comment/getcomments/${postId}`)
            console.log('comments: ', res.data)
            setComments(res.data)
        }
        catch (error) {
            setError(error.response.data.message)
        }
    }, [postId])
    useEffect(() => {
        getComments()
    }, [getComments])

    const handleComment = async (e) => {
        e.preventDefault()
        try {
            setError(null)
            console.log('Creating comment...')
            const res = await axios.post('/comment/create', {
                comment,
                postId,
                userId: currentUser._id
            })
            console.log('res: ', res.data)
            setComments([...comments, res.data])
            setComment('')
        }
        catch (error) {
            console.log(error)
            setError(error.response.data.message)
        }
    }

    return (
        <>
            <div className='max-w-2xl mx-auto'>
                <h1 className="text-3xl text-center font-bold mb-3">Comments</h1>
                <div className='p-3 rounded-tl-xl rounded-bl-none rounded-tr-none rounded-br-xl border-dashed border border-teal-400 rounded'>
                    <form>
                        {error && <Alert color="failure">{error}</Alert>}
                        <Textarea
                            id="comment"
                            placeholder="Leave a comment"
                            rows={4}
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </form>
                    <div className='flex justify-between items-center mt-3 px-3'>
                        <p className='text-gray-500'>200 characters left</p>
                        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none rounded-tr-none rounded-br-xl' onClick={handleComment}>Submit</Button>
                    </div>
                </div>
            </div>

            <div className='max-w-2xl mx-auto flex flex-col gap-3 my-3'>
                {
                    comments.map(comment => (
                        <Comment comment={comment} key={comment._id} comments={comments} setComments={setComments} />
                    ))
                }
            </div>
        </>
    )
}

export default CommentSection