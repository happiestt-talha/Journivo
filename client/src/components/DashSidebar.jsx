import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { HiUser, HiLogout } from 'react-icons/hi'

const DashSidebar = () => {
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
                    <Sidebar.ItemGroup>
                        <Link to='/dashboard?tab=profile'>
                            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'user'} labelColor='dark' as={'div'} >Profile</Sidebar.Item>
                        </Link>
                            <Sidebar.Item  icon={HiLogout} >Logout</Sidebar.Item>

                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    )
}

export default DashSidebar