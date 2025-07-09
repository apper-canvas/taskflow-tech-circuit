import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-amber-50/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;