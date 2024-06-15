import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="w-full p-30 flex flex-col gap-10 text-red-600">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
        </div>
    );
}
