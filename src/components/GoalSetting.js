import React, { useState, useEffect } from "react";
import {
  Target,
  Plus,
  X,
  AlertCircle,
  Activity,
  Zap,
  Clock,
  Moon,
  Droplet,
  Award,
  TrendingUp,
} from "lucide-react";

const GoalSetting = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      description: "Walk 10,000 steps daily",
      completed: false,
      type: "steps",
      target: 10000,
      current: 0,
    },
    {
      id: 2,
      description: "Exercise 30 minutes, 5 days a week",
      completed: false,
      type: "duration",
      target: 30 * 60 * 5,
      current: 0,
    },
    {
      id: 3,
      description: "Burn 2000 calories weekly",
      completed: false,
      type: "calories",
      target: 2000,
      current: 0,
    },
    {
      id: 4,
      description: "Sleep 8 hours nightly",
      completed: false,
      type: "sleep",
      target: 8 * 60,
      current: 0,
    },
    {
      id: 5,
      description: "Drink 2L of water daily",
      completed: false,
      type: "water",
      target: 2000,
      current: 0,
    },
  ]);
  const [newGoal, setNewGoal] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateGoalProgress();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateGoalProgress = () => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        let progress;
        switch (goal.type) {
          case "steps":
            progress = Math.floor(Math.random() * 1000);
            break;
          case "duration":
            progress = Math.floor(Math.random() * 10 * 60);
            break;
          case "calories":
            progress = Math.floor(Math.random() * 200);
            break;
          case "sleep":
            progress = Math.floor(Math.random() * 30);
            break;
          case "water":
            progress = Math.floor(Math.random() * 250);
            break;
          default:
            progress = 0;
        }

        const newCurrent = Math.min(goal.current + progress, goal.target);
        const completed = newCurrent >= goal.target;

        if (completed && !goal.completed) {
          setNotifications((prev) => [
            ...prev,
            `Congratulations! You've reached your goal: ${goal.description}`,
          ]);
          setAchievements((prev) => [
            ...prev,
            { goal: goal.description, date: new Date().toLocaleDateString() },
          ]);
        }

        return { ...goal, current: newCurrent, completed };
      })
    );
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals((prev) => [
        ...prev,
        {
          id: Date.now(),
          description: newGoal,
          completed: false,
          type: "custom",
          target: 100,
          current: 0,
        },
      ]);
      setNewGoal("");
    }
  };

  const removeGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const getGoalIcon = (type) => {
    switch (type) {
      case "steps":
        return <Activity />;
      case "duration":
        return <Clock />;
      case "calories":
        return <Zap />;
      case "sleep":
        return <Moon />;
      case "water":
        return <Droplet />;
      default:
        return <Target />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Target className="mr-2 text-blue-500" size={28} />
        Goal Setting
      </h2>

      <form onSubmit={handleAddGoal} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter a new goal"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-200"
          >
            <Plus size={24} />
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {getGoalIcon(goal.type)}
                <span className="ml-2 font-semibold">{goal.description}</span>
              </div>
              <button
                onClick={() => removeGoal(goal.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
              <div className="ml-4 text-right">
                <p className="text-sm text-gray-600">Progress</p>
                <p className="font-semibold">
                  {Math.round((goal.current / goal.target) * 100)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length > 0 && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 p-4">
          <div className="flex items-center">
            <AlertCircle className="text-green-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold text-green-700">
              Notifications
            </h3>
          </div>
          <ul className="mt-2 list-disc list-inside">
            {notifications.map((notification, index) => (
              <li key={index} className="text-green-700">
                {notification}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Award className="mr-2 text-yellow-500" size={24} />
          Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-yellow-100 p-3 rounded-lg">
              <p className="font-semibold">{achievement.goal}</p>
              <p className="text-sm text-gray-600">
                Achieved on: {achievement.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <TrendingUp className="mr-2 text-blue-500" size={24} />
          Goal Insights
        </h3>
        <ul className="list-disc list-inside text-blue-700">
          <li>
            You're consistently meeting your step goals. Consider increasing
            your daily target!
          </li>
          <li>Your sleep patterns have improved. Keep up the good work!</li>
          <li>
            Try to increase your water intake to meet your hydration goals more
            often.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GoalSetting;
