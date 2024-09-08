import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { cateogries } from '../constants/Categories';
import axios from 'axios';
export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });

    const optionData = cateogries

    console.log(sidebarData);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData(prevData => ({
                ...prevData,
                searchTerm: searchTermFromUrl || '',
                sort: sortFromUrl || 'desc',
                category: categoryFromUrl || 'uncategorized'
            }));
        }

        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            console.log('Search query: ', searchQuery);
            try {

                const res = await axios.get(`/post/getpost?${searchQuery}`);
                console.log('Search response: ', res)
                if (!res.status === 200) {
                    setLoading(false);
                    return;
                }
                if (res.status === 200) {
                    setPosts(res.data.posts);
                    setLoading(false);
                    if (res.data.posts.length === 9) {
                        setShowMore(true);
                    } else {
                        setShowMore(false);
                    }
                }

            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, [location.search]);

    console.log('Posts: ', posts);
    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData(prevData => ({
                ...prevData,
                searchTerm: e.target.value
            }));
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSidebarData(prevData => ({
                ...prevData,
                sort: order
            }));
        }
        if (e.target.id === 'category') {
            const category = e.target.value || 'uncategorized';
            setSidebarData(prevData => ({
                ...prevData,
                category
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        try {


            const res = await axios.get(`/api/post/getpost?${searchQuery}`);
            console.log('Search response: ', res)
            if (!res.status === 200) {
                return;
            }
            if (res.status === 200) {
                setPosts([...posts, ...res.data.posts]);
                if (res.data.posts.length === 9) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex   items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>
                            Search Term:
                        </label>
                        <TextInput
                            placeholder='Search...'
                            id='searchTerm'
                            type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Category:</label>
                        <Select
                            onChange={handleChange}
                            value={sidebarData.category}
                            id='category'
                            className='w-full'
                        >
                            {
                                optionData.map((option) => (
                                    <option key={option.id} value={option.value}>
                                        {option.name}
                                    </option>
                                ))
                            }
                        </Select>
                    </div>
                    <Button type='submit' outline gradientDuoTone='purpleToPink'>
                        Apply Filters
                    </Button>
                </form>
            </div>
            <div className='w-full'>
                <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
                    Posts results:
                </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && posts.length === 0 && (
                        <p className='text-xl text-gray-500'>No posts found.</p>
                    )}
                    {loading && <p className='text-xl text-gray-500'>Loading...</p>}
                    {!loading &&
                        posts &&
                        posts.map((post) => <PostCard key={post._id} post={post} />)}
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className='text-teal-500 text-lg hover:underline p-7 w-full'
                        >
                            Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}