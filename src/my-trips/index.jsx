import { db } from '@/services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

const Mytrips = () => {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem("user") || "null");

        if (!user) {
            console.log('User not found');
            navigate('/');
            return;
        }

        const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user.email));
        const querySnapshot = await getDocs(q);

        setUserTrips([]);
        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push(doc.data());
        });

        setUserTrips(trips);
    };

    useEffect(() => {
        getUserTrips();
    }, []);

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl mb-6">My Trips</h2>

            {userTrips.length === 0 ? (
                <p className="text-gray-500">No trips found.</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-6">
                    {userTrips.map((trip, index) => (
                        <UserTripCardItem trip={trip} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Mytrips;
