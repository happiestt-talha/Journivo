import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { HiUser, HiLogout, HiDocumentText, HiAnnotation, HiOutlineUserGroup, HiChartPie } from 'react-icons/hi'
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

                        {currentUser.isAdmin && <Link to='/dashboard?tab=dashboard'>
                            <Sidebar.Item active={tab === 'dashboard'} icon={HiChartPie} as={'div'}>Dashboard</Sidebar.Item>
                        </Link>}
                        <Link to='/dashboard?tab=profile'>
                            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'user'} labelColor='dark' as={'div'}>Profile</Sidebar.Item>
                        </Link>

                        {currentUser.isAdmin && <Link to='/dashboard?tab=posts'>
                            <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as={'div'} >Posts</Sidebar.Item>
                        </Link>}

                        {currentUser.isAdmin && <Link to='/dashboard?tab=users'>
                            <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as={'div'} >Users</Sidebar.Item>
                        </Link>}

                        {currentUser.isAdmin && <Link to='/dashboard?tab=comments'>
                            <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as={'div'} >Comments</Sidebar.Item>
                        </Link>}
                        <Sidebar.Item icon={HiLogout} >Logout</Sidebar.Item>

                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    )
}

export default DashSidebar