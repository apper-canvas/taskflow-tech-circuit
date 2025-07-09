import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const StatsCard = ({ title, value, icon, gradient, description }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${gradient}`}>
          <ApperIcon name={icon} className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold font-display bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            {value}
          </p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    </motion.div>
  );
};

export default StatsCard;