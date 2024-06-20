import Card from "./Card";
import { useEffect, useState } from "react";

export default function OfferCarousel() {
    const [backendData, setBackendData] = useState([]);

    useEffect(() => {
        fetch("/offersPreview")
            .then(response => response.json())
            .then(data => {
                setBackendData(data);
            })
            .catch(error => {
                console.error("Error fetching offers:", error);
            });
    }, []);

    return (
        <div className="py-9 min-h-96 bg-base-200">
            <h2 className="p-9 pb-0 text-4xl font-semibold max-sm:text-center">Featured offers</h2>

            <div className="carousel carousel-center w-full p-9 space-x-9">
                {backendData.map((offer) => (
                    <div key={offer.id} className="carousel-item">
                        <Card title={offer.title} desc={offer.description} participants={offer.participants} participantsMax={offer.participantsMax} />
                    </div>
                ))}
            </div>
        </div>
    );
}
