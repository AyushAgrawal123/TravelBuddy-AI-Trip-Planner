import React, { useEffect, useState, useRef } from 'react'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from 'sonner';


function Header() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const [showPopover, setShowPopover] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const popoverRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setShowPopover(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo.access_token}`,
                Accept: 'application/json',
            }
        }).then(resp => {
            // console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            window.location.reload();
        }).catch(err => {
            console.error('Error fetching user profile:', err);
            toast("Failed to fetch user profile. Please try again.", { position: 'top-right' });
        });
    }

    const login = useGoogleLogin({
        onSuccess: (codeResp) => {
            // console.log("login respomse ", codeResp);
            getUserProfile(codeResp);
        },
        onError: (error) => console.error('Login Failed:', error),
    });

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload(); // or navigate to login page
    };

    return (
        <div className='p-4 shadow-sm flex justify-between items-center px-5'>
            <a href='/'>
                <img
                    src="/logo.svg"
                    className="h-8 cursor-pointer"
                    alt="main logo"
                />
            </a>
            <div className="flex items-center gap-4 relative">
                {user ? (
                    <>
                        <a href='/create-trip'><Button className='cursor-pointer' variant="outline">+ Create Trip</Button></a>
                        <a href='/my-trips'><Button className='cursor-pointer' variant="outline">My Trips</Button></a>
                        <img
                            src={user?.picture}
                            alt="User"
                            className="h-10 w-10 rounded-full cursor-pointer"
                            onClick={() => setShowPopover((prev) => !prev)}
                        />
                        {showPopover && (
                            <div
                                ref={popoverRef}
                                className="absolute top-14 right-0 bg-white shadow-lg rounded-md p-3 w-40 z-50 border"
                            >
                                <p className="text-sm mb-2 text-gray-700">{user.name}</p>
                                <Button
                                    variant="destructive"
                                    className="w-full text-sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <Button
                        onClick={() => setOpenDialog(true)}
                        className='cursor-pointer'>Sign In</Button>
                )}
            </div>
            {/* dialog box for login */}
            <div
                className={`fixed inset-0 z-50 ${openDialog ? "flex justify-center items-center" : "hidden"} bg-black/50`}
            >
                <div className="relative bg-white rounded-xl p-8 max-w-lg w-full shadow-xl">
                    {/* Close icon */}
                    <button
                        onClick={() => setOpenDialog(false)}
                        className="absolute top-4 right-4 font-bold text-gray-500 hover:text-gray-700 cursor-pointer"
                        aria-label="Close"
                    >
                        <IoIosCloseCircle size={28} />
                    </button>

                    <img src="/logo.svg" alt="Logo" className="h-10 w-auto mb-6 mx-auto" />

                    <h2 className="font-bold text-2xl text-center mb-2">Sign in to Google</h2>
                    <p className="text-gray-600 text-center mb-6">
                        Sign in to the app with Google authentication securely
                    </p>

                    <Button onClick={login} className="w-full mt-2 cursor-pointer">Sign In with Google</Button>
                </div>
            </div>
        </div>
    );
}

export default Header;
