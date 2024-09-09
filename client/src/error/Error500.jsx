import React from 'react'

const Error500 = () => {
    return (
        <>
            <div className="text-gray-600 w-full h-screen flex justify-center items-center bg-teal-400">
                <div>
                    <h1 className="text-9xl font-bold text-center flex justify-center items-center gap-3">5
                        <div className="relative">
                            <span className="text-red-500 ">0</span>
                            <span className="text-opacity-60 text-yellow-600 absolute left-0">X</span>
                        </div>

                        <div className="relative">
                            <span className="text-blue-500 e">0</span>
                            <span className="text-opacity-60 text-yellow-500 absolute left-0">X</span>
                        </div>

                    </h1>
                    <p className="text-6xl text-center">It's not you, it's us.😔</p>
                </div>
            </div>
        </>
    )
}

export default Error500