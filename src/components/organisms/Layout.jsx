import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../App";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Layout = () => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-amber-50/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center text-white text-xl font-bold">
              T
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">TaskFlow</h1>
              {user && (
                <p className="text-sm text-gray-600">Welcome back, {user.firstName || user.emailAddress}</p>
              )}
            </div>
          </div>
          
          <Button
            variant="ghost"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <ApperIcon name="LogOut" className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;