import React from 'react'

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withSuspenseHOC from '../components/withSuspenseHOC.jsx';

const AppHeader = withSuspenseHOC(() => import(/* webpackChunkName: "AppHeader" / / webpackPreload: true */'../components/AppHeader/index.jsx'))

import "../App.css";

const AppLayout = () => {

    return (
        <>
            <div className="app">
                <AppHeader />
                <div className={'applayout-design'}>
                    <Outlet />
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