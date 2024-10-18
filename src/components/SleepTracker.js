import React, { useState, useEffect } from "react";
import { Moon, Clock, Zap, TrendingUp, AlertCircle } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState([]);
  const [sleepScore, setSleepScore] = useState(0);
  const [sleepDuration, setSleepDuration] = useState(0);
  const [sleepQuality, setSleepQuality] = useState("");
  const [sleepStages, setSleepStages] = useState({ light: 0, deep: 0, rem: 0 });
  const [heartRate, setHeartRate] = useState(0);
  const [hrv, setHrv] = useState(0);

  useEffect(() => {
    const generateSleepData = () => {
      const data = [];
      for (let i = 0; i < 7; i++) {
        data.push({
          date: new Date(
            Date.now() - i * 24 * 60 * 60 * 1000
          ).toLocaleDateString(),
          duration: 6 + Math.random() * 3,
          quality: Math.floor(Math.random() * 100),
          stages: {
            light: Math.random() * 60,
            deep: Math.random() * 30,
            rem: Math.random() * 30,
          },
          heartRate: 50 + Math.random() * 20,
          hrv: 40 + Math.random() * 30,
        });
      }
      setSleepData(data.reverse());
    };

    generateSleepData();
    const interval = setInterval(generateSleepData, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sleepData.length > 0) {
      const lastNight = sleepData[sleepData.length - 1];
      setSleepDuration(lastNight.duration);
      setSleepQuality(
        lastNight.quality >= 80
          ? "Excellent"
          : lastNight.quality >= 60
          ? "Good"
          : "Poor"
      );
      setSleepStages(lastNight.stages);
      setHeartRate(lastNight.heartRate);
      setHrv(lastNight.hrv);
      setSleepScore(
        Math.floor((lastNight.quality + (lastNight.duration / 9) * 100) / 2)
      );
    }
  }, [sleepData]);

  const chartData = {
    labels: sleepData.map((d) => d.date),
    datasets: [
      {
        label: "Sleep Duration",
        data: sleepData.map((d) => d.duration),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Sleep Quality",
        data: sleepData.map((d) => d.quality),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sleep Trends",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Hours / Quality Score",
        },
      },
    },
  };

  return (
    <div className="bg-gray-50 white rounded-3xl min-h-screen p-1">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-8xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 flex items-center justify-center text-gray-800">
          <Moon className="mr-4 text-blue-500" size={40} />
          Sleep Tracker
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="bg-blue-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Last Night's Sleep</h3>
            <p className="text-4xl font-bold text-blue-600">
              {sleepDuration.toFixed(1)} hours
            </p>
            <p className="text-gray-600">Quality: {sleepQuality}</p>
          </div>
          <div className="bg-green-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Sleep Score</h3>
            <p className="text-4xl font-bold text-green-600">{sleepScore}</p>
            <p className="text-gray-600">Based on duration and quality</p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6 flex items-center text-purple-600">
            <Clock className="mr-4" size={28} />
            Sleep Stages
          </h3>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-3xl font-semibold text-purple-600">
                {sleepStages.light.toFixed(1)}%
              </p>
              <p className="text-gray-600">Light Sleep</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-indigo-600">
                {sleepStages.deep.toFixed(1)}%
              </p>
              <p className="text-gray-600">Deep Sleep</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-blue-600">
                {sleepStages.rem.toFixed(1)}%
              </p>
              <p className="text-gray-600">REM Sleep</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="bg-red-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-red-600">
              <Zap className="mr-4" size={28} />
              Average Heart Rate
            </h3>
            <p className="text-3xl font-semibold text-red-600">
              {heartRate.toFixed(1)} bpm
            </p>
          </div>
          <div className="bg-orange-100 p-8 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-orange-600">
              <TrendingUp className="mr-4" size={28} />
              Heart Rate Variability
            </h3>
            <p className="text-3xl font-semibold text-orange-600">
              {hrv.toFixed(1)} ms
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6 flex items-center text-green-600">
            <TrendingUp className="mr-4" size={28} />
            Sleep Trends
          </h3>
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="bg-yellow-100 p-8 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-yellow-600">
            <AlertCircle className="mr-4" size={28} />
            Sleep Insights
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Your sleep duration is slightly below the recommended 7-9 hours.
            </li>
            <li>
              Your deep sleep percentage is good, contributing to physical
              recovery.
            </li>
            <li>
              Consider going to bed 30 minutes earlier to improve overall sleep
              duration.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SleepTracker;
