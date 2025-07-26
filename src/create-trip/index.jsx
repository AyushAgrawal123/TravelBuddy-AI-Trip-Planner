import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectedTravelList } from '@/constants/options'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner'
import { IoIosCloseCircle } from "react-icons/io";
import main from '@/services/AIModal'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebaseConfig'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'

function CreateTrip() {
    const [place, setPlace] = useState(null)
    const [formData, setFormData] = useState([]);
    const [tripPlan, setTripPlan] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const login = useGoogleLogin({
        onSuccess: (codeResp) => {
            // console.log("login respomse ", codeResp);
            getUserProfile(codeResp);
        },
        onError: (error) => console.error('Login Failed:', error),
    });

    const handleCreateTrip = async () => {

        if (!formData?.location || !formData?.traveler || !formData?.noOfDays || !formData?.budget) {
            toast("please fill in all fields", {
                position: 'top-right'
            });
            return;
        }
        if ((+formData?.noOfDays > 10) || (+formData?.noOfDays < 1)) {
            toast("Please enter a valid number of days (1-10)", {
                position: 'top-right'
            });
            return;
        }
        // console.log('trip details', formData);

        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
            return;
        }

        const AiPrompt = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replaceAll('{days}', formData?.noOfDays)
            .replace('{people}', formData?.traveler)
            .replace('{budget}', formData?.budget);

        // console.log('AI Prompt:', AiPrompt);

        try {
            setLoading(true);
            const trip = await main(AiPrompt);
            // console.log('AI Response:', trip);
            setTripPlan(trip); // store in state
            toast("Trip plan generated!", { position: 'top-right' });
            setLoading(false);
            await saveAiTripToDB(trip); // Save trip to database
        } catch (error) {
            console.error('AI generation failed:', error);
            toast("Something went wrong while generating trip plan.", { position: 'top-right' });
        }
        finally {
            setLoading(false);
        }
    };

    const saveAiTripToDB = async (tripData) => {
        if (!tripData) {
            toast("No trip data to save", { position: 'top-right' });
            return;
        }

        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('user'));
            const docId = Date.now().toString(); // Unique ID for the trip document
            const docRef = doc(db, "AiTrips", docId); // Reference to a document with ID "docId" in "AiTrips" collection
            await setDoc(docRef, {
                userSelection: formData,
                tripData: tripData,
                userEmail: user?.email || 'guest',
                id: docId,
            });
            console.log('Trip saved to database successfully');
            navigate(`/view-trip/${docId}`);
        }
        catch (err) {
            console.error('Error saving trip to database:', err);
            toast("Failed to save trip. Please try again.", { position: 'top-right' });
        }
        finally {
            setLoading(false);
        }

    }

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
            handleCreateTrip(); // Call create trip after successful login
        }).catch(err => {
            console.error('Error fetching user profile:', err);
            toast("Failed to fetch user profile. Please try again.", { position: 'top-right' });
        });
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
            <p className="mt-3 text-gray-500 text-xl">
                Just provide some basic details about your trip and we'll help you plan your adventure.
            </p>

            <div className="mt-20 flex flex-col gap-10">
                {/* Destination */}
                <div>
                    <h2 className="text-3xl my-3 font-medium">What is your destination of choice?✈️</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            value: place,
                            onChange: (value) => {
                                setPlace(value);
                                handleInputChange('location', value);
                            },
                            placeholder: 'Search for a place...',
                        }}
                    />
                </div>

                {/* Days */}
                <div>
                    <h2 className="text-3xl my-3 font-medium">How many days are you planning for your trip?</h2>
                    <Input
                        type="number"
                        placeholder="Ex. 3"
                        min={1}
                        max={30}
                        value={formData?.['noOfDays']}
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>

                {/* Budget */}
                <div>
                    <h2 className="text-3xl my-3 font-medium">What is your budget?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg transition
                  ${formData?.budget === item.title ? 'border-blue-500 shadow-lg' : ''}`}
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-2xl mt-2">{item.title}</h2>
                                <p className="text-md text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Travel type */}
                <div>
                    <h2 className="text-3xl my-3 font-medium">Who do you plan on traveling with?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                        {SelectedTravelList.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleInputChange('traveler', item.people)}

                                className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg transition
                  ${formData?.traveler === item.people ? 'border-blue-500 shadow-lg' : ''}`}
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-2xl mt-2">{item.title}</h2>
                                <p className="text-md text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Create Trip Button */}
            <div className="my-10 flex justify-end">
                <Button
                    className='cursor-pointer'
                    disabled={loading}
                    onClick={handleCreateTrip}>
                    {loading ?
                        <AiOutlineLoading3Quarters className='w-6 h-6 animate-spin' /> : "Create Trip"}
                </Button>
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

                    <img src="logo.svg" alt="Logo" className="h-10 w-auto mb-6 mx-auto" />

                    <h2 className="font-bold text-2xl text-center mb-2">Sign in to Google</h2>
                    <p className="text-gray-600 text-center mb-6">
                        Sign in to the app with Google authentication securely
                    </p>

                    <Button onClick={login} className="w-full mt-2 cursor-pointer">Sign In with Google</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateTrip;


