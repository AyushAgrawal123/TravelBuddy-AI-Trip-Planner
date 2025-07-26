import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({ trip }) => {
    const locationLabel = trip?.userSelection?.location?.label || "Unknown";
    const [photoUrl, setPhotoUrl] = useState()
    useEffect(() => {
        trip && getPlaceImage();
    }, [trip])

    const getPlaceImage = async () => {
        const data = {
            textQuery: trip?.userSelection?.location.label,
        };
        const result = await GetPlaceDetails(data).then(resp => {
            // console.log('gpImage', resp.data.places[0].photos[2].name);
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name);
            // console.log(photoUrl);
            setPhotoUrl(photoUrl);
        })
    }
    return (
        <Link to={`/view-trip/${trip?.id}`}>
            <div className="w-[400px] bg-white shadow-md rounded-xl overflow-hidden">
                <img
                    src={photoUrl || "/placeholder.jpeg"}
                    alt="Trip image"
                    className="h-[180px] w-full object-cover"
                />
                <div className="p-3">
                    <h2
                        className="text-lg font-semibold truncate"
                        title={locationLabel} // shows full label on hover
                    >
                        {locationLabel}
                    </h2>
                    <h2 className='text-sm text-gray-500'>{trip?.userSelection.noOfDays} Days trip with {trip?.userSelection.budget} Budget</h2>
                </div>
            </div>
        </Link>
    );
};

export default UserTripCardItem;
