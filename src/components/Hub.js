import React from "react";
import { FaRunning, FaChartLine, FaUsers } from "react-icons/fa";

const Hub = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-20 rounded-lg ">
      <div className="md:w-4/2 mb-8 md:mb-0">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Hub For more intelligent daily workouts
        </h1>
        <p className="text-md text-gray-600 mb-6">
          Discover personalized fitness solutions, track your progress, and
          connect with a community of enthusiasts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col items-center text-white">
            <div className="text-6xl mb-4">
              <FaRunning />
            </div>
            <h3 className="text-xl font-semibold mb-2">Daily Workouts</h3>
            <p className="text-center">
              Get personalized workout plans tailored to your fitness level.
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col items-center text-white">
            <div className="text-6xl mb-4">
              <FaChartLine />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-center">
              Monitor your progress with detailed analytics and insights.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col items-center text-white">
            <div className="text-6xl mb-4">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-center">
              Join a vibrant community for motivation and encouragement.
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src="https://fitnessview.app/images/FitnessView.png"
          alt="Hub Illustration"
          className="w-3/4 h-auto rounded-lg transform transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Hub;
