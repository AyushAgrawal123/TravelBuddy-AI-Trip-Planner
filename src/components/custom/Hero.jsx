import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import Footer from '@/view-trip/components/Footer'

function Hero() {
    return (
        <div className='flex flex-col items-center px-5 sm:px-10 md:px-20 lg:px-40 xl:px-56 gap-9'>
            <h1 className='font-extrabold text-[40px] text-center mt-16'>
                <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at your Fingertips
            </h1>

            <p className='text-2xl text-gray-500 text-center'>
                Your personal Trip Planner and travel curator, creating custom Itineraries tailored to your interests and budget.
            </p>

            <Link to="/create-trip">
                <Button className='cursor-pointer p-6 text-lg'>Get Started. It's Free</Button>
            </Link>

            <img
                className="mt-2 w-full max-w-5xl h-auto"
                src="/landing.png"
                alt="landing page img"
            />

            <Footer />
        </div>
    )
}

export default Hero
