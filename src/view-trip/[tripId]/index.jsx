import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/services/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const ViewTrip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null); // alltrip data with userselection
    const [parsedTripPlan, setParsedTripPlan] = useState(null); // parsed trip plan Ai generated

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const docSnap = await getDoc(doc(db, "AiTrips", tripId));
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // console.log('data', data);
                    setTrip(data);

                    // Parse tripData string
                    const rawString = data?.tripData;
                    if (rawString) {
                        const cleanedString = rawString
                            .replace(/^```json/, '')
                            .replace(/```$/, '')
                            .trim();

                        const parsed = JSON.parse(cleanedString);
                        // console.log('parsed', parsed);
                        setParsedTripPlan(parsed);
                    }
                }
            } catch (error) {
                console.error("Error fetching trip details:", error);
                toast.error("Failed to fetch trip details.", { position: 'top-right' });
            }
        };

        fetchTripDetails();
    }, [tripId]);

    const userSelection = trip?.userSelection;
    const hotelOptions = parsedTripPlan?.travelPlan?.hotelOptions || [];
    const placesToVisit = parsedTripPlan?.travelPlan?.itinerary;

    return (
        <div className='p-10 md:p-20 lg:p-44 xl:p-56'>
            {/* useSelection */}
            <InfoSection userSelection={userSelection} />
            {/* Hotel Recommendations */}
            <Hotels hotels={hotelOptions} />
            {/* daily plan */}
            <PlacesToVisit placesToVisit={placesToVisit} />
            <Footer />
        </div>
    );
};

export default ViewTrip;
