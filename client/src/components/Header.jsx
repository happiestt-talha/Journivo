import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import logo from '../assets/icons/blog-50.png'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/theme/themeSlice';

export default function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch()
    const data = [
        {
            id: 1,
            name: 'Home',
            path: '/'
        },
        {
            id: 2,
            name: 'About',
            path: '/about'
        },
        {
            id: 3,
            name: 'Projects',
            path: '/projects'
        }
    ]
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useSelector((state) => state.theme)
    const handleTheme = () => {
        dispatch(toggleTheme())
    }
    const handleSignOut = () => {

    }
    return (
        <Navbar className='border-b-2'>
            <Link to="/" className="flex items-center">
                <img className='hidden md:inline' src={logo} alt="Journivo" />

                <span
                    className="self-center whitespace-nowrap text-xl font-semibold
                        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-1
                        text-white rounded-lg dark:text-white">
                    Journivo</span>

                <span
                    className='font-bold text-xl hidden md:inline'
                >'s Blog</span>
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>

            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>

            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10  sm:inline' color='gray' pill onClick={handleTheme}>
                    {theme === 'dark' ? <FaMoon /> : <FaSun />}
                </Button>
                {
                    currentUser
                        ? (
                            <Dropdown arrowIcon={false}
                                inline
                                label={<Avatar alt={currentUser.username + "'s avatar"} img={currentUser.profilePic} rounded />}
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">  @{currentUser.username} </span>
                                    <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                                </Dropdown.Header>
                                <Link to="/dashboard?tab=profile">
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                </Link>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                            </Dropdown>
                        )
                        : (<Link to='/sign-in'>
                            <Button gradientDuoTone='purpleToBlue'>Sign In</Button>
                        </Link>)
                }
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {
                    data.map((item) => (
                        <Navbar.Link
                            key={item.id}
                            active={path === item.path}
                            as={Link}
                            to={item.path}
                        >
                            {item.name}
                        </Navbar.Link>
                    ))
                }
            </Navbar.Collapse>
        </Navbar>
    );
}