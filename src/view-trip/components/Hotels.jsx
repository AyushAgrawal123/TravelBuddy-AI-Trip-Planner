import React from 'react';
import HotelCardItem from './HotelCardItem';

const Hotels = ({ hotels: hotelOptions }) => {
    return (
        <div>
            <h2 className="font-bold text-2xl mt-10 mb-4 text-gray-800">🏨 Hotel Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotelOptions.map((hotel, index) => (
                    <HotelCardItem hotel={hotel} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Hotels;
