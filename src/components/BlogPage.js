import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search, Calendar, User, Clock, ChevronRight, Tag } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredArticles, setFilteredArticles] = useState([]);

  const categories = [
    { name: "All", icon: <Tag size={18} /> },
    { name: "Nutrition", icon: <Tag size={18} /> },
    { name: "Strength Training", icon: <Tag size={18} /> },
    { name: "Cardio", icon: <Tag size={18} /> },
    { name: "Yoga", icon: <Tag size={18} /> },
    { name: "Recovery", icon: <Tag size={18} /> },
    { name: "Mental Health", icon: <Tag size={18} /> },
  ];

  const articles = useMemo(
    () => [
      {
        id: 1,
        title: "10 Essential Tips for Building Muscle Mass",
        excerpt:
          "Discover the key strategies to maximize your muscle growth and achieve your fitness goals faster.",
        image:
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Strength Training",
        author: "John Doe",
        date: "2023-06-15",
        readTime: 8,
      },
      {
        id: 2,
        title: "The Ultimate Guide to HIIT Workouts",
        excerpt:
          "Learn how to structure your High-Intensity Interval Training for optimal fat loss and cardiovascular health.",
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Cardio",
        author: "Jane Smith",
        date: "2023-06-10",
        readTime: 10,
      },
      {
        id: 3,
        title: "Nutrition Myths Debunked: Separating Fact from Fiction",
        excerpt:
          "We tackle common nutrition misconceptions and provide evidence-based information to help you make informed dietary choices.",
        image:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Nutrition",
        author: "Dr. Emily Johnson",
        date: "2023-06-05",
        readTime: 12,
      },
      {
        id: 4,
        title: "5 Yoga Poses for Better Sleep",
        excerpt:
          "Improve your sleep quality with these relaxing yoga poses that you can do before bedtime.",
        image:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Yoga",
        author: "Sarah Lee",
        date: "2023-06-20",
        readTime: 7,
      },
      {
        id: 5,
        title: "The Importance of Rest Days in Your Fitness Routine",
        excerpt:
          "Learn why taking regular rest days is crucial for your overall fitness and how to make the most of them.",
        image:
          "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Recovery",
        author: "Mike Johnson",
        date: "2023-06-25",
        readTime: 9,
      },
      {
        id: 6,
        title: "Mindfulness and Exercise: Boosting Your Mental Health",
        excerpt:
          "Discover how combining mindfulness practices with regular exercise can significantly improve your mental well-being.",
        image:
          "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Mental Health",
        author: "Dr. Lisa Brown",
        date: "2023-06-30",
        readTime: 11,
      },
    ],
    []
  ); // No dependencies, as the articles are static

  const filterArticles = useCallback(() => {
    let filtered = articles;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchTerm]);

  useEffect(() => {
    filterArticles();
  }, [filterArticles]);

  return (
    <div className="bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 min-h-screen text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          FitPro Fitness Blog
        </h1>

        <div className="mb-8">
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-4 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.name
                    ? "bg-white text-indigo-700"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <Tag size={16} className="text-indigo-500 mr-2" />
                  <span className="text-sm text-indigo-500 font-semibold">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User size={16} className="mr-2" />
                  <span className="mr-4">{article.author}</span>
                  <Calendar size={16} className="mr-2" />
                  <span className="mr-4">{article.date}</span>
                  <Clock size={16} className="mr-2" />
                  <span>{article.readTime} min read</span>
                </div>
                <button className="text-indigo-700 font-semibold flex items-center hover:underline">
                  Read More <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center text-white mt-8">
            <p>No articles found for the selected category or search term.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
