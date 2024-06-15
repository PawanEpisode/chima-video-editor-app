import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withSuspenseHOC from '../components/withSuspenseHOC.jsx';

const AppHeader = withSuspenseHOC(() => import(/* webpackChunkName: "AppHeader" / / webpackPreload: true */'../components/AppHeader/index.jsx'))
const Sidebar = withSuspenseHOC(() => import(/* webpackChunkName: "Sidebar" / / webpackPreload: true */'../components/Sidebar/index.jsx'))

import "../App.css";

const AppLayout = () => {
    // const isCollapsed = useSelector((state) => state.sidebar.isSidebarCollapsed)
    // const isUserSignedIn = useSelector((state) => state.authenticate.isUserSignedInState)
    // const navigate = useNavigate();
    // const { pathname } = useLocation();
    // const [intendedUrl, setIntendedUrl] = useState(null);

    // useEffect(() => {
    //     if (isUserSignedIn) {
    //         ['/login'].includes(pathname) ? navigate(intendedUrl ?? '/settings') : navigate(pathname);
    //     } else {
    //         if (!['/','/login'].includes(pathname)) {
    //             setIntendedUrl(pathname);
    //             navigate('/login');
    //         }
    //     }
    // }, [isUserSignedIn]);
    // console.log('AppLayout',pathname,intendedUrl)

    return (
        <>
            <div className="app">
                <AppHeader />
                <div className="app-container">
                    <Sidebar />
                    <div className={'applayout-design'}>
                        <Outlet />
                    </div>
                </div> 
            </div>
            <ToastContainer
                position="bottom-center"
                className={'toast-container'}
                bodyClassName={'toast-body-container'}
                toastClassName={'toast-internal'}
                progressClassName={'progress-classname'} />
        </>
    )
}

export default AppLayout