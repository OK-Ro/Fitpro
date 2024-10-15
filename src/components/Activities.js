import React, { useState } from "react";
import {
  FaRunning,
  FaBicycle,
  FaWalking,
  FaSwimmer,
  FaHiking,
  FaDumbbell,
  FaBasketballBall,
  FaTableTennis,
  FaUserMd,
  FaWater,
  FaSnowboarding,
  FaMountain,
} from "react-icons/fa";

const allActivities = [
  {
    icon: FaRunning,
    title: "Running",
    description: "Track your running sessions and improve your speed.",
  },
  {
    icon: FaBicycle,
    title: "Cycling",
    description: "Monitor your cycling routes and performance.",
  },
  {
    icon: FaWalking,
    title: "Walking",
    description: "Keep track of your daily steps and walking distance.",
  },
  {
    icon: FaSwimmer,
    title: "Swimming",
    description: "Log your swimming laps and improve your technique.",
  },
  {
    icon: FaHiking,
    title: "Hiking",
    description: "Explore nature trails and track your elevation gain.",
  },
  {
    icon: FaDumbbell,
    title: "Strength Training",
    description: "Monitor your weightlifting progress and form.",
  },

  {
    icon: FaBasketballBall,
    title: "Basketball",
    description: "Track your game stats and improve your skills.",
  },
  {
    icon: FaTableTennis,
    title: "Table Tennis",
    description: "Monitor your matches and enhance your technique.",
  },

  {
    icon: FaUserMd,
    title: "Yoga",
    description: "Enhance your flexibility and mindfulness through yoga.",
  },
  {
    icon: FaWater,
    title: "Surfing",
    description: "Ride the waves and improve your balance and strength.",
  },
  {
    icon: FaSnowboarding,
    title: "Skating",
    description: "Enjoy skating while improving your coordination and agility.",
  },
  {
    icon: FaMountain,
    title: "Rock Climbing",
    description:
      "Challenge yourself with rock climbing and improve your strength.",
  },
];

const ActivityCard = ({ icon: Icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative p-6 rounded-lg transition-all duration-300 ease-in-out
        ${
          index % 2 === 0
            ? "bg-gradient-to-br from-purple-500 to-indigo-600"
            : "bg-gradient-to-br from-blue-500 to-teal-400"
        }
        ${isHovered ? "scale-105 shadow-xl" : "shadow-md"}
        transform hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-bl-full"></div>
      <Icon className="text-4xl text-white mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white text-opacity-90">{description}</p>
    </div>
  );
};

const Activities = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedActivities = showAll
    ? allActivities
    : allActivities.slice(0, 6);

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Explore Your Fitness Activities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover a wide range of activities to boost your fitness journey
            and achieve your health goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedActivities.map((activity, index) => (
            <ActivityCard key={index} {...activity} index={index} />
          ))}
        </div>
      </div>
      <div className="mt-20 text-center">
        <button
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All Activities"}
        </button>
      </div>
    </section>
  );
};

export default Activities;
