import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'

const PlacesToVisit = ({ placesToVisit }) => {

    const openInGoogleMaps = (lat, lng, name) => {
        const query = encodeURIComponent(name);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${lat},${lng}`, '_blank');
    }

    const [photoUrls, setPhotoUrls] = useState({});

    useEffect(() => {
        if (!placesToVisit) return;

        const fetchImages = async () => {
            let urls = {};
            for (const day of placesToVisit) {
                for (const place of day.plan) {
                    const data = { textQuery: place.placeName };
                    try {
                        const resp = await GetPlaceDetails(data);
                        const photoName = resp?.data?.places?.[0]?.photos?.[0]?.name;
                        if (photoName) {
                            urls[place.placeName] = PHOTO_REF_URL.replace('{NAME}', photoName);
                        }
                    } catch (err) {
                        console.error(`Error fetching image for ${place.placeName}`, err);
                    }
                }
            }
            setPhotoUrls(urls);
        };

        fetchImages();
    }, [placesToVisit]);


    return (
        <div className="mt-8">
            <h2 className="font-bold text-2xl mb-6">Places to Visit</h2>

            {placesToVisit?.map((dayPlan, dayIndex) => (
                <div key={dayIndex} className="mb-10">
                    <h3 className="text-xl font-semibold mb-2">
                        Day {dayPlan.day}: {dayPlan.theme}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Best Time to Visit: <span className="font-medium">{dayPlan.bestTimeToVisit}</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dayPlan.plan.map((place, placeIndex) => (
                            <div
                                key={placeIndex}
                                onClick={() =>
                                    openInGoogleMaps(place.geoCoordinates.latitude, place.geoCoordinates.longitude, place.placeName)
                                }
                                className="cursor-pointer border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition hover:scale-[1.02]"
                            >
                                <img
                                    src={photoUrls[place.placeName] || '/placeholder.jpeg'}
                                    alt={place.placeName}
                                    className="h-48 w-full object-cover"
                                />

                                <div className="p-4">
                                    <h4 className="text-lg font-semibold">{place.placeName}</h4>
                                    <p className="text-sm text-gray-700 mt-1">{place.placeDetails}</p>
                                    <div className="mt-3 text-sm text-gray-600">
                                        <p>🎟️ <span className="font-medium">Ticket:</span> {place.ticketPricing}</p>
                                        <p>⭐ <span className="font-medium">Rating:</span> {place.rating}</p>
                                        <p>🕒 <span className="font-medium">Duration:</span> {place.suggestedDuration}</p>
                                        <p>🚗 <span className="font-medium">Travel:</span> {place.timeToTravel}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PlacesToVisit;
