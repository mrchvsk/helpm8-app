import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function isTokenExpired(token) {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp < currentTime;
}

function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

export default function Protected() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const userFirstName = localStorage.getItem('userFirstName');
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            if (!token || isTokenExpired(token)) {
                handleLogout();
                return;
            }

            try {
                const response = await fetch('/protected', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                    handleLogout();
                    return;
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error(error);
                alert('Error accessing protected route');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [history]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-6 text-center lg:text-left">Your Profile</h2>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <p>Loading...</p>
                </div>
            ) : data ? (
                <div className="w-full max-w-2xl bg-base-200 shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 rounded-lg shadow-md">
                        <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">Name:</span>
                                <span className="font-bold text-secondary">{userFirstName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Email:</span>
                                <span className="">{data.authData.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">User ID:</span>
                                <span className=" ">{data.authData.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Logged At:</span>
                                <span className=" ">{new Date(data.authData.iat * 1000).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Logged Until:</span>
                                <span className=" ">{new Date(data.authData.exp * 1000).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-red-500 text-lg">Failed to fetch data</div>
            )}
        </div>
    );
}