import React from "react";
import Header from "../components/Header";
import AnimatedSection from "../components/AnimatedSection";
import { Section } from "../styles/HomeStyles";
import Hero from "../components/Hero";
import Activities from "../components/Activities";
import Features from "../components/Features";
import Hub from "../components/Hub";

import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <AnimatedSection>
        <Section className="hero">
          <Hero />
        </Section>
      </AnimatedSection>
      <AnimatedSection>
        <Section className="activities">
          <Activities />
        </Section>
      </AnimatedSection>
      <AnimatedSection>
        <Section className="features">
          <Features />
        </Section>
      </AnimatedSection>
      <AnimatedSection>
        <Section className="hub">
          <Hub />
        </Section>
      </AnimatedSection>
      <AnimatedSection></AnimatedSection>
      <AnimatedSection>
        <Section className="testimonials">
          <Testimonials />
        </Section>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default Home;
