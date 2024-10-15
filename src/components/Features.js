import React, { useState } from "react";
import {
  FaChartLine,
  FaUserFriends,
  FaClipboardList,
  FaDumbbell,
  FaAppleAlt,
  FaBed,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    icon: FaChartLine,
    title: "Progress Tracking",
    description:
      "Visualize your fitness journey with detailed analytics and insights.",
    bgColor: "bg-blue-400",
  },
  {
    icon: FaUserFriends,
    title: "Community Support",
    description:
      "Connect with fitness enthusiasts for motivation and shared experiences.",
    bgColor: "bg-green-400",
  },
  {
    icon: FaClipboardList,
    title: "Goal Setting",
    description:
      "Set, track, and achieve your personalized fitness objectives.",
    bgColor: "bg-yellow-400",
  },
  {
    icon: FaDumbbell,
    title: "Workout Plans",
    description:
      "Access customized workout routines tailored to your fitness level.",
    bgColor: "bg-red-400",
  },
  {
    icon: FaAppleAlt,
    title: "Nutrition Tracking",
    description:
      "Log and analyze your daily nutrition intake for a balanced diet.",
    bgColor: "bg-purple-400",
  },
  {
    icon: FaBed,
    title: "Sleep Analysis",
    description:
      "Monitor your sleep patterns to optimize recovery and performance.",
    bgColor: "bg-pink-400",
  },
];

const FeatureCard = ({ icon: Icon, title, description, bgColor }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="p-8 flex items-start">
      {" "}
      {/* Align items at the start */}
      <div
        className={`flex items-center justify-center w-20 h-15 ${bgColor} text-white mr-4 rounded-lg p-5`}
      >
        <Icon className="text-2xl" />
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-400 text-left">{description}</p>
      </div>
    </div>
  </div>
);

const Features = () => {
  const [showAll, setShowAll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const displayedFeatures = showAll ? features : features.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Powerful Features to Elevate Your Fitness
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools is designed to support every aspect
            of your health and wellness journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
      <div className="mt-20 text-center">
        <button
          className={`
            group relative inline-flex items-center justify-center px-8 py-3 
            text-lg font-bold text-white transition-all duration-300 ease-in-out
            bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full
            overflow-hidden shadow-md hover:shadow-lg
            ${isHovered ? "pl-12 pr-8" : "px-10"}
          `}
          onClick={() => setShowAll(!showAll)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="relative z-10">
            {showAll ? "Show Less" : "Explore All Features"}
          </span>
          <FaArrowRight
            className={`
              absolute right-4 text-white transition-all duration-300 ease-in-out
              transform group-hover:translate-x-1
              ${isHovered ? "opacity-100" : "opacity-0"}
            `}
          />
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
        </button>
      </div>
    </section>
  );
};

export default Features;
