import { Navigate, RouteProps } from "react-router-dom";
import Cookies from "js-cookie";
import React, { ReactElement } from "react";

export function PrivateRoute({ children }: RouteProps): JSX.Element {
  // what if I check for login ability, and direct to log in if not valid?
  const isLoggedIn = localStorage.getItem("token");
  return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
}
