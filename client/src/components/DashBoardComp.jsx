import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { Button, Table, Spinner } from 'flowbite-react'
import { Link } from 'react-router-dom'

const DashBoardComp = () => {
    const { currentUser } = useSelector((state) => state.user)

    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [totalUser, setTotalUser] = useState(0)
    const [totalPost, setTotalPost] = useState(0)
    const [totalComment, setTotalComment] = useState(0)
    const [lastMonthUser, setLastMonthUser] = useState(0)
    const [lastMonthPost, setLastMonthPost] = useState(0)
    const [lastMonthComment, setLastMonthComment] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [userRes, postRes, commentRes] = await Promise.all([
                    axios.get('/user/getallusers?limit=5'),
                    axios.get('/post/getpost?limit=5'),
                    axios.get('/comment/getallcomments?limit=5')
                ])
                setUser(userRes.data.users)
                setTotalUser(userRes.data.totalUsers)
                setLastMonthUser(userRes.data.lastMonthUsers)

                setPosts(postRes.data.posts)
                setTotalPost(postRes.data.totalPosts)
                setLastMonthPost(postRes.data.lastMonthPosts)

                setComments(commentRes.data.comments)
                setTotalComment(commentRes.data.totalComments)
                setLastMonthComment(commentRes.data.lastMonthComments)

                console.log('User: ', userRes.data)
                console.log('Post: ', postRes.data)
                console.log('Comment: ', commentRes.data)
            } catch (err) {
                setError('Failed to fetch data. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        if (currentUser.isAdmin) {
            fetchData()
        }
    }, [currentUser])

    if (loading) return (
        <>
            <span className='flex justify-center items-center h-screen w-full'>
                <Spinner
                    aria-label="Extra large spinner example"
                    size="xl"
                />
            </span>
        </>
    )
    if (error) return <div>{error}</div>

    return (
        <>
            <div className='p-3 md:mx-auto'>
                <div className='flex-wrap flex gap-4 justify-center'>
                    <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                        <div className='flex justify-between'>
                            <div className=''>
                                <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                                <p className='text-2xl'>{totalUser}</p>
                            </div>
                            <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                        </div>
                        <div className='flex  gap-2 text-sm'>
                            <span className='text-green-500 flex items-center'>
                                <HiArrowNarrowUp />
                                {lastMonthUser}
                            </span>
                            <div className='text-gray-500'>Last month</div>
                        </div>
                    </div>
                    <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                        <div className='flex justify-between'>
                            <div className=''>
                                <h3 className='text-gray-500 text-md uppercase'>
                                    Total Comments
                                </h3>
                                <p className='text-2xl'>{totalComment}</p>
                            </div>
                            <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                        </div>
                        <div className='flex  gap-2 text-sm'>
                            <span className='text-green-500 flex items-center'>
                                <HiArrowNarrowUp />
                                {lastMonthComment}
                            </span>
                            <div className='text-gray-500'>Last month</div>
                        </div>
                    </div>
                    <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                        <div className='flex justify-between'>
                            <div className=''>
                                <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                                <p className='text-2xl'>{totalPost}</p>
                            </div>
                            <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                        </div>
                        <div className='flex  gap-2 text-sm'>
                            <span className='text-green-500 flex items-center'>
                                <HiArrowNarrowUp />
                                {lastMonthPost.length}
                            </span>
                            <div className='text-gray-500'>Last month</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
                    <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                        <div className='flex justify-between  p-3 text-sm font-semibold'>
                            <h1 className='text-center p-2'>Recent users</h1>
                            <Button outline gradientDuoTone='purpleToPink'>
                                <Link to={'/dashboard?tab=users'}>See all</Link>
                            </Button>
                        </div>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>User image</Table.HeadCell>
                                <Table.HeadCell>Username</Table.HeadCell>
                            </Table.Head>
                            {user &&
                                user.map((user) => (
                                    <Table.Body key={user._id} className='divide-y'>
                                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                            <Table.Cell>
                                                <img
                                                    src={user.profilePic}
                                                    alt='user'
                                                    className='w-10 h-10 rounded-full bg-gray-500'
                                                />
                                            </Table.Cell>
                                            <Table.Cell>{user.username}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))}
                        </Table>
                    </div>
                    <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                        <div className='flex justify-between  p-3 text-sm font-semibold'>
                            <h1 className='text-center p-2'>Recent comments</h1>
                            <Button outline gradientDuoTone='purpleToPink'>
                                <Link to={'/dashboard?tab=comments'}>See all</Link>
                            </Button>
                        </div>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>Comment content</Table.HeadCell>
                                <Table.HeadCell>Likes</Table.HeadCell>
                            </Table.Head>
                            {comments &&
                                comments.map((comment) => (
                                    <Table.Body key={comment._id} className='divide-y'>
                                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                            <Table.Cell className='w-96'>
                                                <p className='line-clamp-2'>{comment.comment.length > 20 ? comment.comment.substring(0, 20) + '...' : comment.comment}</p>
                                            </Table.Cell>
                                            <Table.Cell>{comment.likes.length}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))}
                        </Table>
                    </div>
                    <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                        <div className='flex justify-between  p-3 text-sm font-semibold'>
                            <h1 className='text-center p-2'>Recent posts</h1>
                            <Button outline gradientDuoTone='purpleToPink'>
                                <Link to={'/dashboard?tab=posts'}>See all</Link>
                            </Button>
                        </div>
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>Post image</Table.HeadCell>
                                <Table.HeadCell>Post Title</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                            </Table.Head>
                            {posts &&
                                posts.map((post) => (
                                    <Table.Body key={post._id} className='divide-y'>
                                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                            <Table.Cell>
                                                <img
                                                    src={post.image}
                                                    alt='user'
                                                    className='w-14 h-10 rounded-md bg-gray-500'
                                                />
                                            </Table.Cell>
                                            <Table.Cell className='w-96'>{post.title}</Table.Cell>
                                            <Table.Cell className='w-5'>{post.category}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))}
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoardComp
