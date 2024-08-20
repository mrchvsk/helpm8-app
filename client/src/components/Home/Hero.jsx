import React from 'react';
import LoginForm from '../LoginForm';
import CallToAction from './CallToAction'; 

export default function Hero() {
    const isLoggedIn = !!localStorage.getItem('token'); 

    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content lg:gap-16 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Your Go-To Platform for <br /> Getting Help</h1>
                    <p className="py-6 lg:text-justify">We connect you with trusted and skilled helpers in your community. Whether you need assistance with household chores, tutoring, moving, or pet care, our platform makes it easy to find the right person for the job. Join us today and experience the convenience of HelpM8!</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
                    {isLoggedIn ? <CallToAction /> : <LoginForm />}
                </div>
            </div>
        </div>
    );
}