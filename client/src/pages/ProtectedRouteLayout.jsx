import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteLayout = ({ authData }) => {
  console.log(authData);
  if (authData?.isLoading) return null;

  if (!authData?.isLoggedIn) return <Navigate to="/login" />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRouteLayout;
