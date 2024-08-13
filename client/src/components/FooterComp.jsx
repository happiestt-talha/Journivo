import React from 'react'
import { Footer } from 'flowbite-react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from 'react-router-dom';
import logo from '../assets/icons/blog-50.png'

const FooterComp = () => {
    return (
        <>
            <Footer container className='border border-t-8 border-teal-500'>
                <div className="w-full max-w-7xl mx-auto">
                    <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                        <div className="mt-5">
                            <Link to="/" className="flex items-center">
                                <img className='hidden md:inline' src={logo} alt="Journivo" />

                                <span
                                    className="self-center whitespace-nowrap text-xl font-semibold
                        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-1
                        text-white rounded-lg dark:text-white">
                                    Journivo</span>

                                <span
                                    className='font-bold text-xl'
                                >'s Blog</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-3">

                            <div>
                                <Footer.Title title='About' />
                                <Footer.LinkGroup col>
                                    <Footer.Link as={Link} to='/about'>About</Footer.Link>
                                    <Footer.Link as={Link} to='/'>Blog</Footer.Link>
                                    <Footer.Link as={Link} to='https://jobee.pk' target="_blank" rel="noopener noreferrer">Careers</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title='Social' />
                                <Footer.LinkGroup col>
                                    <Footer.Link as={Link} target="_blank" rel="noopener noreferrer" to='https://github.com/happiestt-talha'>Github</Footer.Link>
                                    <Footer.Link as={Link} target="_blank" rel="noopener noreferrer" to='https://twitter.com/mtalha215'>Twitter</Footer.Link>
                                    <Footer.Link as={Link} target="_blank" rel="noopener noreferrer" to='https://dribbble.com'>Dribbble</Footer.Link>
                                    <Footer.Link as={Link} target="_blank" rel="noopener noreferrer" to='https://instagram.com/happiest_talha'>Instagram</Footer.Link>
                                </Footer.LinkGroup>
                            </div>

                            <div>
                                <Footer.Title title='Legal' />
                                <Footer.LinkGroup col>
                                    <Footer.Link as={Link} to='#'>Privacy Policy</Footer.Link>
                                    <Footer.Link as={Link} to='#'>Terms & Conditions</Footer.Link>
                                </Footer.LinkGroup>
                            </div>

                        </div>
                    </div>
                    <Footer.Divider />
                    <div className='w-full sm:flex sm:items-center sm:justify-between' >
                        <Footer.Copyright href="#" by="Journivo" year={new Date().getFullYear()} />
                        <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                            <Footer.Icon href='https://twitter.com/mtalha215' icon={BsTwitter} />
                            <Footer.Icon href='https://instagram.com/happiestt_talha' icon={BsInstagram} />
                            <Footer.Icon href='https://facebook.com/happiest_talha' icon={BsFacebook} />
                            <Footer.Icon href='https://dribbble.com' icon={BsDribbble} />
                            <Footer.Icon href='https://github.com/happiestt-talha' icon={BsGithub} />
                        </div>
                    </div>
                </div>
            </Footer>
        </>
    )
}

export default FooterComp