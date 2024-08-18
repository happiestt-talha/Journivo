import { Carousel } from 'flowbite-react'
import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Home = () => {
    return (
        <>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-full">
                <Carousel leftControl={<FaArrowLeft size={24} />} rightControl={<FaArrowRight size={24} />} className='h-full w-full md:w-1/2  mx-auto'>
                    <img src="https://images.pexels.com/photos/20332246/pexels-photo-20332246/free-photo-of-red-balcony-casting-shadow-on-wall.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Could not be loaded" />
                    <img src="https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Could not be loaded" />
                    <img src="https://images.pexels.com/photos/20398838/pexels-photo-20398838/free-photo-of-handrail-shadow-on-white-and-red-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Could not be loaded" />
                    <img src="https://images.pexels.com/photos/5534545/pexels-photo-5534545.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Could not be loaded" />
                    <img src="https://images.pexels.com/photos/11378684/pexels-photo-11378684.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Could not be loaded" />
                </Carousel>
            </div>
        </>
    )
}

export default Home