import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StatsCard from "@/components/molecules/StatsCard";
import ProgressRing from "@/components/molecules/ProgressRing";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split("T")[0];
    return task.dueDate === today && !task.completed;
  }).length;
  const overdueTasks = tasks.filter(task => {
    const today = new Date().toISOString().split("T")[0];
    return task.dueDate < today && !task.completed;
  }).length;
  
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-card mb-8"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              TaskFlow
            </h1>
            <p className="text-gray-600">
              Organize your day, achieve your goals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {activeTasks}
            </div>
            <div className="text-sm text-gray-500">Active Tasks</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {todayTasks}
            </div>
            <div className="text-sm text-gray-500">Due Today</div>
          </div>
          
          {overdueTasks > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {overdueTasks}
              </div>
              <div className="text-sm text-gray-500">Overdue</div>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <ProgressRing progress={completionRate} size={60} strokeWidth={6} />
            <div>
              <div className="text-sm text-gray-500">Completion Rate</div>
              <div className="text-lg font-semibold text-gray-900">
                {completedTasks} / {totalTasks}
              </div>
            </div>
          </div>

          <Link
            to="/archive"
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <ApperIcon name="Archive" className="w-4 h-4" />
            <span className="font-medium">Archive</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;