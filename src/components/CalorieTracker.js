import React, { useState, useEffect, useCallback } from "react";
import {
  Zap,
  Utensils,
  FireExtinguisher,
  TrendingUp,
  Scale,
} from "lucide-react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const CalorieTracker = () => {
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [weight, setWeight] = useState(70);
  const [calorieHistory, setCalorieHistory] = useState([]);

  const updateCalorieHistory = useCallback(() => {
    setCalorieHistory((prev) => {
      const newHistory = [...prev, caloriesConsumed - caloriesBurned];
      return newHistory.slice(-7);
    });
  }, [caloriesConsumed, caloriesBurned]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaloriesConsumed((prev) => prev + Math.floor(Math.random() * 50));
      setCaloriesBurned((prev) => prev + Math.floor(Math.random() * 30));
      updateCalorieHistory();
    }, 3000);

    return () => clearInterval(interval);
  }, [updateCalorieHistory]);

  const remainingCalories = calorieGoal - (caloriesConsumed - caloriesBurned);

  const doughnutData = {
    labels: ["Consumed", "Burned", "Remaining"],
    datasets: [
      {
        data: [caloriesConsumed, caloriesBurned, remainingCalories],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const lineData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Today"],
    datasets: [
      {
        label: "Net Calories",
        data: calorieHistory,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-48l mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Zap className="mr-2 text-yellow-500" size={28} />
        Calorie Tracker
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <Doughnut data={doughnutData} />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center">
              <Utensils className="mr-2 text-red-500" size={20} />
              Consumed:
            </span>
            <span className="font-bold">{caloriesConsumed} cal</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center">
              <FireExtinguisher className="mr-2 text-blue-500" size={20} />
              Burned:
            </span>
            <span className="font-bold">{caloriesBurned} cal</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center">
              <Zap className="mr-2 text-yellow-500" size={20} />
              Remaining:
            </span>
            <span className="font-bold">{remainingCalories} cal</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <TrendingUp className="mr-2 text-green-500" size={20} />
          Calorie Trend (Last 7 Days)
        </h3>
        <Line data={lineData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Zap className="mr-2 text-yellow-500" size={20} />
            Daily Calorie Goal
          </h3>
          <input
            type="number"
            value={calorieGoal}
            onChange={(e) => setCalorieGoal(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Scale className="mr-2 text-purple-500" size={20} />
            Current Weight (kg)
          </h3>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default CalorieTracker;
