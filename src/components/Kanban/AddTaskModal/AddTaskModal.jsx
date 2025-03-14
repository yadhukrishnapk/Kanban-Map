import { useState, useEffect } from "react";

const AddTaskModal = ({ onClose, onAddTask, initialStatus, isStatusDisabled }) => {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState(initialStatus || "todo");
  const [category, setCategory] = useState("Frontend");

  useEffect(() => {
    if (initialStatus) {
      setStatus(initialStatus);
    }
  }, [initialStatus]);

  const handleSubmit = () => {
    if (taskName.trim()) {
      onAddTask(taskName, status, category);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4" onKeyDown={handleKeyDown}>
          <div>
            <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
              Task Name
            </label>
            <input 
              id="taskName"
              type="text" 
              value={taskName} 
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter task description..."
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input 
              id="category"
              type="text" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter category (e.g. Frontend, Backend, Design)"
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select 
              id="status"
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              disabled={isStatusDisabled} // Disable if fixed
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                isStatusDisabled ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="onReview">On Review</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={!taskName.trim()}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${!taskName.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;