import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashComments from '../components/DashComments';
import DashUsers from '../components/DashUsers';
import DashBoardComp from '../components/DashBoardComp';

const Dashboard = () => {
    const [tab, setTab] = useState('');
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tabByUrl = queryParams.get('tab');

        if (tabByUrl) {
            setTab(tabByUrl);
        }
    }, [location.search]);


    return (
        <>
            <div className='flex flex-col md:flex-row min-h-screen'>
                <div className=''>
                    <DashSidebar />
                </div>
                    {tab === 'profile' && <DashProfile />}
                    {tab === 'posts' && <DashPosts />}
                    {tab === 'comments' && <DashComments />}
                    {tab === 'users' && <DashUsers />}
                    {tab === 'dashboard' && <DashBoardComp />}

            </div>
        </>
    );
};

export default Dashboard;
