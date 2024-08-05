export default function Use() {
    return (
        <div>
            <h2 className="text-4xl p-9 font-semibold bg-base-200 max-sm:text-center">How does it work</h2>
            <div className="flex flex-col md:flex-row justify-between p-4 md:p-9 bg-base-200 text-center mx-auto w-full">
                <div className="min-w-72 flex-1 flex flex-col items-center mx-2 my-4 md:my-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <h3 className="font-semibold text-xl mt-2">Post your offer</h3>
                    <p>Describe what you need help with <br />and set your budget.</p>
                </div>

                <div className="min-w-72 flex-1 flex flex-col items-center mx-2 my-4 md:my-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <h3 className="font-semibold text-xl mt-2">Get Matched</h3>
                    <p>We connect you with trusted helpers <br /> in your area.</p>
                </div>

                <div className="min-w-72 flex-1 flex flex-col items-center mx-2 my-4 md:my-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <h3 className="font-semibold text-xl mt-2">Get help</h3>
                    <p>Review profiles, chat with people, and <br /> hire the best fit.</p>
                </div>
            </div>
        </div>
    );
}
