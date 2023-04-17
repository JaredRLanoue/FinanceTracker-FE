import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./component/main/Register";
import Login from "./component/main/Login";
import {PrivateRoute} from "./component/main/PrivateRoute";
import Accounts from "./component/main/Accounts";
import Transactions from "./component/main/Transactions";
import Categories from "./component/main/Categories";
import Settings from "./component/main/Settings";
import SidebarWithHeader from "./component/navigation/SidebarWithHeader";
import Welcome from "./component/main/Welcome";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <SidebarWithHeader>
              <PrivateRoute>
                <Routes>
                  {/*<Route path="/dashboard" element={<Dashboard />} />*/}
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
