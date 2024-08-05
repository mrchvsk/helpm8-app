export default function Mission() {
    return (
        <div className="flex flex-col lg:flex-row gap-4 xl:px-36 lg:p-9 bg-base-100">
            {/* Left side */}
            <div className="flex flex-col flex-1 bg-base-200 rounded-xl p-4 lg:p-6 shadow">
                <p className="text-secondary font-semibold text-center lg:text-left">How It Started</p>
                <h2 className="text-3xl lg:text-5xl font-bold mt-4 mb-6 text-center lg:text-left">
                    Our Mission is <br /> Connecting Individuals <br /> Needing Assistance
                </h2>
                <p className="text-base lg:text-lg text-justify sm:mt-7 mt-auto">
                    <span className="text-primary font-bold">HelpM8</span> was conceived and developed by Martin Mirchevski, driven by a visionary commitment to bridge the gap between those in need and compassionate individuals ready to assist. His ambition was to create a platform that not only connects people but also cultivates a thriving community built on mutual support and shared values. Through HelpM8, Martin aims to foster a culture of generosity and collaboration, empowering individuals to make a meaningful impact in each other’s lives.
                </p>
            </div>

            {/* Right side */}
            <div className="flex flex-col flex-1">
                {/* Top side */}
                <div>
                    <img className="w-full h-48 lg:h-auto rounded-xl object-cover grayscale shadow" src="https://appmsmunifyprod.blob.core.windows.net/docs/files/institution/edf23d63-1f99-4d0c-8cf0-fbbc996880e7.jpg" alt="Mission Image" />
                </div>

            </div>
        </div>
    );
}