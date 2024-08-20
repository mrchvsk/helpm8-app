export default function CallToAction() {
    return (
        <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">Get the Help You Need, Fast!</h2>
            <p className="mb-6">Post Your First Offer Now!</p>
            <a href="/offer">
                <button className="bg-primary text-white font-semibold w-full py-2 rounded hover:bg-secondary transition duration-300 ease-in-out">Post an Offer</button>
            </a>
        </div>
    );
};