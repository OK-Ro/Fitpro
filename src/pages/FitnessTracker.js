import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Heart,
  Moon,
  Zap,
  BarChart2,
  MapPin,
  Target,
  Bell,
  User,
  Settings,
  Video,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Dashboard from "../components/Dashboard";
import StepCounter from "../components/StepCounter";
import HeartRate from "../components/HeartRate";
import SleepTracker from "../components/SleepTracker";
import CalorieTracker from "../components/CalorieTracker";
import WorkoutTracker from "../components/WorkoutTracker";
import GoalSetting from "../components/GoalSetting";
import ClassesPage from "../components/ClassesPage";

function FitnessTracker({ setIsLoggedIn }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "steps":
        return <StepCounter />;
      case "heart":
        return <HeartRate />;
      case "sleep":
        return <SleepTracker />;
      case "calories":
        return <CalorieTracker />;
      case "workout":
        return <WorkoutTracker />;
      case "goals":
        return <GoalSetting />;
      case "classes":
        return <ClassesPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-blue-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <nav>
          <div className="text-2xl font-bold text-center mb-6">FitPro</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`block w-full text-left py-2.5 px-4 rounded transition duration-200 ${
                activeTab === item.id ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="md:hidden mr-4">
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold md:hidden">FitPro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full hover:bg-gray-200">
                <Bell size={20} />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-200">
                <User size={20} />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-200">
                <Settings size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <BarChart2 size={20} /> },
  { id: "steps", label: "Steps", icon: <Activity size={20} /> },
  { id: "heart", label: "Heart Rate", icon: <Heart size={20} /> },
  { id: "sleep", label: "Sleep", icon: <Moon size={20} /> },
  { id: "calories", label: "Calories", icon: <Zap size={20} /> },
  { id: "workout", label: "Workout", icon: <MapPin size={20} /> },
  { id: "goals", label: "Goals", icon: <Target size={20} /> },
  { id: "classes", label: "Classes", icon: <Video size={20} /> },
];

export default FitnessTracker;
