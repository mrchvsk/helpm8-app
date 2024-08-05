import React from 'react';

const PageWrapper = ({ children }) => {
    return <div className="flex flex-col min-h-96">{children}</div>;
};

export default PageWrapper;