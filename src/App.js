import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Home from "./pages/Home";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import FitnessTracker from "./pages/FitnessTracker";

import { GlobalStyles, theme } from "./styles/GlobalStyles";
import FeaturesPage from "./components/FeaturesPage";
import AboutPage from "./components/AboutPage";
import BlogPage from "./components/BlogPage";
import PricingPage from "./components/PricicingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
              <Route
                path="/login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/fitness-tracker" />
                  ) : (
                    <LoginPage onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  isLoggedIn ? (
                    <Navigate to="/fitness-tracker" />
                  ) : (
                    <SignupPage onSignup={handleSignup} />
                  )
                }
              />
              <Route
                path="/fitness-tracker"
                element={
                  isLoggedIn ? (
                    <FitnessTracker setIsLoggedIn={setIsLoggedIn} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/features" element={<FeaturesPage />} />{" "}
              <Route path="/about" element={<AboutPage />} />{" "}
              <Route path="/blog" element={<BlogPage />} />{" "}
              <Route path="/pricing" element={<PricingPage />} />{" "}
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
