import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const PricingPage = () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "$19/month",
      features: [
        "Access to basic workout plans",
        "Community support",
        "Nutrition guide",
        "Progress tracking",
        "Weekly newsletters",
      ],
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Pro Plan",
      price: "$39/month",
      features: [
        "All Basic features",
        "Customized workout plans",
        "Monthly progress tracking",
        "Access to exclusive webinars",
        "Community challenges",
      ],
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Premium Plan",
      price: "$59/month",
      features: [
        "All Pro features",
        "One-on-one coaching sessions",
        "Personalized nutrition plans",
        "Access to exclusive content",
        "Member-only events",
      ],
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Family Plan",
      price: "$99/month",
      features: [
        "All Premium features",
        "Up to 5 family members",
        "Family-focused workout plans",
        "Joint progress tracking",
        "Exclusive family wellness events",
      ],
      bgColor: "bg-pink-100",
      textColor: "text-pink-700",
      buttonColor: "bg-pink-600 hover:bg-pink-700",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow max-w-5xl mx-auto p-4 sm:p-8">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-indigo-700 mb-4 sm:mb-8">
          Choose Your Plan
        </h1>
        <p className="text-center text-base sm:text-lg text-gray-700 mb-6 sm:mb-12">
          Explore our flexible pricing options tailored for every fitness
          journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${plan.bgColor} rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300`}
            >
              <h2
                className={`text-xl sm:text-2xl font-bold ${plan.textColor} mb-2 sm:mb-4`}
              >
                {plan.title}
              </h2>
              <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                {plan.price}
              </p>
              <ul className="text-gray-700 mb-4 sm:mb-6 space-y-1 sm:space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-green-500 mr-2">✔️</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full ${plan.buttonColor} text-white py-2 rounded-md transition-colors`}
              >
                Choose {plan.title}
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-center my-4 sm:my-8 text-indigo-700">
          Compare Plans
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="py-2 sm:py-3 px-2 sm:px-4">Feature</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4">Basic</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4">Pro</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4">Premium</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4">Family</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Access to Workout Plans", "✔️", "✔️", "✔️", "✔️"],
                ["Customized Nutrition Plans", "❌", "✔️", "✔️", "✔️"],
                ["Monthly Progress Tracking", "❌", "✔️", "✔️", "✔️"],
                ["Family Sharing", "❌", "❌", "❌", "✔️"],
                ["One-on-One Coaching", "❌", "❌", "✔️", "✔️"],
                ["Access to Exclusive Webinars", "❌", "✔️", "✔️", "✔️"],
                ["Community Challenges", "❌", "✔️", "✔️", "✔️"],
                ["Member-Only Events", "❌", "❌", "✔️", "✔️"],
                ["Joint Progress Tracking", "❌", "❌", "❌", "✔️"],
                ["Personalized Nutrition Plans", "❌", "❌", "✔️", "✔️"],
              ].map((feature, index) => (
                <tr key={index} className="text-center border-b">
                  {feature.map((item, i) => (
                    <td key={i} className="py-2 sm:py-3 px-2 sm:px-4">
                      {item}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-center my-4 sm:my-8 text-indigo-700">
          What Our Users Say
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8 sm:mb-12">
          {[
            {
              quote:
                "I started with the Basic plan and have never looked back! The community support is amazing!",
              author: "Sarah Johnson",
            },
            {
              quote:
                "The Pro plan changed my fitness journey. The personalized plans are fantastic!",
              author: "Mike Adams",
            },
            {
              quote:
                "As a family, we love the Family plan! It’s great to work out together and support each other!",
              author: "Lisa and Mark Taylor",
            },
          ].map((testimonial, index) => (
            <div key={index} className="mb-4 sm:mb-6">
              <p className="italic text-gray-700">"{testimonial.quote}"</p>
              <cite className="block mt-2 font-bold text-indigo-700">
                - {testimonial.author}
              </cite>
            </div>
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-center my-4 sm:my-8 text-indigo-700">
          Frequently Asked Questions
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          {[
            {
              question: "Can I change my plan later?",
              answer:
                "Absolutely! You can upgrade or downgrade your plan at any time through your account settings.",
            },
            {
              question: "What payment methods do you accept?",
              answer:
                "We accept all major credit cards, PayPal, and bank transfers.",
            },
            {
              question: "What happens if I cancel my subscription?",
              answer:
                "You can cancel your subscription anytime. You will have access to your plan until the end of the billing cycle.",
            },
            {
              question: "Is there a money-back guarantee?",
              answer:
                "Yes! We offer a 30-day money-back guarantee if you are not satisfied with our service.",
            },
          ].map((faq, index) => (
            <div key={index} className="mb-4 sm:mb-6">
              <h3 className="font-semibold text-indigo-700">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
