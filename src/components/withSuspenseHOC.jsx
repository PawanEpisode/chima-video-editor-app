import React, { Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary.jsx';

const withSuspenseHOC = (importComponent, FallbackComponent = <div>Loading...</div>) => {
    const LazyComponent = React.lazy(importComponent);

    return (props) => (
        <ErrorBoundary>
            <Suspense fallback={FallbackComponent}>
                <LazyComponent {...props} />
            </Suspense>
        </ErrorBoundary>
    );
};

export default withSuspenseHOC;