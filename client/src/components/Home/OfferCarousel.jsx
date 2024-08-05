import Card from "../Card";
import { useEffect, useState } from "react";

export default function OfferCarousel() {
    const [backendData, setBackendData] = useState([]);

    useEffect(() => {
        fetch("/offersPreview")
            .then(response => response.json())
            .then(data => {
                setBackendData(data);
            })
    }, []);

    return (
        <div className="max-w-7xl m-auto">
            <div className="py-9 min-h-96 bg-base-200">
                <h2 className="p-3 pb-0 text-4xl font-semibold max-sm:text-center">Featured offers</h2>

                <div className="carousel carousel-center w-full p-9 space-x-9">
                    {backendData.map((offer) => (
                        <div className="carousel-item">
                            <Card key={offer.id} title={offer.title} desc={offer.description} participants={offer.part} participantsMax={offer.partMax} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
