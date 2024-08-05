export default function HowWorks() {
    return (
        <div className="flex flex-col lg:flex-row gap-4 xl:px-36 lg:p-9 bg-base-100">
            {/* Left side */}
            <div className="flex flex-col flex-1 bg-base-200 rounded-xl p-4 lg:p-6 shadow">
                <p className="text-secondary font-semibold text-center lg:text-left">Get Started</p>
                <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-6 text-center lg:text-left">How does the platform work?</h2>

                <div className="flex flex-col lg:flex-row bg-base-300 rounded-xl">
                    <section className="flex-1 p-4 text-justify text-lg sm:mt-7">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-4">Explore Offers for Free</h2>
                        <ol className="list-decimal list-inside space-y-4 text-sm">
                            <li>
                                <span className="font-bold">Browse Offers:</span> Explore the various help offers listed by others. Use filters to find opportunities that align with your needs.
                            </li>
                            <li>
                                <span className="font-bold">Review Details:</span> Click on any offer to view detailed information, including specific help they are offering.
                            </li>
                            <li>
                                <span className="font-bold">Get in Touch:</span> If you find an offer that suits your needs, use the provided contact options to connect directly with the offeror.
                            </li>
                        </ol>
                    </section>

                    <section className="flex-1 p-4 text-justify text-lg sm:mt-7">
                        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">Register and Create an Offer</h2>
                        <ol className="list-decimal list-inside space-y-4 text-sm">
                            <li>
                                <span className="font-bold">Sign Up:</span> Click on the <a href="/register" className="text-primary font-bold">Register</a> button to create a free account. Provide the necessary information to set up your profile.
                            </li>
                            <li>
                                <span className="font-bold">Create an Offer:</span> Once registered, log in and navigate to the "Create an Offer" section. Fill out the form with details about the help you are willing to provide, including the type of assistance, availability, and any other relevant information.
                            </li>
                        </ol>
                    </section>
                </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col flex-1">
                {/* Top side */}
                <div>
                    <img className="w-full h-48 lg:h-auto rounded-xl object-cover grayscale shadow" src="https://appmsmunifyprod.blob.core.windows.net/docs/files/institution/edf23d63-1f99-4d0c-8cf0-fbbc996880e7.jpg" alt="How it works" />
                </div>

                {/* Bottom side */}
                <div className="stats stats-horizontal mt-4 w-full bg-base-200 shadow lg:stats-horizontal">
                    <div className="stat">
                        <div className="stat-title">Members</div>
                        <div className="stat-value">3</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Revisions</div>
                        <div className="stat-value">5</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Ambitions</div>
                        <div className="stat-value">&infin;</div>
                    </div>
                </div>
            </div>
        </div>
    );
}