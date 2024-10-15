// src/styles/HomeStyles.js
import styled from "styled-components";

export const Section = styled.div`
  text-align: center;
  transition: all 0.3s ease-in-out;

  &.hero {
    background: url("path/to/hero-background.jpg") no-repeat center center/cover;
    color: white;
  }

  &.activities {
    background-color: #f4f4f4;
  }

  &.features {
    background-color: #fff;
  }

  &.hub {
    background-color: #e0f7fa;
  }

  &.download {
    background-color: #ffeb3b;
  }

  &.testimonials {
    background-color: #fff;
  }

  &:hover {
    transform: scale(1.02);
  }
`;
