import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const DashPosts = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const res = await axios.get('/post/getallposts')
        setPosts(res.data)
    }
    useEffect(() => {
        getPosts()
    }, [])

    const deletePost = async (id) => {
        console.log('id: ', id)
        const res = await axios.delete(`/post/del-post/${id}/${currentUser._id}`)
        if (res.status === 200) {
            setPosts(posts.filter((post) => post._id !== id))
        }
    }
    return (
        <>
            <div className="table-auto overflow-x-auto md:mx-auto p-3">
                {
                    posts.length > 0 ? (
                        <Table hoverable={true}>
                            <Table.Head>
                                <Table.HeadCell>Date Updated</Table.HeadCell>
                                <Table.HeadCell>Post image</Table.HeadCell>
                                <Table.HeadCell>Post title</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                                <Table.HeadCell><span>Edit</span></Table.HeadCell>
                            </Table.Head>

                            {
                                posts.map((post) => {
                                    return <Table.Body key={post._id} className="divide-y">
                                        <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                            <Table.Cell>
                                                <Link to={`/post-detail/${post.slug}`}>
                                                    <img className='w-20 h-10 object-cover bg-gray-500' src={post.image} alt={post.title} />
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell>{post.title.length > 20 ? post.title.substring(0, 20) + '...' : post.title}</Table.Cell>
                                            <Table.Cell>{post.category}</Table.Cell>
                                            <Table.Cell>
                                                <button className='text-rose-500 hover:text-red-600' onClick={() => deletePost(post._id)}>Delete</button>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Link to={`/edit-post/${post._id}`} className='text-teal-400 hover:text-green-400'>Edit</Link>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                })
                            }
                        </Table>
                    ) : <p className='text-center text-xl'>No posts found</p>
                }
            </div>
        </>
    )
}

export default DashPosts