import React from "react";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, tasks }) => {
  const getTaskCount = (categoryName) => {
    return tasks.filter(task => 
      !task.completed && 
      (categoryName === "all" || task.category === categoryName)
    ).length;
  };

  const filterOptions = [
    { name: "all", label: "All Tasks", icon: "List" },
    ...categories.map(cat => ({
      name: cat.name,
      label: cat.name,
      icon: cat.icon
    }))
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
          <ApperIcon name="Filter" className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-display font-bold text-gray-900">
          Categories
        </h2>
      </div>

      <div className="space-y-2">
        {filterOptions.map((option) => (
          <motion.button
            key={option.name}
            onClick={() => onCategoryChange(option.name)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
              selectedCategory === option.name
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                : "hover:bg-purple-50 text-gray-700"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <ApperIcon 
                name={option.icon}
                className={`w-5 h-5 ${
                  selectedCategory === option.name ? "text-white" : "text-purple-500"
                }`}
              />
              <span className="font-medium">{option.label}</span>
            </div>
            <Badge
              variant={selectedCategory === option.name ? "default" : "primary"}
              size="sm"
              className={selectedCategory === option.name ? "bg-white/20 text-white" : ""}
            >
              {getTaskCount(option.name)}
            </Badge>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;