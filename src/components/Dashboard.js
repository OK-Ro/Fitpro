import React, { useState, useEffect } from "react";
import { Activity, Heart, Moon, Zap, Droplet, Trophy } from "lucide-react";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const cards = [
    {
      icon: Activity,
      title: "Steps",
      value: "8,234",
      goal: "10,000",
      color: "bg-green-500",
      progress: 82,
    },
    {
      icon: Heart,
      title: "Heart Rate",
      value: "72 bpm",
      goal: "60-100 bpm",
      color: "bg-red-500",
      progress: 72,
    },
    {
      icon: Moon,
      title: "Sleep",
      value: "7h 23m",
      goal: "8h",
      color: "bg-blue-500",
      progress: 92,
    },
    {
      icon: Zap,
      title: "Calories",
      value: "1,840",
      goal: "2,200",
      color: "bg-yellow-500",
      progress: 84,
    },
    {
      icon: Droplet,
      title: "Water",
      value: "1.5L",
      goal: "2L",
      color: "bg-cyan-500",
      progress: 75,
    },
    {
      icon: Trophy,
      title: "Achievements",
      value: "3",
      goal: "5",
      color: "bg-purple-500",
      progress: 60,
    },
  ];

  return (
    <div className="dashboard-container space-y-6 p-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
        <p className="text-xl">
          {currentTime.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 relative"
          >
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-full ${card.color} text-white mr-4`}>
                <card.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
            </div>
            <p className="text-3xl font-bold mb-2">{card.value}</p>
            <p className="text-sm text-gray-600 mb-2">Goal: {card.goal}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${card.color}`}
                style={{ width: `${card.progress}%` }}
              ></div>
            </div>
            <span className="absolute right-4 top-4 text-sm font-semibold text-gray-700">
              {card.progress}%
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Daily Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Steps</h3>
            <p className="text-xl font-bold">8,234</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Calories Burned</h3>
            <p className="text-xl font-bold">1,840 cal</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Water Intake</h3>
            <p className="text-xl font-bold">1.5L</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
