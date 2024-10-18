import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MapPin,
  Play,
  Pause,
  StopCircle,
  Heart,
  Zap,
  Clock,
  Share2,
  Wind,
  Mountain,
  Bike,
  Droplet,
  Disc,
  Dumbbell,
  X,
  TrendingUp,
  Activity,
  Thermometer,
} from "lucide-react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WorkoutTracker = () => {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [heartRate, setHeartRate] = useState(70);
  const [pace, setPace] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [route, setRoute] = useState([]);

  const mapRef = useRef();
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [elevation, setElevation] = useState(0);
  const [temperature, setTemperature] = useState(20);
  const [averageSpeed, setAverageSpeed] = useState(0);

  const activities = [
    { name: "Running", icon: <MapPin size={24} />, color: "bg-red-500" },
    { name: "Cycling", icon: <Bike size={24} />, color: "bg-blue-500" },
    { name: "Swimming", icon: <Droplet size={24} />, color: "bg-cyan-500" },
    { name: "Strength", icon: <Dumbbell size={24} />, color: "bg-purple-500" },
    { name: "Yoga", icon: <Disc size={24} />, color: "bg-green-500" },
    { name: "HIIT", icon: <Zap size={24} />, color: "bg-yellow-500" },
    { name: "Walking", icon: <Wind size={24} />, color: "bg-indigo-500" },
    { name: "Hiking", icon: <Mountain size={24} />, color: "bg-orange-500" },
  ];

  const updateWorkoutStats = useCallback(() => {
    setDistance((prevDistance) => prevDistance + Math.random() * 0.01);
    setCalories((prevCalories) => prevCalories + Math.random() * 0.1);
    setHeartRate((prevHR) => Math.floor(prevHR + (Math.random() * 2 - 1)));
    setPace((prevPace) => prevPace + (Math.random() * 0.1 - 0.05));

    setWorkoutHistory((prevHistory) =>
      [...prevHistory, { time: timer, heartRate, pace, calories }].slice(-60)
    );

    if (["Running", "Cycling", "Walking", "Hiking"].includes(activeWorkout)) {
      setRoute((prevRoute) => {
        const newPoint = [
          prevRoute.length > 0
            ? prevRoute[prevRoute.length - 1][0] + (Math.random() - 0.5) * 0.001
            : 51.505,
          prevRoute.length > 0
            ? prevRoute[prevRoute.length - 1][1] + (Math.random() - 0.5) * 0.001
            : -0.09,
        ];
        return [...prevRoute, newPoint];
      });
    }

    setElevation((prev) => prev + (Math.random() * 2 - 1)); // Simulating elevation changes
    setTemperature((prev) => prev + (Math.random() * 0.5 - 0.25)); // Simulating temperature changes
    setAverageSpeed((distance / (timer / 3600)).toFixed(2)); // Calculate average speed in km/h
  }, [activeWorkout, distance, timer, heartRate, pace, calories]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        updateWorkoutStats();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, updateWorkoutStats]);

  useEffect(() => {
    if (route.length > 1 && mapRef.current) {
      const bounds = L.latLngBounds(route);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [route]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const startWorkout = (activity) => {
    setActiveWorkout(activity);
    setIsRunning(true);
    setTimer(0);
    setDistance(0);
    setCalories(0);
    setWorkoutHistory([]);
    setRoute([]);
  };

  const pauseWorkout = () => {
    setIsRunning(!isRunning);
  };

  const stopWorkout = () => {
    const workoutData = {
      id: Date.now(),
      type: activeWorkout,
      duration: timer,
      distance: distance.toFixed(2),
      calories: Math.floor(calories),
      averageHeartRate: Math.floor(
        workoutHistory.reduce((sum, data) => sum + data.heartRate, 0) /
          workoutHistory.length
      ),
      date: new Date().toLocaleString(),
    };
    setWorkouts((prev) => [...prev, workoutData]);
    setIsRunning(false);
    setActiveWorkout(null);
    setTimer(0);
    setDistance(0);
    setCalories(0);
    setWorkoutHistory([]);
    setRoute([]);
  };

  const shareWorkout = () => {
    const workoutData = {
      type: activeWorkout,
      duration: formatTime(timer),
      distance: distance.toFixed(2),
      calories: Math.floor(calories),
      route: route,
    };
    console.log("Sharing workout:", workoutData);
    alert(
      "Workout shared! (This is a placeholder for actual sharing functionality)"
    );
  };

  const chartData = {
    labels: workoutHistory.map((_, index) => -index),
    datasets: [
      {
        label: "Heart Rate",
        data: workoutHistory.map((data) => data.heartRate).reverse(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Pace",
        data: workoutHistory.map((data) => data.pace).reverse(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: true,
        tension: 0.4,
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
        text: "Workout Metrics",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Seconds Ago",
        },
        reverse: true,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  const workoutSummaryData = {
    labels: workouts.slice(-7).map((w) => w.type),
    datasets: [
      {
        label: "Calories Burned",
        data: workouts.slice(-7).map((w) => w.calories),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Duration (minutes)",
        data: workouts.slice(-7).map((w) => w.duration / 60),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const workoutSummaryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Last 7 Workouts Summary",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleWorkoutClick = (workout) => {
    const enhancedWorkout = {
      ...workout,
      route: generateRandomRoute(),
      movingAverage: (Math.random() * 5 + 10).toFixed(2),
      elevationGain: Math.floor(Math.random() * 500),
      avgPower: Math.floor(Math.random() * 200 + 100),
      avgSpeed: (Math.random() * 10 + 5).toFixed(2),
      pace: (Math.random() * 2 + 4).toFixed(2),
      heartRateData: generateRandomDataPoints(60, 60, 180),
      speedData: generateRandomDataPoints(60, 0, 30),
      elevationData: generateRandomDataPoints(60, 0, 500),
    };
    setSelectedWorkout(enhancedWorkout);
  };

  const generateRandomRoute = () => {
    const centerLat = 51.505;
    const centerLng = -0.09;
    const numPoints = 20;
    const route = [];
    for (let i = 0; i < numPoints; i++) {
      route.push([
        centerLat + (Math.random() - 0.5) * 0.05,
        centerLng + (Math.random() - 0.5) * 0.05,
      ]);
    }
    return route;
  };

  const generateRandomDataPoints = (count, min, max) => {
    return Array.from({ length: count }, () =>
      Math.floor(Math.random() * (max - min + 1) + min)
    );
  };

  const renderChart = (data, label, color) => {
    const chartData = {
      labels: Array.from({ length: data.length }, (_, i) => i),
      datasets: [
        {
          label: label,
          data: data,
          borderColor: color,
          backgroundColor: `${color}33`,
          fill: true,
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: label,
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#333",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Time",
            color: "#666",
          },
          ticks: {
            color: "#666",
          },
          grid: {
            color: "#e0e0e0",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Value",
            color: "#666",
          },
          ticks: {
            color: "#666",
          },
          grid: {
            color: "#e0e0e0",
          },
        },
      },
    };

    return (
      <div style={{ height: "250px" }}>
        <Line data={chartData} options={options} />
      </div>
    );
  };

  // Add this function to format pace
  const formatPace = (pace) => {
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <MapPin className="mr-2 text-blue-500" size={32} />
        Workout Tracker
      </h2>

      {activeWorkout ? (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Active Workout: {activeWorkout}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <Clock className="text-blue-500 mb-2" size={24} />
              <p className="text-3xl font-bold text-blue-700">
                {formatTime(timer)}
              </p>
              <p className="text-sm text-gray-600">Duration</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <MapPin className="text-green-500 mb-2" size={24} />
              <p className="text-3xl font-bold text-green-700">
                {distance.toFixed(2)} km
              </p>
              <p className="text-sm text-gray-600">Distance</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <Heart className="text-red-500 mb-2" size={24} />
              <p className="text-3xl font-bold text-red-700">{heartRate} bpm</p>
              <p className="text-sm text-gray-600">Heart Rate</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <Zap className="text-yellow-500 mb-2" size={24} />
              <p className="text-3xl font-bold text-yellow-700">
                {Math.floor(calories)}
              </p>
              <p className="text-sm text-gray-600">Calories</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-purple-100 p-4 rounded-lg">
              <TrendingUp className="text-purple-500 mb-2" size={24} />
              <p className="text-2xl font-bold text-purple-700">
                {formatPace(pace)} /km
              </p>
              <p className="text-sm text-gray-600">Pace</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-lg">
              <Wind className="text-indigo-500 mb-2" size={24} />
              <p className="text-2xl font-bold text-indigo-700">
                {averageSpeed} km/h
              </p>
              <p className="text-sm text-gray-600">Avg Speed</p>
            </div>
            <div className="bg-pink-100 p-4 rounded-lg">
              <Mountain className="text-pink-500 mb-2" size={24} />
              <p className="text-2xl font-bold text-pink-700">
                {elevation.toFixed(1)} m
              </p>
              <p className="text-sm text-gray-600">Elevation</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg">
              <Thermometer className="text-orange-500 mb-2" size={24} />
              <p className="text-2xl font-bold text-orange-700">
                {temperature.toFixed(1)}°C
              </p>
              <p className="text-sm text-gray-600">Temperature</p>
            </div>
          </div>

          {activeWorkout &&
            ["Running", "Cycling", "Walking", "Hiking"].includes(
              activeWorkout
            ) && (
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2">Route</h4>
                <div className="h-96 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[0, 0]}
                    zoom={2}
                    style={{ height: "100%", width: "100%" }}
                    ref={mapRef}
                    zoomControl={false}
                    dragging={false}
                    touchZoom={false}
                    doubleClickZoom={false}
                    scrollWheelZoom={false}
                    boxZoom={false}
                    keyboard={false}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {route.length > 1 && (
                      <>
                        <Polyline positions={route} color="red" weight={4} />
                        <Marker position={route[0]}>
                          <Popup>Start</Popup>
                        </Marker>
                        <Marker position={route[route.length - 1]}>
                          <Popup>Current</Popup>
                        </Marker>
                      </>
                    )}
                  </MapContainer>
                </div>
              </div>
            )}

          <div className="flex justify-center space-x-4">
            <button
              className={`px-6 py-3 rounded-full text-white font-semibold ${
                isRunning
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              } transition duration-300`}
              onClick={pauseWorkout}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition duration-300"
              onClick={stopWorkout}
            >
              <StopCircle size={24} />
            </button>
            <button
              className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-300"
              onClick={shareWorkout}
            >
              <Share2 size={24} />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Start a Workout
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <button
                key={activity.name}
                className={`flex flex-col items-center justify-center p-6 ${activity.color} hover:opacity-90 text-white rounded-lg transition duration-300 h-40`}
                onClick={() => startWorkout(activity.name)}
              >
                {activity.icon}
                <span className="mt-4 text-lg font-semibold">
                  {activity.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {workoutHistory.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Workout Metrics
          </h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

      {workouts.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Workout Summary
          </h3>
          <Bar data={workoutSummaryData} options={workoutSummaryOptions} />
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">
          Recent Workouts
        </h3>
        <div className="space-y-4">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
                onClick={() => handleWorkoutClick(workout)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg text-gray-800">
                    {workout.type}
                  </span>
                  <span className="text-sm text-gray-600">{workout.date}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="flex items-center">
                    <Heart size={16} className="mr-1 text-red-500" />
                    <span>{workout.averageHeartRate} bpm</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1 text-green-500" />
                    <span>{workout.distance} km</span>
                  </div>
                  <div className="flex items-center">
                    <Zap size={16} className="mr-1 text-yellow-500" />
                    <span>{workout.calories} cal</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1 text-blue-500" />
                    <span>{formatTime(workout.duration)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No recent workouts logged.</p>
          )}
        </div>
      </div>

      {selectedWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {selectedWorkout.type} Details
                </h3>
                <button
                  onClick={() => setSelectedWorkout(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="text-blue-500 mb-1" size={20} />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">
                    {formatTime(selectedWorkout.duration)}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="text-green-500 mb-1" size={20} />
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="font-semibold">{selectedWorkout.distance} km</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <Heart className="text-red-500 mb-1" size={20} />
                  <p className="text-sm text-gray-600">Avg Heart Rate</p>
                  <p className="font-semibold">
                    {selectedWorkout.averageHeartRate} bpm
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Zap className="text-yellow-500 mb-1" size={20} />
                  <p className="text-sm text-gray-600">Calories</p>
                  <p className="font-semibold">
                    {selectedWorkout.calories} cal
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Wind className="text-purple-500 mb-1" size={20} />
                  <p className="text-sm text-gray-600">Avg Speed</p>
                  <p className="font-semibold">
                    {selectedWorkout.avgSpeed} km/h
                  </p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Activity className="text-indigo-500 mb-1" size={20} />
                  <p className="text-sm text-gray-600">Pace</p>
                  <p className="font-semibold">{selectedWorkout.pace} min/km</p>
                </div>
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Mountain className="text-pink-500 mb-1" size={20} />
                  <p className="text-sm text-gray-600">Elevation Gain</p>
                  <p className="font-semibold">
                    {selectedWorkout.elevationGain} m
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <TrendingUp className="text-orange-500 mb-1" size={20} />
                  <p className="text-sm text-gray-600">Avg Power</p>
                  <p className="font-semibold">{selectedWorkout.avgPower} W</p>
                </div>
              </div>
              {selectedWorkout.route && selectedWorkout.route.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Route</h4>
                  <div className="h-64 rounded-lg overflow-hidden">
                    <MapContainer
                      bounds={L.latLngBounds(selectedWorkout.route)}
                      style={{ height: "100%", width: "100%" }}
                      zoomControl={false}
                      dragging={false}
                      touchZoom={false}
                      doubleClickZoom={false}
                      scrollWheelZoom={false}
                      boxZoom={false}
                      keyboard={false}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Polyline
                        positions={selectedWorkout.route}
                        color="red"
                        weight={4}
                      />
                      <Marker position={selectedWorkout.route[0]}>
                        <Popup>Start</Popup>
                      </Marker>
                      <Marker
                        position={
                          selectedWorkout.route[
                            selectedWorkout.route.length - 1
                          ]
                        }
                      >
                        <Popup>Finish</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-2 text-red-600">
                    Heart Rate
                  </h4>
                  {renderChart(
                    selectedWorkout.heartRateData,
                    "Heart Rate (bpm)",
                    "rgb(255, 99, 132)"
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-2 text-blue-600">
                    Speed
                  </h4>
                  {renderChart(
                    selectedWorkout.speedData,
                    "Speed (km/h)",
                    "rgb(54, 162, 235)"
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-2 text-green-600">
                    Elevation
                  </h4>
                  {renderChart(
                    selectedWorkout.elevationData,
                    "Elevation (m)",
                    "rgb(75, 192, 192)"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutTracker;
