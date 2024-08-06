import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Use useHistory for navigation

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory(); // Initialize useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userFirstName', data.user.firstName); // Store firstName
                history.push('/protected');
            } else {
                alert(data.message || 'Error logging in');
            }
        } catch (error) {
            console.error(error);
            alert('Error logging in');
        }
    };

    return (
        <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="email@helpm8.com"
                    className="input input-bordered"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="******"
                    className="input input-bordered"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary text-white">
                    Login
                </button>
            </div>
        </form>
    );
};
