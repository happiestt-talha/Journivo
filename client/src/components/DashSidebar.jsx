import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { HiUser, HiLogout, HiDocumentText } from 'react-icons/hi'
import { useSelector } from 'react-redux'

const DashSidebar = () => {
    const { currentUser } = useSelector((state) => state.user)
    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const tabByUrl = queryParams.get('tab')
        if (tabByUrl) {
            setTab(tabByUrl)
        }
    }, [location.search])
    return (
        <>
            <Sidebar>
                <Sidebar.Items>
                    <Sidebar.ItemGroup className="flex flex-col gap-1">
                        <Link to='/dashboard?tab=profile'>
                            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'user'} labelColor='dark' as={'div'}>Profile</Sidebar.Item>
                        </Link>
                        <Link to='/dashboard?tab=posts'>
                            <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as={'div'} >Posts</Sidebar.Item>
                        </Link>
                        <Sidebar.Item icon={HiLogout} >Logout</Sidebar.Item>

                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    )
}

export default DashSidebar