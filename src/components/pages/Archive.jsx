import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import taskService from "@/services/api/taskService";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const Archive = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCompletedTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasks = await taskService.getCompletedTasks();
      setCompletedTasks(tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompletedTasks();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error error={error} onRetry={loadCompletedTasks} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Archive" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Archive
              </h1>
              <p className="text-gray-600">
                Your completed tasks and achievements
              </p>
            </div>
          </div>
          
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-purple-600">
                {completedTasks.filter(task => {
                  const completedDate = new Date(task.completedAt);
                  const now = new Date();
                  return completedDate.getMonth() === now.getMonth() &&
                         completedDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Calendar" className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">This Week</p>
              <p className="text-2xl font-bold text-amber-600">
                {completedTasks.filter(task => {
                  const completedDate = new Date(task.completedAt);
                  const now = new Date();
                  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                  return completedDate >= weekAgo;
                }).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Completed Tasks */}
      {completedTasks.length === 0 ? (
        <Empty
          title="No completed tasks yet"
          description="Complete some tasks to see them here in your archive"
          icon="Archive"
        />
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
            Completed Tasks
          </h2>
          <div className="space-y-4">
            {completedTasks
              .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
              .map((task) => (
                <motion.div
                  key={task.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                          {task.category}
                        </span>
                      </div>
                      
                      {task.description && (
                        <p className="text-gray-600 mb-2">{task.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          Completed: {format(new Date(task.completedAt), "MMM d, yyyy 'at' h:mm a")}
                        </span>
                        <span>
                          Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
                        </span>
                        <span className="capitalize">
                          Priority: {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Archive;