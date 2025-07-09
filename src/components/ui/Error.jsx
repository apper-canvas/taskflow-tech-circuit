import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ error, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-white rounded-2xl p-8 shadow-card-hover text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
          <ApperIcon 
            name="AlertCircle" 
            className="w-8 h-8 text-red-500"
          />
        </div>
        
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
          Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {error || "We encountered an error while loading your tasks. Please try again."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRetry}
            className="btn-primary group"
          >
            <ApperIcon 
              name="RefreshCw" 
              className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
            />
            Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4" />
            Refresh Page
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Error;