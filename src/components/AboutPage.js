import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-8 max-w-5xl mx-auto font-sans">
        <h1 className="text-center text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          About FitPro
        </h1>

        <section className="mb-12 p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 border-b-4 border-indigo-700 inline-block">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            At FitPro, we are dedicated to empowering individuals to achieve
            their fitness goals. Our mission is to create a welcoming space
            where everyone can experience the transformative power of
            fitness—regardless of their starting point.
          </p>
          <img
            src="https://www.perio.org/wp-content/uploads/2021/07/mission-vision.jpg"
            alt="Empowering fitness"
            className="w-full max-h-64 object-cover rounded-xl mb-6"
          />
        </section>

        <section className="mb-12 p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 border-b-4 border-indigo-700 inline-block">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Born from a passion for fitness and technology, FitPro was founded
            by a diverse group of fitness enthusiasts and tech innovators. We
            aim to bridge the gap between physical wellness and digital
            solutions, providing personalized workout plans, nutrition guidance,
            and a supportive community that inspires you to thrive.
          </p>
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="FitPro founders"
            className="w-full max-h-64 object-cover rounded-xl mb-6"
          />
        </section>

        <section className="mb-12 p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600 border-b-4 border-indigo-700 inline-block">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Co-Founder & Fitness Expert",
                description:
                  "With over a decade of experience as a certified personal trainer, John is passionate about helping individuals unlock their potential.",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                bgColor: "bg-blue-100",
                textColor: "text-blue-700",
              },
              {
                name: "Jane Smith",
                role: "Nutrition Specialist",
                description:
                  "Jane helps our users with personalized nutrition plans that fuel their fitness journeys.",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                bgColor: "bg-green-100",
                textColor: "text-green-700",
              },
              {
                name: "Mark Lee",
                role: "Community Manager",
                description:
                  "Mark fosters a supportive community and organizes events to keep our users motivated.",
                image: "https://randomuser.me/api/portraits/men/45.jpg",
                bgColor: "bg-purple-100",
                textColor: "text-purple-700",
              },
            ].map((member, index) => (
              <div
                key={index}
                className={`${member.bgColor} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
                />
                <h3 className={`text-2xl font-semibold ${member.textColor}`}>
                  {member.name}
                </h3>
                <p className="text-lg text-gray-600">{member.role}</p>
                <p className="text-gray-700 mt-4">{member.description}</p>
              </div>
            ))}
          </div>
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="FitPro Team"
            className="w-full max-h-64 object-cover rounded-xl mt-6"
          />
        </section>

        <section className="mb-12 p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 border-b-4 border-indigo-700 inline-block">
            Our Features
          </h2>
          <ul className="list-none text-lg text-gray-700 space-y-4">
            <li>✔️ Customized fitness plans tailored to your needs.</li>
            <li>✔️ Progress tracking to monitor your achievements.</li>
            <li>✔️ Educational resources to enhance your knowledge.</li>
            <li>
              ✔️ Active community engagement through forums and challenges.
            </li>
            <li>✔️ Integration with wearables for seamless tracking.</li>
            <li>✔️ Virtual coaching sessions for personalized guidance.</li>
            <li>✔️ Gamification elements to make fitness fun and rewarding.</li>
            <li>✔️ Mobile app for on-the-go access.</li>
          </ul>
          <img
            src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/04/apple-watch-fitness-health.jpg"
            alt="FitPro Features"
            className="w-full max-h-64 object-cover rounded-xl mt-6"
          />
        </section>

        <section className="mb-12 p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 border-b-4 border-indigo-700 inline-block">
            User Impact
          </h2>
          <blockquote className="border-l-4 border-indigo-700 pl-6 italic text-gray-700 mb-6">
            "FitPro has completely changed my approach to fitness! I've lost 20
            pounds and gained confidence!" - Jane Smith
          </blockquote>
          <p className="text-lg text-gray-700">
            Join the ranks of our incredible users who have transformed their
            lives with FitPro.
          </p>
          <img
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1635224319102/PylfFjumm.png?auto=compress,format&format=webp"
            alt="User success story"
            className="w-full max-h-64 object-cover rounded-xl mt-6"
          />
        </section>

        <section className="mb-12 p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600 border-b-4 border-indigo-700 inline-block">
            Get Involved
          </h2>
          <p className="text-lg text-gray-700">
            Your feedback is invaluable! We’re eager to hear your thoughts on
            how we can improve. Interested in becoming part of our team? Visit
            our careers page for current openings.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
