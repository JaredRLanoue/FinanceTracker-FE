import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/main/Register";
import Login from "./components/main/Login";
import { PrivateRoute } from "./components/main/PrivateRoute";
import Dashboard from "./components/main/Dashboard";
import Accounts from "./components/main/Accounts";
import Transactions from "./components/main/Transactions";
import Categories from "./components/main/Categories";
import Settings from "./components/main/Settings";
import SidebarWithHeader from "./components/navigation/SidebarWithHeader";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <SidebarWithHeader>
              <PrivateRoute>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </PrivateRoute>
            </SidebarWithHeader>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
