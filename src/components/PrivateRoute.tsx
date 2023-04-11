import { Navigate, RouteProps } from "react-router-dom";
import Cookies from "js-cookie";
import React, { ReactElement } from "react";

export function PrivateRoute({ children }: RouteProps): JSX.Element {
  const isLoggedIn = localStorage.getItem("token");
  return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
}
