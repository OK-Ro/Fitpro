import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  Zap,
  User,
  Star,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Calendar,
  BookOpen,
  Award,
} from "lucide-react";

const ClassesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [expandedClass, setExpandedClass] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");

  const categories = [
    "All",
    "Strength",
    "Cardio",
    "Yoga",
    "HIIT",
    "Pilates",
    "Cycling",
    "Swimming",
    "Running",
    "Flexibility",
  ];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const classes = [
    {
      id: 1,
      title: "Full Body Strength Workout",
      category: "Strength",
      difficulty: "Intermediate",
      duration: "45 min",
      instructor: {
        name: "Mike Johnson",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.9,
      },
      thumbnail: "https://source.unsplash.com/random/800x600?strength",
      videoUrl: "https://example.com/full-body-strength-workout.mp4",
      intensity: 4,
      calories: 300,
      rating: 4.8,
      views: 15280,
      equipment: ["Dumbbells", "Resistance bands", "Mat"],
      description:
        "Build overall strength with this comprehensive full-body workout.",
      instructions: [
        "Start with a 5-minute warm-up",
        "Perform each exercise for 45 seconds, followed by 15 seconds rest",
        "Complete 3 rounds of the circuit",
        "Finish with a 5-minute cool-down and stretch",
      ],
    },
    {
      id: 2,
      title: "High-Intensity Interval Training",
      category: "HIIT",
      difficulty: "Advanced",
      duration: "30 min",
      instructor: {
        name: "Sarah Lee",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.7,
      },
      thumbnail: "https://source.unsplash.com/random/800x600?hiit",
      videoUrl: "https://example.com/hiit-workout.mp4",
      intensity: 5,
      calories: 400,
      rating: 4.9,
      views: 22150,
      equipment: ["None"],
      description:
        "Torch calories and improve cardiovascular fitness with this intense HIIT session.",
      instructions: [
        "Warm up for 3 minutes",
        "Perform each exercise for 40 seconds, followed by 20 seconds rest",
        "Complete 5 rounds of the circuit",
        "Cool down and stretch for 5 minutes",
      ],
    },
    {
      id: 3,
      title: "Vinyasa Flow Yoga",
      category: "Yoga",
      difficulty: "Intermediate",
      duration: "60 min",
      instructor: {
        name: "Emma Chen",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 4.8,
      },
      thumbnail: "https://source.unsplash.com/random/800x600?yoga",
      videoUrl: "https://example.com/vinyasa-flow-yoga.mp4",
      intensity: 3,
      calories: 200,
      rating: 4.7,
      views: 18900,
      equipment: ["Yoga mat", "Yoga blocks (optional)"],
      description:
        "Improve flexibility, strength, and mindfulness with this flowing yoga practice.",
      instructions: [
        "Begin in a comfortable seated position",
        "Flow through sun salutations and standing poses",
        "Practice balancing poses and inversions",
        "End with seated poses and final relaxation",
      ],
    },
    {
      id: 4,
      title: "Indoor Cycling Endurance Ride",
      category: "Cycling",
      difficulty: "Intermediate",
      duration: "45 min",
      instructor: {
        name: "Alex Rodriguez",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        rating: 4.6,
      },
      thumbnail: "https://source.unsplash.com/random/800x600?cycling",
      videoUrl: "https://example.com/indoor-cycling-endurance.mp4",
      intensity: 4,
      calories: 500,
      rating: 4.8,
      views: 12780,
      equipment: ["Stationary bike"],
      description:
        "Build cardiovascular endurance with this challenging indoor cycling session.",
      instructions: [
        "Set up your bike and warm up for 5 minutes",
        "Alternate between seated and standing climbs",
        "Incorporate sprint intervals",
        "Cool down and stretch for 5 minutes",
      ],
    },
    {
      id: 5,
      title: "Core and Ab Blast",
      category: "Strength",
      difficulty: "Beginner",
      duration: "20 min",
      instructor: {
        name: "Lisa Brown",
        image: "https://randomuser.me/api/portraits/women/90.jpg",
        rating: 4.5,
      },
      thumbnail: "https://source.unsplash.com/random/800x600?core-workout",
      videoUrl: "https://example.com/core-and-ab-blast.mp4",
      intensity: 3,
      calories: 150,
      rating: 4.6,
      views: 20150,
      equipment: ["Mat"],
      description:
        "Strengthen your core with this quick and effective ab workout.",
      instructions: [
        "Start with a brief warm-up",
        "Perform each exercise for 30 seconds, followed by 10 seconds rest",
        "Complete 2 rounds of the circuit",
        "Finish with a short cool-down",
      ],
    },
    {
      id: 6,
      title: "5K Running Training",
      category: "Running",
      difficulty: "Beginner",
      duration: "30 min",
      instructor: {
        name: "John Doe",
        image: "https://randomuser.me/api/portraits/men/10.jpg",
        rating: 4.5,
      },
      thumbnail: "https://source.unsplash.com/random/800x600?running",
      videoUrl: "https://example.com/5k-running-training.mp4",
      intensity: 3,
      calories: 250,
      rating: 4.6,
      views: 15000,
      equipment: ["Running shoes"],
      description:
        "Prepare for a 5K run with this structured training session.",
      instructions: [
        "Start with a 5-minute warm-up jog",
        "Run at a comfortable pace for 20 minutes",
        "Cool down with a 5-minute walk",
      ],
    },
    {
      id: 7,
      title: "Mindful Meditation",
      category: "Yoga",
      difficulty: "Beginner",
      duration: "15 min",
      instructor: {
        name: "Emma Wilson",
        image: "https://randomuser.me/api/portraits/women/63.jpg",
        rating: 4.9,
      },
      thumbnail: "https://source.unsplash.com/random/800x600?meditation",
      videoUrl: "https://example.com/mindful-meditation.mp4",
      intensity: 1,
      calories: 50,
      rating: 4.8,
      views: 25000,
      equipment: ["Yoga mat", "Cushion (optional)"],
      description:
        "Relax and center yourself with this guided meditation session.",
      instructions: [
        "Find a comfortable seated position",
        "Close your eyes and focus on your breath",
        "Follow the guided meditation",
        "Slowly return to awareness at the end of the session",
      ],
    },
  ];

  useEffect(() => {
    if (expandedClass !== null && videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [expandedClass]);

  const filteredClasses = classes.filter(
    (c) =>
      (selectedCategory === "All" || c.category === selectedCategory) &&
      (selectedDifficulty === "All" || c.difficulty === selectedDifficulty) &&
      (c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.instructor.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedClasses = [...filteredClasses].sort((a, b) => {
    if (sortBy === "popularity") return b.views - a.views;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "duration") return a.duration.localeCompare(b.duration);
    return 0;
  });

  const toggleExpand = (id) => {
    setExpandedClass(expandedClass === id ? null : id);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center bg-white py-4 rounded-lg shadow-md">
        Fitness Classes
      </h2>

      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center bg-white rounded-lg shadow-md p-2">
          <Filter className="text-gray-400 mr-2" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent border-none focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center bg-white rounded-lg shadow-md p-2">
          <Award className="text-gray-400 mr-2" size={20} />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-transparent border-none focus:outline-none"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center bg-white rounded-lg shadow-md p-2">
          <Search className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search classes or instructors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none focus:outline-none"
          />
        </div>
        <div className="flex items-center bg-white rounded-lg shadow-md p-2">
          <BookOpen className="text-gray-400 mr-2" size={20} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-none focus:outline-none"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="rating">Sort by Rating</option>
            <option value="duration">Sort by Duration</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative pb-[56.25%]">
              {" "}
              {/* 16:9 aspect ratio */}
              <img
                src={classItem.thumbnail}
                alt={classItem.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                {classItem.difficulty}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
              <p className="text-gray-600 mb-4">{classItem.description}</p>
              <div className="flex items-center mb-4">
                <img
                  src={classItem.instructor.image}
                  alt={classItem.instructor.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{classItem.instructor.name}</p>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" size={16} />
                    <span>{classItem.instructor.rating}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Clock className="text-gray-400 mr-2" size={16} />
                  <span>{classItem.duration}</span>
                </div>
                <div className="flex items-center">
                  <Zap className="text-gray-400 mr-2" size={16} />
                  <span>{classItem.calories} cal</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-2" size={16} />
                  <span>{classItem.rating}</span>
                </div>
                <div className="flex items-center">
                  <User className="text-gray-400 mr-2" size={16} />
                  <span>{classItem.views} views</span>
                </div>
              </div>
              <button
                onClick={() => toggleExpand(classItem.id)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                {expandedClass === classItem.id ? (
                  <>
                    <ChevronUp className="mr-2" size={20} />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2" size={20} />
                    Show Details
                  </>
                )}
              </button>
              {expandedClass === classItem.id && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Equipment Needed:</h4>
                  <ul className="list-disc list-inside mb-4">
                    {classItem.equipment.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold mb-2">Instructions:</h4>
                  <ol className="list-decimal list-inside mb-4">
                    {classItem.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                  <div className="relative">
                    <video
                      ref={videoRef}
                      src={classItem.videoUrl}
                      className="w-full rounded-lg"
                      onTimeUpdate={handleTimeUpdate}
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black bg-opacity-50 text-white p-2 rounded">
                      <button
                        onClick={togglePlay}
                        className="focus:outline-none"
                      >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </button>
                      <span>
                        {formatTime(currentTime)} / {classItem.duration}
                      </span>
                      <button
                        onClick={restartVideo}
                        className="focus:outline-none"
                      >
                        <RotateCcw size={24} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
                    onClick={() => alert(`Class "${classItem.title}" booked!`)}
                  >
                    <Calendar className="mr-2" size={20} />
                    Book This Class
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
