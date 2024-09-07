import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Alert, Table } from 'flowbite-react'
import { useSelector } from 'react-redux'

const DashComments = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [comments, setComments] = useState([])
    const [usernames, setUsernames] = useState({})
    const [error, setError] = useState(null)

    const getComments = async () => {
        try {
            setError(null)
            const res = await axios.get('/comment/getallcomments?limit=1000')
            setComments(res.data.comments)
            const userIds = [...new Set(res.data.comments.map(comment => comment.userId))]
            const usersRes = await Promise.all(userIds.map(id => axios.get(`/user/getuser/${id}`)))
            const usernamesMap = usersRes.reduce((acc, curr) => {
                acc[curr.data._id] = curr.data.username
                return acc
            }, {})
            setUsernames(usernamesMap)
        } catch (error) {
            setError(error.response.data.message)
            console.error('Error fetching comments or users:', error)
        }
    }

    useEffect(() => {
        getComments()
    }, [])

    const deleteComment = async (id) => {
        try {
            setError(null)
            const res = await axios.delete(`/comment/del-comment/${id}/${currentUser._id}`)
            if (res.status === 200) {
                setComments(comments.filter((comment) => comment._id !== id))
            }
        } catch (error) {
            setError(error.response.data.message)
            console.error('Error deleting comment:', error)
        }
    }

    return (
        <div className="table-auto overflow-x-auto md:mx-auto p-3">
            {error && <Alert color="failure">{error}</Alert>}
            {
                comments.length > 0 ? (
                    <Table hoverable={true}>
                        <Table.Head>
                            <Table.HeadCell>Date Updated</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Comment</Table.HeadCell>
                            <Table.HeadCell>Post Id</Table.HeadCell>
                            <Table.HeadCell>User Id</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                comments.map((comment) => (
                                    <Table.Row key={comment._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>{usernames[comment.userId]}</Table.Cell>
                                        <Table.Cell className='truncate'>{comment.comment.substring(0, 50) + "..."}</Table.Cell>
                                        <Table.Cell>{comment.postId}</Table.Cell>
                                        <Table.Cell>{comment.userId}</Table.Cell>
                                        <Table.Cell>
                                            <button
                                                className='text-rose-500 hover:text-red-600'
                                                onClick={() => deleteComment(comment._id)}
                                            >
                                                Delete
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                ) : <p className='text-center text-xl'>No comments found</p>
            }
        </div>
    )
}

export default DashComments
