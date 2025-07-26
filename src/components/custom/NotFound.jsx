// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Replace or remove if not using shared Button component

const NotFound = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-white px-4">
            <div className="max-w-xl text-center">
                <h1 className="text-[100px] font-extrabold leading-none text-gray-800 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p className="mb-6 text-gray-500 text-lg">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>
                <Link to="/">
                    <Button className="bg-black text-white hover:bg-gray-800 transition-all duration-300">
                        Go to Homepage
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
