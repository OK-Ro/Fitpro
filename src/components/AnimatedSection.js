import React from "react";
import { useSpring, animated } from "react-spring";

const AnimatedSection = ({ children }) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return <animated.div style={props}>{children}</animated.div>;
};

export default AnimatedSection;
