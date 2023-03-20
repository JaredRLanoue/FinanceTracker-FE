import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Register from "./components/Register";
import Login from './components/Login';
import NavBarWithHeader from "./components/NavBarWithHeader";
import Empty from "./components/Empy";

const Router = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={`/login`} replace/>}/>
                <Route path="/login" element={<Login/>}>

                </Route>
                <Route path="/register" element={<Register/>}/>
                <Route path="/top" element={<NavBarWithHeader children={<Empty/>}/>}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;