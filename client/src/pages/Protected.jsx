import React, { useEffect, useState } from 'react';

export default function Protected() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('/protected', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error(error);
                alert('Error accessing protected route');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Protected Route</h2>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
}