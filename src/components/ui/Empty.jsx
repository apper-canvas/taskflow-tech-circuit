import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet",
  description = "Create your first task to get started with TaskFlow",
  icon = "CheckCircle",
  action,
  actionText = "Create Task"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-white rounded-2xl p-8 shadow-card-hover text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
          <ApperIcon 
            name={icon}
            className="w-10 h-10 text-purple-500"
          />
        </div>
        
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {action && (
          <button
            onClick={action}
            className="btn-primary group"
          >
            <ApperIcon 
              name="Plus" 
              className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200"
            />
            {actionText}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;