class TaskService {
  constructor() {
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "order" } }
        ],
        orderBy: [
          { fieldName: "order", sorttype: "ASC" }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('task', params);
      
      if (!response.success) {
        console.error("Error fetching tasks:", response.message);
        throw new Error(response.message);
      }
      
      // Transform database fields to match UI expectations
      const transformedTasks = (response.data || []).map(task => ({
        Id: task.Id,
        title: task.title || '',
        description: task.description || '',
        category: task.category || '',
        priority: task.priority || 'medium',
        dueDate: task.due_date || '',
        completed: task.completed === "true" || task.completed === true,
        createdAt: task.created_at || new Date().toISOString(),
        completedAt: task.completed_at || null,
        order: task.order || 0
      }));
      
      return transformedTasks;
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "order" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById('task', parseInt(id), params);
      
      if (!response.success) {
        console.error("Error fetching task:", response.message);
        throw new Error(response.message);
      }
      
      if (!response.data) {
        return null;
      }
      
      // Transform database fields to match UI expectations
      const task = response.data;
      return {
        Id: task.Id,
        title: task.title || '',
        description: task.description || '',
        category: task.category || '',
        priority: task.priority || 'medium',
        dueDate: task.due_date || '',
        completed: task.completed === "true" || task.completed === true,
        createdAt: task.created_at || new Date().toISOString(),
        completedAt: task.completed_at || null,
        order: task.order || 0
      };
    } catch (error) {
      console.error("Error fetching task:", error.message);
      throw error;
    }
  }

  async create(taskData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          title: taskData.title,
          description: taskData.description || '',
          category: taskData.category,
          priority: taskData.priority,
          due_date: taskData.dueDate,
          completed: "false",
          created_at: new Date().toISOString(),
          completed_at: null,
          order: 0
        }]
      };
      
      const response = await this.apperClient.createRecord('task', params);
      
      if (!response.success) {
        console.error("Error creating task:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} tasks:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to create task");
        }
        
        const createdTask = response.results[0].data;
        return {
          Id: createdTask.Id,
          title: createdTask.title || '',
          description: createdTask.description || '',
          category: createdTask.category || '',
          priority: createdTask.priority || 'medium',
          dueDate: createdTask.due_date || '',
          completed: createdTask.completed === "true" || createdTask.completed === true,
          createdAt: createdTask.created_at || new Date().toISOString(),
          completedAt: createdTask.completed_at || null,
          order: createdTask.order || 0
        };
      }
      
      throw new Error("No task data returned from server");
    } catch (error) {
      console.error("Error creating task:", error.message);
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          title: updateData.title,
          description: updateData.description || '',
          category: updateData.category,
          priority: updateData.priority,
          due_date: updateData.dueDate,
          completed: updateData.completed ? "true" : "false",
          completed_at: updateData.completedAt || null,
          order: updateData.order || 0
        }]
      };
      
      const response = await this.apperClient.updateRecord('task', params);
      
      if (!response.success) {
        console.error("Error updating task:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} tasks:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to update task");
        }
        
        const updatedTask = response.results[0].data;
        return {
          Id: updatedTask.Id,
          title: updatedTask.title || '',
          description: updatedTask.description || '',
          category: updatedTask.category || '',
          priority: updatedTask.priority || 'medium',
          dueDate: updatedTask.due_date || '',
          completed: updatedTask.completed === "true" || updatedTask.completed === true,
          createdAt: updatedTask.created_at || new Date().toISOString(),
          completedAt: updatedTask.completed_at || null,
          order: updatedTask.order || 0
        };
      }
      
      throw new Error("No task data returned from server");
    } catch (error) {
      console.error("Error updating task:", error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord('task', params);
      
      if (!response.success) {
        console.error("Error deleting task:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} tasks:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to delete task");
        }
        
        return true;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting task:", error.message);
      throw error;
    }
  }

  async toggleComplete(id) {
    try {
      // Get current task state
      const currentTask = await this.getById(id);
      if (!currentTask) {
        throw new Error("Task not found");
      }
      
      // Toggle completion status
      const updatedTask = await this.update(id, {
        ...currentTask,
        completed: !currentTask.completed,
        completedAt: !currentTask.completed ? new Date().toISOString() : null
      });
      
      return updatedTask;
    } catch (error) {
      console.error("Error toggling task completion:", error.message);
      throw error;
    }
  }

  async getCategories() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color" } },
          { field: { Name: "icon" } }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('category', params);
      
      if (!response.success) {
        console.error("Error fetching categories:", response.message);
        throw new Error(response.message);
      }
      
      // Transform database fields to match UI expectations
      const transformedCategories = (response.data || []).map(category => ({
        Id: category.Id,
        name: category.Name || '',
        color: category.color || '#5B21B6',
        icon: category.icon || 'Tag'
      }));
      
      return transformedCategories;
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      throw error;
    }
  }

  async createCategory(categoryData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Name: categoryData.name,
          color: categoryData.color || '#5B21B6',
          icon: categoryData.icon || 'Tag'
        }]
      };
      
      const response = await this.apperClient.createRecord('category', params);
      
      if (!response.success) {
        console.error("Error creating category:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} categories:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to create category");
        }
        
        const createdCategory = response.results[0].data;
        return {
          Id: createdCategory.Id,
          name: createdCategory.Name || '',
          color: createdCategory.color || '#5B21B6',
          icon: createdCategory.icon || 'Tag'
        };
      }
      
      throw new Error("No category data returned from server");
    } catch (error) {
      console.error("Error creating category:", error.message);
      throw error;
    }
  }

  async getCompletedTasks() {
    try {
      const allTasks = await this.getAll();
      return allTasks.filter(task => task.completed);
    } catch (error) {
      console.error("Error fetching completed tasks:", error.message);
      throw error;
    }
  }

  async getActiveTasks() {
    try {
      const allTasks = await this.getAll();
      return allTasks.filter(task => !task.completed);
    } catch (error) {
      console.error("Error fetching active tasks:", error.message);
      throw error;
    }
  }

  async getTasksByCategory(category) {
    try {
      const allTasks = await this.getAll();
      return allTasks.filter(task => task.category === category);
    } catch (error) {
      console.error("Error fetching tasks by category:", error.message);
      throw error;
    }
  }

  async getTasksByPriority(priority) {
    try {
      const allTasks = await this.getAll();
      return allTasks.filter(task => task.priority === priority);
    } catch (error) {
      console.error("Error fetching tasks by priority:", error.message);
      throw error;
    }
  }

  async getTodaysTasks() {
    try {
      const allTasks = await this.getAll();
      const today = new Date().toISOString().split("T")[0];
      return allTasks.filter(task => 
        task.dueDate === today && !task.completed
      );
    } catch (error) {
      console.error("Error fetching today's tasks:", error.message);
      throw error;
    }
  }

  async getOverdueTasks() {
    try {
      const allTasks = await this.getAll();
      const today = new Date().toISOString().split("T")[0];
      return allTasks.filter(task => 
        task.dueDate < today && !task.completed
      );
    } catch (error) {
      console.error("Error fetching overdue tasks:", error.message);
      throw error;
    }
  }

  async reorderTasks(reorderedTasks) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      // Update order for each task
      const updates = reorderedTasks.map((task, index) => ({
        Id: task.Id,
        title: task.title,
        description: task.description || '',
        category: task.category,
        priority: task.priority,
        due_date: task.dueDate,
        completed: task.completed ? "true" : "false",
        completed_at: task.completedAt || null,
        order: index
      }));
      
      const params = {
        records: updates
      };
      
      const response = await this.apperClient.updateRecord('task', params);
      
      if (!response.success) {
        console.error("Error reordering tasks:", response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to reorder ${failedRecords.length} tasks:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to reorder some tasks");
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error reordering tasks:", error.message);
      throw error;
    }
  }
}

export default new TaskService();