import React, { useState, useEffect } from "react";

export default function Register() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: '',
        country: '',
        city: ''
    });
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const countryCityMap = {
        Germany: ['Berlin', 'Munich', 'Frankfurt'],
        Bulgaria: ['Sofia', 'Plovdiv', 'Varna', 'Bankya', 'Velingrad'],
        Cameroon: ['Yaoundé', 'Douala', 'Garoua'],
        Malaysia: ['Kuala Lumpur', 'George Town', 'Johor Bahru']
    };

    const handleCountryChange = (event) => {
        const country = event.target.value;
        setSelectedCountry(country);
        setCities(countryCityMap[country] || []);
        setFormData({ ...formData, country: country, city: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowError(false);
        setShowSuccess(false);

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setShowError(true);
                } else {
                    setShowSuccess(true);
                    setFormData({
                        name: '',
                        surname: '',
                        email: '',
                        password: '',
                        repeatPassword: '',
                        country: '',
                        city: ''
                    });
                    setSelectedCountry('');
                    setCities([]);
                }
            })
            .catch((error) => {
                setShowError(true);
            });
    };

    useEffect(() => {
        const isValid = Object.values(formData).every(field => field.trim() !== '') && formData.password === formData.repeatPassword;
        setIsFormValid(isValid);
    }, [formData]);

    return (
        <div className="flex justify-center h-screen">
            <form className="m-auto bg-base-200 md:w-5/12 w-full flex flex-col gap-4 p-4 py-8 rounded-xl items-center shadow" onSubmit={handleSubmit}>
                {showError && (
                    <div role="alert" className="alert alert-error w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error! Your registration was unsuccessful! Please try again.</span>
                    </div>
                )}
                {showSuccess && (
                    <div role="alert" className="alert alert-success w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Your registration has been successful!</span>
                    </div>
                )}

                <h1 className="text-3xl font-bold">Register an account</h1>

                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <label className="input input-bordered flex items-center gap-2 grow md:flex-1">
                        Name
                        <input type="text" name="name" className="grow" placeholder="Enter your first name" value={formData.name} onChange={handleChange} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 grow md:flex-1">
                        Surname
                        <input type="text" name="surname" className="grow" placeholder="Enter your family name" value={formData.surname} onChange={handleChange} />
                    </label>
                </div>

                <label className="input input-bordered flex items-center gap-2 w-full">
                    Email
                    <input type="text" name="email" className="grow" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                </label>

                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <label className="input input-bordered flex items-center gap-2 grow md:flex-1">
                        Country
                        <select className="select select-ghost grow" value={selectedCountry} onChange={handleCountryChange}>
                            <option value="" disabled selected>Where are you from?</option>
                            <option value="Germany">Germany</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Malaysia">Malaysia</option>
                        </select>
                    </label>

                    <label className="input input-bordered flex items-center gap-2 grow md:flex-1">
                        City
                        <select className="select select-ghost grow" name="city" value={formData.city} onChange={handleChange}>
                            <option value="" disabled selected>Select your city</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <label className="input input-bordered flex items-center gap-2 grow md:flex-1">
                        Password
                        <input type="password" name="password" className="grow" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 grow md:flex-1">
                        Repeat password
                        <input type="password" name="repeatPassword" className="grow" placeholder="Repeat your password" value={formData.repeatPassword} onChange={handleChange} />
                    </label>
                </div>

                <button type="submit" className="btn bg-primary w-full md:w-32 m-auto" disabled={!isFormValid}>Register me</button>
            </form>
        </div>
    )
}
