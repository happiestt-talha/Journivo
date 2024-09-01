import React from 'react'
import ClockLoader from 'react-spinners/ClockLoader'

const Loader = () => {
    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <ClockLoader
                    color="#2ab797"
                    size={168}
                    speedMultiplier={2}
                />
            </div>
        </>
    )
}

export default Loader