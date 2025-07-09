import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg w-48"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="h-8 bg-gradient-to-r from-purple-200 to-purple-300 rounded w-12 mb-1"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
            </div>
            <div className="text-center">
              <div className="h-8 bg-gradient-to-r from-amber-200 to-amber-300 rounded w-12 mb-1"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Task form skeleton */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <div className="space-y-4">
          <div className="h-6 bg-gradient-to-r from-purple-200 to-purple-300 rounded w-32"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
          </div>
          <div className="h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
          <div className="flex justify-end">
            <div className="h-12 bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg w-32"></div>
          </div>
        </div>
      </div>

      {/* Task list skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            className="bg-white rounded-xl p-6 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-200 to-purple-300 rounded mt-1"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded w-3/4"></div>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full w-16"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-red-200 to-red-300 rounded-full"></div>
                  </div>
                </div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-200 to-purple-300 rounded"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-red-200 to-red-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;