import { useState, useEffect } from "react";
import taskService from "@/services/api/taskService";
import { toast } from "react-toastify";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        taskService.getCategories()
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success("Task created successfully!");
      return newTask;
    } catch (err) {
      toast.error("Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id, updateData) => {
    try {
      const updatedTask = await taskService.update(id, updateData);
      setTasks(prev => 
        prev.map(task => task.Id === parseInt(id) ? updatedTask : task)
      );
      toast.success("Task updated successfully!");
      return updatedTask;
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id)));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task");
      throw err;
    }
  };

  const toggleTaskComplete = async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id);
      setTasks(prev => 
        prev.map(task => task.Id === parseInt(id) ? updatedTask : task)
      );
      
      if (updatedTask.completed) {
        toast.success("Task completed! Great job! 🎉");
      } else {
        toast.info("Task marked as incomplete");
      }
      
      return updatedTask;
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const newCategory = await taskService.createCategory(categoryData);
      setCategories(prev => [...prev, newCategory]);
      toast.success("Category created successfully!");
      return newCategory;
    } catch (err) {
      toast.error("Failed to create category");
      throw err;
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    categories,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    createCategory,
    refetch: loadTasks
  };
};