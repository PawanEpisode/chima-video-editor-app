import { useRoutes, useNavigate } from "react-router-dom";

import globalStore from "../store/globalStore.js";

import { routers } from "./config.jsx";

export const Routers = () => {
    globalStore.navigate = useNavigate();
    const routes = routers()
    return useRoutes(routes)
}