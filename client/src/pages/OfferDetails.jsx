import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Fail from '../components/Alerts/Fail'

export default function OfferDetails() {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [convertedDate, setConvertedDate] = useState("Date not available");

    useEffect(() => {
        const fetchOfferDetails = async () => {
            try {
                const response = await fetch(`/offers/${id}`);
                if (!response.ok) {
                    throw new Error('Offer not found');
                }
                const data = await response.json();
                setOffer(data[0]);

                const date = new Date(data[0].date);
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                };
                setConvertedDate(date.toLocaleString('en-US', options));
            } catch (err) {
                setFetchError(err.message);
            }
        };

        fetchOfferDetails();
    }, [id]);

    const handleLikeDislike = async (action) => {
        try {
            const response = await fetch(`/offers/${id}/likeDislike`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action }),
            });

            if (!response.ok) {
                throw new Error('Failed to update likes/dislikes');
            }

            setOffer(prevOffer => {
                if (action === 'like') {
                    return {
                        ...prevOffer,
                        likes: prevOffer.likes + 1,
                        dislikes: prevOffer.dislikes
                    };
                } else if (action === 'dislike') {
                    return {
                        ...prevOffer,
                        likes: prevOffer.likes,
                        dislikes: prevOffer.dislikes + 1
                    };
                }
                return prevOffer;
            });
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleParticipate = async () => {
        try {
            const uid = 1; // from storage
            const response = await fetch(`/participate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid, oid: offer.oid }),
            });

            if (!response.ok) {
                throw new Error('Failed to record participation');
            }

            alert("Participation recorded successfully!");
        } catch (err) {
            console.error('Error:', err);
            alert("There was an error recording your participation. Please try again.");
        }
    };

    if (fetchError) {
        return <Fail message={fetchError}/>;
    }

    if (!offer) {
        return <div className=" text-center mt-4">Loading...</div>;
    }

    return (
        <div className='flex flex-col h-screen justify-center'>
            <div className="max-w-4xl h-fit mx-auto bg-base-200 shadow-lg rounded-lg p-6">
                <div className="border-b pb-4 mb-4">
                    <h1 className="text-3xl font-semibold">{offer.title}</h1>
                    <p className="text-gray-500 mt-2">{offer.category} • {offer.city}, {offer.country}</p>
                    <p className="text-sm">{convertedDate}</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p className="text-justify mt-2">{offer.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-semibold">Details</h2>
                        <p className="mt-2"><span className="font-semibold">Budget:</span> ${offer.budget}</p>
                        <p className=""><span className="font-semibold">Frequency:</span> {offer.frequency}</p>
                        <p className=""><span className="font-semibold">Participants:</span> {offer.part}/{offer.partMax}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Skills Required</h2>
                        {offer.skillsReq === 0 ? "No" : "Yes"}
                    </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4 w-full">
                        <div className='btn bg-base-300' onClick={() => handleLikeDislike('like')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-primary h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" />
                            </svg>
                            <span className="ml-2">{offer.likes} Likes</span>
                        </div>

                        <div className='btn bg-base-300' onClick={() => handleLikeDislike('dislike')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M.5,12H5.28l6.11,7.06A2,2,0,0,1,12,20.49a2,2,0,0,0,2,2,2.74,2.74,0,0,0,2-.8,2.79,2.79,0,0,0,.8-1.95c0-2-2.87-5.86-2.87-5.86h6A2.61,2.61,0,0,0,22.5,11.3a2.94,2.94,0,0,0-.05-.51L20.89,3A1.91,1.91,0,0,0,19,1.48H11.25a9.13,9.13,0,0,0-4,1h0a9.08,9.08,0,0,1-4.06,1H.5" />
                            </svg>
                            <span className="ml-2">{offer.dislikes} Dislikes</span>
                        </div>

                        <div className="self justify-end">
                            <button className="btn btn-primary text-white" onClick={handleParticipate}>Participate</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};