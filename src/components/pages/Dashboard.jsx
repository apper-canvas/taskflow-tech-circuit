import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTasks } from "@/hooks/useTasks";
import Header from "@/components/organisms/Header";
import TaskForm from "@/components/molecules/TaskForm";
import TaskList from "@/components/organisms/TaskList";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const Dashboard = () => {
const {
    tasks,
    categories,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    reorderTasks,
    refetch
  } = useTasks();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} onRetry={refetch} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <Header tasks={tasks} />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            tasks={tasks}
          />
        </div>
        
        <div className="lg:col-span-3 space-y-8">
          <TaskForm
            onSubmit={handleCreateTask}
            categories={categories}
            loading={loading}
          />
          
<TaskList
            tasks={tasks}
            onToggleComplete={toggleTaskComplete}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            selectedCategory={selectedCategory}
            onReorderTasks={reorderTasks}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;