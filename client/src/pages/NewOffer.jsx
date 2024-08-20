import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Fail from '../components/Alerts/Fail';
import Success from '../components/Alerts/Success'

export default function NewOffer() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [dateAndTime, setDateAndTime] = useState('');
    const [budget, setBudget] = useState('');
    const [frequency, setFrequency] = useState('');
    const [skillsRequired, setSkillsRequired] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [partMax, setPartMax] = useState('');

    const [isFormComplete, setIsFormComplete] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const allFieldsComplete =
            title && description && category && country && city && dateAndTime && budget && frequency && email && phone && partMax;
        setIsFormComplete(allFieldsComplete);
    }, [title, description, category, country, city, dateAndTime, budget, frequency, email, phone, partMax]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const offer = {
            title,
            description,
            category,
            country,
            city,
            dateAndTime,
            budget,
            frequency,
            skillsRequired,
            email,
            phone,
            partMax
        };
        
        fetch('/newOffer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offer)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setShowError(true);
                } else {
                    setShowSuccess(true);
                    setTimeout(() => {
                        history.push('/offers'); 
                    }, 2000);
                }
            })
            .catch((error) => {
                setShowError(true);
            });
    };

    return (
        <div className='flex h-screen justify-center'>
            <form onSubmit={handleSubmit} className="w-screen md:w-1/2 space-y-4 m-auto p-8 bg-base-200 rounded-xl">

                <h1 className="text-3xl font-bold text-center">Create an offer</h1>

                <div>
                    {showError && <Fail message="Offer failed to upload. Please try again later..." />}
                    {showSuccess && <Success message="Offer uploaded successfully. Please return to offers..." />}
                </div>

                <label className="input input-bordered flex items-center gap-2">
                    Title
                    <input
                        type="text"
                        className="grow"
                        placeholder="Enter the title for your offer"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Description
                    <input
                        type="text"
                        className="grow"
                        placeholder="Enter the description for your offer"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <div className="flex flex-col xl:flex-row gap-2">
                    <select
                        className="input input-bordered flex grow items-center gap-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Charity">Charity</option>
                        <option value="Moving">Moving</option>
                        <option value="Academia">Academia</option>
                        <option value="Driving">Driving</option>
                        <option value="Other">Other</option>
                    </select>
                    <select
                        className="input input-bordered flex grow items-center gap-2"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select frequency</option>
                        <option value="Once">Once</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                    <label className="input input-bordered flex grow items-center gap-2">
                        Skills Required
                        <input
                            type="checkbox"
                            checked={skillsRequired}
                            onChange={(e) => setSkillsRequired(e.target.checked)}
                        />
                    </label>
                </div>
                <div className='flex flex-col lg:flex-row gap-2'>
                    <label className="input input-bordered flex grow items-center gap-2">
                        Country
                        <input
                            type="text"
                            className="grow"
                            placeholder="Enter your country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>
                    <label className="input input-bordered flex grow items-center gap-2">
                        City
                        <input
                            type="text"
                            className="grow"
                            placeholder="Enter your city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                    Date and Time
                    <input
                        type="datetime-local"
                        className="grow"
                        value={dateAndTime}
                        onChange={(e) => setDateAndTime(e.target.value)}
                        required
                    />
                </label>
                <div className='flex flex-col xl:flex-row gap-2 w-full'>
                    <label className="input input-bordered flex items-center gap-2">
                        Budget
                        <input
                            type="number"
                            className="grow w-full"
                            placeholder="Enter your budget"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            required
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Maximum Participants
                        <input
                            type="number"
                            className="grow"
                            placeholder="Enter maximum amount of participants"
                            value={partMax}
                            onChange={(e) => setPartMax(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='flex flex-col lg:flex-row gap-2'>
                    <label className="input input-bordered flex grow items-center gap-2">
                        Email
                        <input
                            type="email"
                            className="grow"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="input input-bordered flex grow items-center gap-2">
                        Phone
                        <input
                            type="tel"
                            className="grow"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" className="btn btn-primary mx-auto block" disabled={!isFormComplete}>Upload Offer</button>
            </form>
        </div>
    );
}