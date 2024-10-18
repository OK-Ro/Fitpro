import React from "react";
import { Link } from "react-router-dom";
import { FaRunning, FaHeart, FaBolt } from "react-icons/fa";

const Button = ({ children, className, size, variant }) => {
  const baseClass = "px-4 py-2 rounded-md font-medium transition-colors";
  const sizeClass = size === "lg" ? "text-lg" : "text-base";
  const variantClass =
    variant === "outline"
      ? "bg-transparent border border-white text-white hover:bg-white hover:text-blue-500"
      : "bg-white text-blue-500 hover:bg-blue-100";

  return (
    <button
      className={`${baseClass} ${sizeClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-500 to-green-500 py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="flex flex-col justify-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Your One-Stop Health and Fitness Buddy
            </h1>
            <p className="text-xl text-white">
              Track daily routines, assess health, and experiment with training
              plans tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="group shadow-lg transform transition-transform duration-300 hover:scale-105"
                >
                  Get Started
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </div>
            <div className="flex gap-8">
              {[
                { icon: FaRunning, text: "Personalized Workouts" },
                { icon: FaHeart, text: "Health Tracking" },
                { icon: FaBolt, text: "Real-time Progress" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 text-white" />
                  <span className="text-sm font-medium text-white">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-green-600 opacity-20 blur-3xl" />
            <img
              src="https://cdn.dribbble.com/users/2455317/screenshots/19456745/fitness_app_4x.jpg"
              alt="Fitness App Mockup"
              className="relative z-10 w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
