import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Alert, Table } from 'flowbite-react'
import { FaCheck, FaTimes } from 'react-icons/fa'
const DashUsers = () => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)

    const getUsers = async () => {
        try {
            setError(null)
            const res = await axios.get('/user/getallusers')
            setUsers(res.data)
            console.log('users: ', res.data)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const deleteUser = async (id) => {
        try {
            setError(null)
            const res = await axios.delete(`/user/delete/${id}`)
            if (res.status === 200) {
                setUsers(users.filter((user) => user._id !== id))
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    return (
        <>
            <div className="table-auto overflow-x-auto md:mx-auto p-3">
                {error && <Alert color="failure">{error}</Alert>}
                {
                    users.length > 0 ? (
                        <Table hoverable={true}>
                            <Table.Head>
                                <Table.HeadCell>Date Joined</Table.HeadCell>
                                <Table.HeadCell>Profile image</Table.HeadCell>
                                <Table.HeadCell>Username</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Admin</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                            </Table.Head>

                            {
                                users.map((user) => {
                                    return <Table.Body key={user._id} className="divide-y">
                                        <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                                            <Table.Cell>
                                                <img className='w-10 h-10 rounded-full object-cover bg-gray-500' src={user.profilePic} alt={user.title} />
                                            </Table.Cell>
                                            <Table.Cell>{user.username}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>
                                                {
                                                    user.isAdmin ? <FaCheck className='text-emerald-500' /> : <FaTimes className='text-rose-500' />
                                                }
                                            </Table.Cell>
                                            <Table.Cell>
                                                <button className='text-rose-500 hover:text-red-600' onClick={() => deleteUser(user._id)}>Delete</button>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                })
                            }
                        </Table>
                    ) : <p className='text-center text-xl'>No users found</p>
                }
            </div>
        </>
    )
}

export default DashUsers