import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { toast } from 'sonner';

const InfoSection = ({ userSelection }) => {
    const [photoUrl, setPhotoUrl] = useState()
    useEffect(() => {
        userSelection && getPlaceImage();
    }, [userSelection])

    const getPlaceImage = async () => {
        const data = {
            textQuery: userSelection?.location.label,
        };
        const result = await GetPlaceDetails(data).then(resp => {
            // console.log('gpImage', resp.data.places[0].photos[2].name);
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name);
            // console.log(photoUrl);
            setPhotoUrl(photoUrl);
        })
    }
    const handleShare = async () => {
        const shareData = {
            title: `Trip to ${userSelection?.location.label}`,
            text: `Check out this AI-planned trip to ${userSelection?.location.label} for ${userSelection?.noOfDays} days!`,
            url: window.location.href, // or a dynamic trip link if available
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Trip shared successfully');
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                toast('Trip link copied to clipboard!', {
                    position: 'top-right'
                });

            } catch (err) {
                console.error('Failed to copy link:', err);
            }
        }
    };

    return (
        <div>
            <img className='h-[300px] w-full object-cover rounded-lg' src={photoUrl || '/placeholder.jpeg'} alt="" />
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{userSelection?.location.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md lg:text-xl'>📅 {userSelection?.noOfDays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md lg:text-xl'>💰 Budget : {userSelection?.budget}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md lg:text-xl'>🧑‍🤝‍🧑 Traveler : {userSelection?.traveler}</h2>
                    </div>

                </div>
                <Button onClick={handleShare} className="p-2 cursor-pointer">
                    <IoIosSend />
                </Button>

            </div>
        </div>
    )
}
export default InfoSection;