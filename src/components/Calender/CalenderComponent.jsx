import React, { useState, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
} from "lucide-react";
import EventModal from "./EventModal";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      start: new Date(2025, 2, 14, 10, 0),
      end: new Date(2025, 2, 14, 11, 30),
      category: "work",
    },
    {
      id: 2,
      title: "Project Review",
      start: new Date(2025, 2, 21, 14, 0),
      end: new Date(2025, 2, 21, 15, 0),
      category: "important",
    },
    {
      id: 3,
      title: "Client Call",
      start: new Date(2025, 2, 7, 9, 0),
      end: new Date(2025, 2, 7, 10, 0),
      category: "meeting",
    },
  ]);

  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date(2025, 2, 14));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleNavigate = useCallback((newDate) => {
    setDate(newDate);
  }, []);

  const handleViewChange = useCallback((newView) => {
    setView(newView);
  }, []);

  const handleSelect = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    setEvents((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...eventData
      },
    ]);
  };

  const eventStyleGetter = (event) => {
    const style = {
      borderRadius: "4px",
      border: "none",
      padding: "2px 5px",
      fontSize: "0.85rem",
      fontWeight: "500",
      color: "white",
    };

    const categoryStyles = {
      work: { backgroundColor: "#3B82F6" },
      important: { backgroundColor: "#EF4444" },
      meeting: { backgroundColor: "#10B981" },
      default: { backgroundColor: "#8B5CF6" },
    };

    return {
      style: { ...style, ...categoryStyles[event.category] },
    };
  };

  const CustomToolbar = () => {
    const goToToday = () => {
      const today = new Date();
      setDate(today);
    };

    const goToPrevious = () => {
      let newDate;
      switch (view) {
        case "month":
          newDate = moment(date).subtract(1, "month").toDate();
          break;
        case "week":
          newDate = moment(date).subtract(1, "week").toDate();
          break;
        case "day":
          newDate = moment(date).subtract(1, "day").toDate();
          break;
      }
      setDate(newDate);
    };

    const goToNext = () => {
      let newDate;
      switch (view) {
        case "month":
          newDate = moment(date).add(1, "month").toDate();
          break;
        case "week":
          newDate = moment(date).add(1, "week").toDate();
          break;
        case "day":
          newDate = moment(date).add(1, "day").toDate();
          break;
      }
      setDate(newDate);
    };

    return (
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
        <div className="flex items-center mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">
            {moment(date).format(view === "day" ? "MMMM D, YYYY" : "MMMM YYYY")}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <button
            onClick={goToToday}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Today
          </button>

          <div className="flex bg-gray-100 rounded-lg p-1">
            {["day", "week", "month"].map((viewOption) => (
              <button
                key={viewOption}
                onClick={() => handleViewChange(viewOption)}
                className={`px-3 py-1 text-sm rounded-md transition-colors capitalize ${
                  view === viewOption
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                }`}
              >
                {viewOption}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors ml-2"
          >
            <Plus className="w-4 h-4 mr-1" />
            Schedule
          </button>
        </div>
      </div>
    );
  };

  const dayPropGetter = (date) => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    return {
      className: isToday ? "bg-blue-50" : "",
      style: { border: "1px solid #ddd" },
    };
  };

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .rbc-calendar {
        font-family: ui-sans-serif, system-ui, sans-serif;
      }
      .rbc-header {
        padding: 12px 3px;
        font-weight: 600;
        font-size: 0.875rem;
        background-color: #f9fafb;
        border-bottom: 1px solid #e5e7eb;
      }
      .rbc-date-cell {
        padding: 4px;
        font-size: 0.875rem;
        font-weight: 500;
      }
      .rbc-today {
        background-color: #eff6ff;
      }
      .rbc-off-range-bg {
        background-color: #f9fafb;
      }
      .rbc-event {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={(event) =>
          alert(`${event.title}\nCategory: ${event.category}`)
        }
        view={view}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        components={{ toolbar: CustomToolbar }}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        className="min-h-screen"
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSlot(null);
        }}
        onSave={handleSaveEvent}
        initialStart={selectedSlot?.start || new Date()}
        initialEnd={selectedSlot?.end || new Date()}
      />
    </div>
  );
};

export default CalendarComponent;