import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const KanbanBoard = ({ tasks, onDragEnd, onDeleteTask, onAddColumnTask }) => {
  const renderBoard = () => {
    try {
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex p-6 gap-6 overflow-x-auto h-[calc(100vh-120px)]">
            {[
              {
                id: "todo",
                title: "To Do",
                color: "bg-blue-50",
                border: "border-blue-300",
                badge: "bg-blue-100 text-blue-800",
              },
              {
                id: "inProgress",
                title: "In Progress",
                color: "bg-amber-50",
                border: "border-amber-300",
                badge: "bg-amber-100 text-amber-800",
              },
              {
                id: "onReview",
                title: "On Review",
                color: "bg-red-50",
                border: "border-red-300",
                badge: "bg-red-100 text-red-800",
              },
              {
                id: "done",
                title: "Done",
                color: "bg-green-50",
                border: "border-green-300",
                badge: "bg-green-100 text-green-800",
              },
            ].map((column) => (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`w-80 flex-shrink-0 ${column.color} rounded-lg shadow-sm border ${column.border} flex flex-col`}
                  >
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <div className="flex items-center">
                        <h2 className="text-lg font-semibold text-gray-800">
                          {column.title}
                        </h2>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${column.badge}`}
                        >
                          {(tasks[column.id] || []).length}
                        </span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                      {Array.isArray(tasks[column.id]) &&
                        tasks[column.id].map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-3 bg-white rounded-lg shadow border border-gray-200 ${
                                  snapshot.isDragging
                                    ? "ring-2 ring-indigo-400"
                                    : ""
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <p className="text-gray-800">
                                    {task.content}
                                  </p>
                                  <div className="flex">
                                    <button
                                      onClick={() =>
                                        onDeleteTask(task.id, column.id)
                                      }
                                      className="text-gray-400 hover:text-red-600 ml-2 -mt-1"
                                      title="Delete task"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                  <div className="flex space-x-1">
                                    <span className="inline-block h-2 w-2 rounded-full bg-indigo-500"></span>
                                    <span className="text-xs text-gray-500">
                                      {task.category || "Uncategorized"}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                      {task.creationDate
                                        ? new Date(
                                            task.creationDate
                                          ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                          })
                                        : "No date"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                      <button
                        onClick={() => onAddColumnTask(column.id)}
                        className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Task
                      </button>
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      );
    } catch (error) {
      console.error("Error rendering kanban board:", error);
      return (
        <div className="flex items-center justify-center h-[calc(100vh-120px)]">
          <div className="bg-red-50 border border-red-300 text-red-800 p-4 rounded-lg max-w-md">
            <h3 className="font-bold text-lg mb-2">
              Error loading kanban board
            </h3>
            <p>{error.message}</p>
            <button
              onClick={() => {
                localStorage.removeItem("kanbanTasks");
                window.location.reload();
              }}
              className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md"
            >
              Reset board data
            </button>
          </div>
        </div>
      );
    }
  };

  return renderBoard();
};

export default KanbanBoard;
