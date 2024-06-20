export default function About() {
    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 xl:px-36 lg:p-9 bg-base-100">
                {/* Left side */}
                <div className="flex flex-col flex-1 bg-base-200 rounded-xl p-4 lg:p-6">
                    <p className="text-secondary font-semibold">How It Started</p>
                    <h2 className="mb-auto font-bold text-5xl mt-4">Our Mission is <br /> Connecting Individuals <br /> Needing Assistance</h2>
                    <p className="mt-auto text-justify text-lg sm:mt-7">HelpM8 was founded by Martin Mirchevski, Rishi, and Sam, three individuals driven by a common vision of community support and assistance. Their shared dream was to create a platform that connects those in need with skilled helpers, fostering a sense of community and mutual aid. United by their belief in the power of collaboration, they embarked on a journey to build HelpM8.</p>
                </div>

                {/* Right side */}
                <div className="flex flex-col flex-1">
                    {/* Top side */}
                    <div>
                        <img className="w-full rounded-xl xl:max-h-80 xl:object-cover grayscale" src="https://appmsmunifyprod.blob.core.windows.net/docs/files/institution/edf23d63-1f99-4d0c-8cf0-fbbc996880e7.jpg"/>
                    </div>

                    {/* Bottom side */}
                    <div className="stats stats-horizontal mt-4 w-full lg:stats-horizontal shadow bg-base-200">
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
        </>
    );
}
