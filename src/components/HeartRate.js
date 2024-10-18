import React, { useState, useEffect, useCallback } from "react";
import { Heart, Activity, TrendingUp, AlertTriangle, Zap } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HeartRate = () => {
  const [heartRate, setHeartRate] = useState(70);
  const [heartRateZone, setHeartRateZone] = useState("Resting");
  const [heartRateHistory, setHeartRateHistory] = useState([]);
  const [activeHeartRate, setActiveHeartRate] = useState(0);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [hrv, setHrv] = useState(50);
  const [stressLevel, setStressLevel] = useState("Low");

  const updateStressLevel = useCallback(() => {
    if (hrv > 60) setStressLevel("Low");
    else if (hrv > 40) setStressLevel("Moderate");
    else setStressLevel("High");
  }, [hrv]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRate = 70 + Math.floor(Math.random() * 80);
      setHeartRate(newRate);
      updateHeartRateZone(newRate);
      setHeartRateHistory((prev) => [...prev.slice(-59), newRate]);
      setSteps((prev) => prev + Math.floor(Math.random() * 5));
      setActiveHeartRate(Math.max(activeHeartRate, newRate));
      setCalories((prev) => prev + Math.floor(Math.random() * 2));
      setHrv(50 + Math.floor(Math.random() * 20));
      updateStressLevel();
    }, 1000);

    return () => clearInterval(interval);
  }, [activeHeartRate, updateStressLevel]);

  const updateHeartRateZone = (rate) => {
    if (rate < 100) setHeartRateZone("Resting");
    else if (rate < 120) setHeartRateZone("Fat Burning");
    else if (rate < 140) setHeartRateZone("Cardio");
    else setHeartRateZone("Peak");
  };

  const chartData = {
    labels: Array.from({ length: 60 }, (_, i) => i),
    datasets: [
      {
        label: "Heart Rate",
        data: heartRateHistory,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4B5563",
        },
      },
      title: {
        display: true,
        text: "Heart Rate Over Time",
        color: "#1F2937",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "BPM",
          color: "#4B5563",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        title: {
          display: true,
          text: "Seconds Ago",
          color: "#4B5563",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-3xl min-h-screen p-1">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-8xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 flex items-center justify-center text-gray-800">
          <Heart className="mr-4 text-red-500 animate-pulse" size={40} />
          Heart Rate Monitor
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="bg-red-100 p-8 rounded-2xl shadow-lg">
            <p className="text-7xl font-extrabold text-red-700">{heartRate}</p>
            <p className="text-gray-600 mt-4">Current BPM</p>
            <p className="mt-6 text-2xl font-semibold">Zone: {heartRateZone}</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-100 p-6 rounded-2xl shadow-lg">
              <p className="text-4xl font-semibold text-blue-700">60</p>
              <p className="text-gray-600">Resting HR</p>
            </div>
            <div className="bg-green-100 p-6 rounded-2xl shadow-lg">
              <p className="text-4xl font-semibold text-green-700">
                {activeHeartRate}
              </p>
              <p className="text-gray-600">Active HR</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-2xl shadow-lg">
              <p className="text-4xl font-semibold text-yellow-700">{steps}</p>
              <p className="text-gray-600">Steps</p>
            </div>
            <div className="bg-purple-100 p-6 rounded-2xl shadow-lg">
              <p className="text-4xl font-semibold text-purple-700">
                {calories}
              </p>
              <p className="text-gray-600">Calories</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center text-blue-600">
            <Activity className="mr-4" size={28} />
            Heart Rate Zones
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Resting", "Fat Burning", "Cardio", "Peak"].map((zone) => (
              <div
                key={zone}
                className={`p-4 rounded-2xl text-center font-medium transition-all duration-300 ${
                  heartRateZone === zone
                    ? "bg-blue-600 text-white transform scale-105"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {zone}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center text-green-600">
            <TrendingUp className="mr-4" size={28} />
            Heart Rate Trend
          </h3>
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="bg-indigo-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-indigo-600">
              <Zap className="mr-4" size={28} />
              Heart Rate Variability (HRV)
            </h3>
            <p className="text-4xl font-semibold text-indigo-700">{hrv} ms</p>
            <p className="text-gray-600 mt-4">
              Higher HRV indicates better cardiovascular fitness
            </p>
          </div>
          <div className="bg-orange-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-orange-600">
              <AlertTriangle className="mr-4" size={28} />
              Stress Level
            </h3>
            <p className="text-4xl font-semibold text-orange-700">
              {stressLevel}
            </p>
            <p className="text-gray-600 mt-4">
              Based on HRV and heart rate patterns
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Insights</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Your resting heart rate is within a healthy range.</li>
            <li>You've spent 15 minutes in the fat-burning zone today.</li>
            <li>
              Your stress level is {stressLevel.toLowerCase()}. Consider some
              relaxation exercises if it's high.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeartRate;
