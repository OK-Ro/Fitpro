import React, { useState, useEffect, useCallback } from "react";
import { Activity, TrendingUp, Award, Clock, MapPin } from "lucide-react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);
  const [activeMinutes, setActiveMinutes] = useState(0);
  const [goal, setGoal] = useState(10000);
  const [weeklySteps, setWeeklySteps] = useState(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date().getDay();
    return days.map((day, index) => ({
      day,
      steps: Math.floor(Math.random() * 5000) + 5000,
      calories: Math.floor(Math.random() * 300) + 200,
      isToday: index === today,
    }));
  });
  const [newGoal, setNewGoal] = useState(goal);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [notifications, setNotifications] = useState([]);

  const updateStats = useCallback(
    (newSteps) => {
      const strideLength = (height * 0.415) / 100;
      const newCalories = Math.floor((newSteps * 0.05 * weight) / 70);
      setCalories(newCalories);
      setDistance(((newSteps * strideLength) / 1000).toFixed(2));
      setActiveMinutes(Math.floor(newSteps / 100));

      // Check if the goal is reached and prevent duplicate notifications
      if (
        newSteps >= goal &&
        !notifications.includes(
          `Congratulations! You've reached your goal of ${goal} steps!`
        )
      ) {
        setNotifications((prev) => [
          ...prev,
          `Congratulations! You've reached your goal of ${goal} steps!`,
        ]);
      }
    },
    [goal, height, weight, notifications] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prevSteps) => {
        const newSteps = prevSteps + Math.floor(Math.random() * 3);
        updateStats(newSteps);

        setWeeklySteps((prev) =>
          prev.map((day) =>
            day.isToday
              ? {
                  ...day,
                  steps: newSteps,
                  calories: Math.floor((newSteps * 0.05 * weight) / 70),
                }
              : day
          )
        );

        return newSteps;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [updateStats]); // eslint-disable-line react-hooks/exhaustive-deps

  const progress = Math.min((steps / goal) * 100, 100); // Cap progress at 100%

  const handleGoalChange = (e) => {
    setNewGoal(e.target.value);
  };

  const updateGoal = () => {
    setGoal(newGoal);
    setNotifications([]); // Clear notifications when goal is updated
  };

  const resetSteps = () => {
    setSteps(0);
    setCalories(0);
    setDistance(0);
    setActiveMinutes(0);
    setNotifications([]);
  };

  const doughnutData = {
    labels: ["Steps Taken", "Steps Remaining", "Calories Burned"],
    datasets: [
      {
        data: [steps, Math.max(goal - steps, 0), calories],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const weeklyData = {
    labels: weeklySteps.map((day) => day.day),
    datasets: [
      {
        label: "Weekly Steps",
        data: weeklySteps.map((day) => day.steps),
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
      {
        label: "Weekly Calories Burned",
        data: weeklySteps.map((day) => day.calories),
        backgroundColor: "#FFCE56",
        borderColor: "#FFA500",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  // Function to determine the color based on progress percentage
  const getProgressColor = (progress) => {
    if (progress < 25) return "#FF5733"; // Bright Red
    if (progress < 50) return "#FFC300"; // Bright Yellow
    if (progress < 75) return "#FFCE56"; // Light Yellow
    return "#28A745";
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 rounded-3xl to-green-100 min-h-screen p-1">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-8xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 flex items-center justify-center text-gray-800">
          <Activity className="mr-4 text-blue-500" size={40} />
          Step Counter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="bg-blue-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Today's Steps</h3>
            <p className="text-4xl font-bold text-blue-600">{steps}</p>
            <p className="text-gray-600">Goal: {goal.toLocaleString()} steps</p>
          </div>
          <div className="bg-green-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Calories Burned</h3>
            <p className="text-4xl font-bold text-green-600">{calories}</p>
            <p className="text-gray-600">Based on activity</p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6 flex items-center text-purple-600">
            <TrendingUp className="mr-4" size={28} />
            Step Goal Progress
          </h3>
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Progress: {progress.toFixed(2)}%
            </p>
            <div className="relative w-full shadow-lg bg-gray-200 rounded-full h-12 mt-4 overflow-hidden border border-white-1000 mb-10">
              <div
                className={`absolute h-full rounded-full transition-all duration-300 ease-in-out`}
                style={{
                  width: `${progress}%`,
                  background: getProgressColor(progress), // Dynamic color based on progress
                }}
              ></div>
              <span className="absolute left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-700">
                {steps} / {goal} steps
              </span>
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-700">
                {progress.toFixed(0)}%
              </span>
            </div>
          </div>
          <Doughnut data={doughnutData} options={options} />
        </div>

        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6 flex items-center text-purple-600">
            <TrendingUp className="mr-4" size={28} />
            Weekly Steps and Calories Overview
          </h3>
          <Bar data={weeklyData} options={options} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="bg-yellow-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-yellow-600">
              <MapPin className="mr-4" size={28} />
              Distance Covered
            </h3>
            <p className="text-3xl font-semibold text-yellow-600">
              {distance} km
            </p>
          </div>
          <div className="bg-pink-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-pink-600">
              <Clock className="mr-4" size={28} />
              Active Minutes
            </h3>
            <p className="text-3xl font-semibold text-pink-600">
              {activeMinutes} min
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl shadow-lg mb-12">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-600">
            <Award className="mr-4" size={28} />
            Notifications
          </h3>
          {notifications.length > 0 ? (
            notifications.map((note, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-800 p-2 rounded mb-2"
              >
                {note}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No new notifications</p>
          )}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">User Settings</h3>
          <div className="flex items-center mb-4">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border rounded p-2 mr-4 w-full"
              placeholder="Weight (kg)"
            />
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Height (cm)"
            />
          </div>
          <div className="flex items-center">
            <input
              type="number"
              value={newGoal}
              onChange={handleGoalChange}
              className="border rounded p-2 mr-4 w-full"
              placeholder="Set new goal"
            />
            <button
              onClick={updateGoal}
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Update Goal
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={resetSteps}
              className="bg-red-500 text-white rounded px-4 py-2"
            >
              Reset Steps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCounter;
