import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./components/main/Register";
import Login from './components/main/Login';
import {PrivateRoute} from "./components/PrivateRoute";
import Dashboard from "./components/main/Dashboard";
import Accounts from "./components/main/Accounts";
import Transactions from "./components/main/Transactions";
import Categories from "./components/main/Categories";
import Settings from "./components/main/Settings";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/accounts" element={<PrivateRoute><Accounts/></PrivateRoute>}/>
                <Route path="/transactions" element={<PrivateRoute><Transactions/></PrivateRoute>}/>
                <Route path="/categories" element={<PrivateRoute><Categories/></PrivateRoute>}/>
                <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
