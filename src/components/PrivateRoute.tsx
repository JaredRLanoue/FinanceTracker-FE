import {Navigate, Route, RouteProps, Routes} from 'react-router-dom';
import Cookies from "js-cookie";
import SidebarWithHeader from "./navigation/SidebarWithHeader";
import React, {ReactElement} from "react";
import Login from "./main/Login";

export function PrivateRoute({children}: RouteProps): JSX.Element {
    const isLoggedIn = localStorage.getItem("token")
    return (
        <>
            {isLoggedIn ? children : <Navigate to="/login"/>}
        </>
    );
}
