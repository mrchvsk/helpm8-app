import React, { useState } from 'react';

export default function NewOffer() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [dateAndTime, setDateAndTime] = useState('');
    const [budget, setBudget] = useState('');
    const [frequency, setFrequency] = useState('');
    const [skillsRequired, setSkillsRequired] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        const offer = {
            title,
            description,
            category,
            location,
            dateAndTime,
            budget,
            frequency,
            skillsRequired,
            email,
            phone,
        };
        console.log('New Offer:', offer);
        // You can send `offer` to your backend API here
    };

    return (
        <form onSubmit={handleSubmit} className="w-3/4 space-y-4 m-auto p-4">
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
            <div className="flex gap-2">
                <select
                    className="input input-bordered grow"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a category</option>
                    <option value="Household Chores">Household Chores</option>
                    <option value="Gardening">Gardening</option>
                    <option value="Moving Help">Moving Help</option>
                    <option value="Tutoring">Tutoring</option>
                    <option value="Pet Care">Pet Care</option>
                    <option value="Others">Others</option>
                </select>
                <select
                    className="input input-bordered grow"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    required
                >
                    <option value="" disabled>Select frequency</option>
                    <option value="One-Time">One-Time</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
                <label className="input input-bordered flex items-center gap-2">
                    Skills Required
                    <input
                        type="checkbox"
                        checked={skillsRequired}
                        onChange={(e) => setSkillsRequired(e.target.checked)}
                    />
                </label>
            </div>
            <label className="input input-bordered flex items-center gap-2">
                Location
                <input
                    type="text"
                    className="grow"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </label>
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
            <label className="input input-bordered flex items-center gap-2">
                Budget
                <input
                    type="number"
                    className="grow"
                    placeholder="Enter your budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                />
            </label>
            <div className='flex gap-2'>
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
            <button type="submit" className="btn btn-primary">Upload Offer</button>
        </form>
    );
}
