import React, { useEffect, useState } from "react";
import { initialTasks } from "../InitialTasks";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import KanbanBoard from "../KanbanBoard/KanbanBoard";

const Home = () => {
  const defaultColumns = {
    todo: [],
    inProgress: [],
    onReview: [],
    done: [],
  };

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");
    return savedTasks 
      ? { ...defaultColumns, ...JSON.parse(savedTasks) } 
      : initialTasks || defaultColumns;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("todo");
  const [isStatusFixed, setIsStatusFixed] = useState(false);

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceColumn = tasks[source.droppableId];
    const draggedTask = sourceColumn.find((task) => task.id === draggableId);
    const newTasks = { ...tasks };
    newTasks[source.droppableId] = sourceColumn.filter(
      (task) => task.id !== draggableId
    );
    const destColumn = newTasks[destination.droppableId];
    destColumn.splice(destination.index, 0, draggedTask);
    setTasks(newTasks);
  };

  const handleAddTask = (taskName, status, category) => {
    const newTask = {
      id: `task-${Date.now()}`,
      content: taskName,
      category: category || "Uncategorized",
      creationDate: new Date().toISOString(),
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      [status]: [...prevTasks[status], newTask],
    }));
  };

  const handleDeleteTask = (taskId, columnId) => {
    const newTasks = { ...tasks };
    newTasks[columnId] = newTasks[columnId].filter(task => task.id !== taskId);
    setTasks(newTasks);
  };

  const openAddTaskModal = (status) => {
    setSelectedStatus(status);
    setIsStatusFixed(true);
    setIsModalOpen(true);
  };

  const openGlobalAddTaskModal = () => {
    setSelectedStatus("todo");
    setIsStatusFixed(false);
    setIsModalOpen(true);
  };

  return (
    <div className="relative flex flex-col h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-indigo-900 flex flex-col items-center py-4 z-10">
        <div className="mb-8">
          <div className="h-10 w-10 bg-indigo-500 rounded-md flex items-center justify-center text-white font-bold text-xl">
            K
          </div>
        </div>
        {[
          { icon: "plus", tooltip: "Add New" },
          { icon: "search", tooltip: "Search" },
          { icon: "menu", tooltip: "Menu" },
          { icon: "eye", tooltip: "View" },
          { icon: "chat", tooltip: "Chat" },
          { icon: "bell", tooltip: "Notifications" },
        ].map((item, index) => (
          <div
            key={index}
            className="relative group p-3 text-gray-300 hover:text-white hover:bg-indigo-800 rounded-lg mt-2 cursor-pointer transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {item.icon === "plus" && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              )}
              {item.icon === "search" && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              )}
              {item.icon === "menu" && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
              {item.icon === "eye" && (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </>
              )}
              {item.icon === "chat" && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              )}
              {item.icon === "bell" && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              )}
            </svg>
            <span className="absolute left-full ml-2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {item.tooltip}
            </span>
          </div>
        ))}
        <div className="mt-auto">
          <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center text-white font-medium border border-white/20">
            Y
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-16 flex-1 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-white shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Kanban Board</h1>
            <p className="text-gray-500 text-sm mt-1">
              Drag and drop tasks between columns
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-1 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Filter</span>
            </button>
            <button
              onClick={openGlobalAddTaskModal}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center space-x-1 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Create Task</span>
            </button>
          </div>
        </div>

        {/* Kanban Board Component */}
        <KanbanBoard 
          tasks={tasks}
          onDragEnd={handleDragEnd}
          onDeleteTask={handleDeleteTask}
          onAddColumnTask={openAddTaskModal}
        />
      </div>
      
      {/* Add Task Modal */}
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onAddTask={handleAddTask}
          initialStatus={selectedStatus}
          isStatusDisabled={isStatusFixed}
        />
      )}
    </div>
  );
};

export default Home;