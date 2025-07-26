import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'

const HotelCardItem = ({ hotel }) => {
    const openInGoogleMaps = (name, address) => {
        const encodedName = encodeURIComponent(name);
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedName}+${encodedAddress}`, '_blank');
    };


    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        hotel && getPlaceImage();
    }, [hotel]);

    const getPlaceImage = async () => {
        const data = {
            textQuery: hotel?.hotelName,
        };
        const result = await GetPlaceDetails(data).then(resp => {
            // console.log('gpImage', resp.data.places[0].photos[2].name);
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name);
            // console.log(photoUrl);
            setPhotoUrl(photoUrl);
        })
    }
    return (
        <div
            className="border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 bg-white hover:scale-[1.02] cursor-pointer"
            onClick={() => openInGoogleMaps(hotel.hotelName, hotel.hotelAddress)}
        >
            <img
                src={photoUrl || "/placeholder.jpeg"}
                // src='/placeholder.jpeg'
                alt={hotel.hotelName}
                className="h-48 w-full object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-semibold text-gray-800">{hotel.hotelName}</h3>
            <p className="text-sm text-gray-500">{hotel.hotelAddress}</p>
            <div className="text-sm mt-2 space-y-1">
                <p>💵 <span className="font-medium">Price:</span> {hotel.price}</p>
                <p>⭐ <span className="font-medium">Rating:</span> {hotel.rating}</p>
                {hotel.description && (
                    <p className="text-gray-600">{hotel.description}</p>
                )}
            </div>
        </div>
    )
}

export default HotelCardItem