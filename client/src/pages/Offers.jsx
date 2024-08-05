import React, { useState, useEffect } from "react";

import Card from "../components/Card";

export default function Offers() {

    const [offers, setOffers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('none');

    useEffect(() => {
        fetch('/offers')
            .then(response => response.json())
            .then(data => {
                setOffers(data);
            })
    }, []);

    const filteredOffers = offers
        .filter(offer => {
            return (
                offer.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (filterCategory === '' || offer.category === filterCategory)
            );
        })
        .sort((a, b) => {
            if (sortOrder === 'low-to-high') {
                return a.budget - b.budget;
            } else if (sortOrder === 'high-to-low') {
                return b.budget - a.budget;
            }
            return 0;
        });

    return (
        <div className="container max-w-7xl mx-auto p-4">
            <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-6 text-left">Offers</h2>

            <div className="bg-base-300 rounded-xl p-8 my-10">

                <div className="mb-4 flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input input-bordered p-2 w-full sm:flex-1 min-w-0"
                    />

                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="input input-bordered p-2 w-full sm:flex-none sm:w-48"
                    >
                        <option value="">All Categories</option>
                        <option value="Charity">Charity</option>
                        <option value="Moving">Moving</option>
                        <option value="Academia">Academia</option>
                        <option value="Driving">Driving</option>
                        <option value="Other">Other</option>
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="input input-bordered p-2 w-full sm:flex-none sm:w-48"
                    >
                        <option value="none">Sort By Price</option>
                        <option value="low-to-high">Lowest to Highest</option>
                        <option value="high-to-low">Highest to Lowest</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredOffers.map(offer => (
                        <Card
                            key={offer.oid}
                            title={offer.title}
                            desc={offer.description}
                            participants={offer.part}
                            participantsMax={offer.partMax}
                        />
                    ))}
                </div>

            </div>

        </div>
    );
}