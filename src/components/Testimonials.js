import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonialsData = [
  {
    name: "Sarah L.",
    testimony:
      "I've tried countless fitness apps, but this one is a game-changer. The personalized workout plans keep me motivated, and I love the real-time feedback from my virtual coach.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "James R.",
    testimony:
      "The meal plans are fantastic! I finally have a diet that fits my lifestyle and helps me reach my goals. Plus, tracking my progress is so easy with the app's intuitive interface.",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Michael B.",
    testimony:
      "As a busy professional, I needed a fitness app that could adapt to my schedule. The flexible workout plans are easy to follow and fit perfectly into my life. Highly recommend!",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Emily K.",
    testimony:
      "This app transformed how I approach fitness. The community support is amazing, and the challenges keep me engaged. I've never felt more motivated to stay on track with my health goals!",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Laura T.",
    testimony:
      "FitPro has completely changed my fitness journey. The app's features are user-friendly, and I love the variety of workouts available!",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
  },
  {
    name: "David M.",
    testimony:
      "I appreciate how the app tracks my progress over time. It keeps me accountable and motivated to reach my fitness goals.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Jessica P.",
    testimony:
      "The community aspect of FitPro is fantastic! I've made friends and found workout buddies through the app.",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Chris W.",
    testimony:
      "I love the nutrition tracking feature! It helps me stay on top of my diet and make healthier choices.",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-50 p-10 rounded-lg max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        What Our Happy Users Say
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {testimonial.name}
              </h3>
            </div>
            <p className="text-gray-600 italic">
              <FaQuoteLeft className="inline text-gray-400 mr-2" />
              {testimonial.testimony}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
