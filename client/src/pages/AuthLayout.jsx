import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen bg-[#FFF7E4] grid grid-cols-12">
      <div className="col-span-5 overflow-hidden relative">
        <img src="/login-bg.jpg" alt="" />
        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-4xl font-semibold">
            Welocome back <br /> to SS Platform
          </p>
          <p className="text-sm font-semibold mt-2">Log in to start your day</p>
        </div>
      </div>
      <div className="col-span-7 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
