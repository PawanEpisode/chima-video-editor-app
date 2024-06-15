import React from 'react';

import withSuspenseHOC from '../components/withSuspenseHOC.jsx';

const AppLayout = withSuspenseHOC(() => import(/* webpackChunkName: "AppLayout" / / webpackPrefetch: true */'../layouts/AppLayout.jsx'))

const ErrorPage = withSuspenseHOC(() => import(/* webpackChunkName: "ErrorPage" / / webpackPrefetch: true */'../components/ErrorPage/index.jsx'))

const MainContainer = withSuspenseHOC(() => import(/* webpackChunkName: "MainContainer" / / webpackPrefetch: true */'../components/MainContainer/index.jsx'))

const DynamicVideoEditor = withSuspenseHOC(() => import(/* webpackChunkName: "Integration" / / webpackPrefetch: true */'../pages/VideoEditorPage/index.jsx'))
const Page403 = withSuspenseHOC(() => import(/* webpackChunkName: "Integration" / / webpackPrefetch: true */'../pages/403/index.jsx'))
const Page404 = withSuspenseHOC(() => import(/* webpackChunkName: "Integration" / / webpackPrefetch: true */'../pages/404/index.jsx'))

const ConditionalRoutes = () => {

    return [
        {
            path: '/',
            element: <AppLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/',
                    element: <MainContainer />,
                },
                {
                    path: '/403',
                    element: <Page403 />,
                },
                {
                    path: '/404',
                    element: <Page404 />,
                },
                {
                    path: '/editor',
                    element: <DynamicVideoEditor />,
                },
            ]
        },
        // Fallback route for 404
        {
            path: '*',
            element: <Page404 />,
        }
    ]
}

export const routers = ConditionalRoutes;