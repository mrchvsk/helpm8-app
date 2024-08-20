import React, { useState, useEffect } from 'react';
import LoginForm from '../LoginForm';

export default function HowWorks() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-4 bg-base-100 max-w-screen-xl m-auto">
            {/* Left side */}
            <div className="flex flex-col w-2/3 bg-base-200 rounded-xl p-4 lg:p-6 shadow">
                <p className="text-secondary font-semibold text-center lg:text-left">Get Started</p>
                <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-6 text-center lg:text-left">How does the platform work?</h2>

                <div className="flex flex-col lg:flex-row bg-base-300 rounded-xl flex-1">
                    <section className="flex-1 p-4 text-justify text-lg">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-4">Explore Offers for Free</h2>
                        <ol className="list-decimal list-inside space-y-4 text-sm">
                            <li>
                                <span className="font-bold">Browse Offers:</span> Explore the various help offers listed by others. Use filters to find opportunities that align with your needs.
                            </li>
                            <li>
                                <span className="font-bold">Review Details:</span> Click on any offer to view detailed information, including specific help they are offering.
                            </li>
                            <li>
                                <span className="font-bold">Get in Touch:</span> If you find an offer that suits your needs, use the contact info to connect directly with the offeror.
                            </li>
                        </ol>
                    </section>

                    <section className="flex-1 p-4 text-justify text-lg">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-4">Register and Create an Offer</h2>
                        <ol className="list-decimal list-inside space-y-4 text-sm">
                            <li>
                                <span className="font-bold">Sign Up:</span> Click on the <a href="/register" className="text-primary font-bold">Register</a> button to create a free account. Provide the necessary information to set up your profile.
                            </li>
                            <li>
                                <span className="font-bold">Create an Offer:</span> Once registered, log in and navigate to the "Create an Offer" section. Fill out the form with details about the help you are willing to provide, including the type of assistance, availability, and any other relevant information.
                            </li>
                        </ol>
                    </section>
                </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col w-1/3 bg-base-200 rounded-xl p-4 lg:p-6 shadow">
                <div className='flex flex-col gap-4 md:flex-row h-full'>
                    {isLoggedIn ? (
                        <a href="/offers" className='flex-1'>
                            <div className='bg-base-200 rounded-xl flex items-center justify-center h-full'>
                                <p className='text-secondary text-5xl font-bold'>Find your offer</p>
                            </div>
                        </a>
                    ) : (
                        <div className='bg-base-200 rounded-xl flex-1'>
                            <LoginForm />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}