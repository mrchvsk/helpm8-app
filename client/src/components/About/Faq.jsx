import React, { useState } from 'react';

export default function Faq() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqs = [
        {
            question: 'How do I post an offer for help?',
            answer: 'To post an offer for help, simply create an account, navigate to the "Post an Offer" section, fill in the details of your request, and submit it. Your offer will then be visible to others who can offer their assistance.'
        },
        {
            question: 'Do I need to pay for help?',
            answer: 'Payment is optional. You can offer money for the help you need, but it is not required. You can specify if the help is paid or voluntary when you create your offer.'
        },
        {
            question: 'How do I respond to an offer?',
            answer: 'If you see an offer that you can help with, click on the offer and use the contact information provided to get in touch with the person who posted it. You can then discuss details and arrangements directly with them.'
        },
        {
            question: 'Is my personal information safe?',
            answer: 'Yes, we prioritize your privacy and security. Personal information shared on our platform is protected and only used for the purposes of connecting helpers with those in need.'
        },
        {
            question: 'Can I delete my offer once it’s posted?',
            answer: 'Yes, you can delete your offer at any time. Simply go to your profile, find the offer you wish to remove, and click the delete button.'
        },
    ];

    const toggleFAQ = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="py-10 max-w-screen-xl m-auto">
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-base-200 rounded-xl">
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-base-300 rounded-lg shadow-md">
                            <div
                                className="p-6 cursor-pointer"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3 className="text-2xl font-semibold text-base-500">{faq.question}</h3>
                            </div>
                            {expandedIndex === index && (
                                <div className="px-6 pb-6">
                                    <p className="mt-3 text-base-600">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}