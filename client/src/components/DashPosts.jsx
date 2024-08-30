import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'flowbite-react'
const DashPosts = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const res = await axios.get('/post/getallposts')
        setPosts(res.data)
    }
    useEffect(() => {
        getPosts()
    }, [])
    console.log('posts: ', posts)
    return (
        <>
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
                        return <>
                            <Table.Body key={post._id} className="divide-y h-10">
                                <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <img src={post.image} alt={post.title} />
                                    </Table.Cell>
                                    <Table.Cell>{post.title}</Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    <Table.Cell>
                                        <button>Delete</button>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </>
                    })
                }
            </Table>
        </>
    )
}

export default DashPosts