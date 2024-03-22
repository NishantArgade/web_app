import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRouteLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRouteLayout;
