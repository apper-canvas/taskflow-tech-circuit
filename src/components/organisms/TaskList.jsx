import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import TaskCard from "@/components/molecules/TaskCard";

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete, selectedCategory }) => {
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredTasks = tasks.filter(task => {
    if (selectedCategory === "all") return true;
    return task.category === selectedCategory;
  });

const sortedTasks = [...filteredTasks].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case "dueDate":
        aValue = new Date(a.dueDate);
        bValue = new Date(b.dueDate);
        break;
      case "priority": {
        const priorityOrder = { "high": 3, "medium": 2, "low": 1 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
        break;
      }
      case "title":
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case "completed":
        aValue = a.completed;
        bValue = b.completed;
        break;
      default:
        aValue = a.createdAt;
        bValue = b.createdAt;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const activeTasks = sortedTasks.filter(task => !task.completed);
  const completedTasks = sortedTasks.filter(task => task.completed);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  if (filteredTasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        description={selectedCategory === "all" 
          ? "Create your first task to get started with TaskFlow"
          : `No tasks found in ${selectedCategory} category`
        }
        icon="CheckCircle"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort controls */}
      <div className="bg-white rounded-xl p-4 shadow-card">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500 font-medium">Sort by:</span>
          <div className="flex items-center gap-2">
            {[
              { field: "dueDate", label: "Due Date", icon: "Calendar" },
              { field: "priority", label: "Priority", icon: "AlertTriangle" },
              { field: "title", label: "Title", icon: "Type" },
              { field: "completed", label: "Status", icon: "CheckSquare" }
            ].map((option) => (
              <button
                key={option.field}
                onClick={() => handleSort(option.field)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  sortBy === option.field
                    ? "bg-purple-100 text-purple-700"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <ApperIcon name={option.icon} className="w-4 h-4" />
                <span>{option.label}</span>
                {sortBy === option.field && (
                  <ApperIcon 
                    name={sortOrder === "asc" ? "ChevronUp" : "ChevronDown"} 
                    className="w-4 h-4"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active tasks */}
      {activeTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ApperIcon name="Clock" className="w-5 h-5 text-purple-500" />
            Active Tasks ({activeTasks.length})
          </h3>
          <div className="space-y-4">
            <AnimatePresence>
              {activeTasks.map((task) => (
                <motion.div
                  key={task.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskCard
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Completed tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-500" />
            Completed Tasks ({completedTasks.length})
          </h3>
          <div className="space-y-4">
            <AnimatePresence>
              {completedTasks.map((task) => (
                <motion.div
                  key={task.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskCard
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;