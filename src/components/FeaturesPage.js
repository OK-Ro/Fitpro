import React from "react";
import Header from "../components/Header"; // Import the Header component
import {
  FaDumbbell,
  FaHeartbeat,
  FaChartLine,
  FaUtensils,
  FaTrophy,
  FaClipboardList,
  FaUsers,
  FaChalkboardTeacher,
  FaVideo,
} from "react-icons/fa";

const features = [
  {
    icon: FaDumbbell,
    title: "Personalized Workouts",
    description:
      "Tailored workout plans based on user preferences, fitness levels, and goals.",
    implementation:
      "Input fitness goals (e.g., weight loss, muscle gain) and customize workouts accordingly.",
  },
  {
    icon: FaHeartbeat,
    title: "Health Tracking",
    description:
      "Monitor vital health metrics such as heart rate, calories burned, and hydration levels.",
    implementation:
      "Integrate a dashboard to view health stats over time with graphs and charts.",
  },
  {
    icon: FaChartLine,
    title: "Real-time Progress",
    description: "Track and display real-time progress during workouts.",
    implementation:
      "Use timers and counters for live tracking with visual feedback.",
  },
  {
    icon: FaUtensils,
    title: "Meal Planning",
    description:
      "Offer meal suggestions based on dietary preferences and fitness goals.",
    implementation:
      "Include a meal planner with recipes and nutritional information.",
  },
  {
    icon: FaTrophy,
    title: "Fitness Challenges",
    description:
      "Encourage users to participate in challenges to stay motivated.",
    implementation:
      "Create a leaderboard for competition and community engagement.",
  },
  {
    icon: FaClipboardList,
    title: "Progress Tracking",
    description: "Log progress over time to visualize improvements.",
    implementation:
      "Allow users to log workouts and body measurements with graphs.",
  },
  {
    icon: FaUsers,
    title: "Community and Support",
    description:
      "Build a community for users to share experiences and support each other.",
    implementation: "Create forums or groups for user interaction.",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Expert Guidance",
    description:
      "Provide access to certified trainers for personalized advice.",
    implementation:
      "Offer chat or video consultations with fitness professionals.",
  },
  {
    icon: FaVideo,
    title: "Workout Library",
    description: "Curate a library of workout videos and tutorials.",
    implementation: "Organize workouts by category and allow filtering.",
  },
];

const FeatureCard = ({ icon: Icon, title, description, implementation }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:shadow-xl transform hover:scale-105">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white mr-4">
          <Icon className="text-3xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-gray-500 text-sm">{implementation}</p>
    </div>
  );
};

const FeaturesPage = () => {
  return (
    <>
      <Header isLoggedIn={false} /> {/* Include the Header component */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
              Explore Our Fitness Features
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Discover the innovative features designed to help you achieve your
              fitness goals and maintain a healthy lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Fitness Journey?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Join us today and unlock your full potential with our comprehensive
            fitness solutions.
          </p>
          <a
            href="/signup"
            className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </section>
    </>
  );
};

export default FeaturesPage;
