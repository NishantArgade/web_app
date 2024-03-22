import React from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="px-20 bg-[#FFF7E4] h-screen pt-4">
        <p className="font-medium text-xl mb-4">Marketing Management</p>
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
