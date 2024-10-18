import React, { useState } from "react";
import styled from "styled-components";
import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.secondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const LoginCard = styled.div`
  max-width: 400px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: 2rem;
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
`;

export const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.xxlarge};
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${(props) => props.theme.colors.textLight};
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: ${(props) => props.theme.fontSizes.medium};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.textLight};
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryLight};
  }
`;

export const ToggleText = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: ${(props) => props.theme.fontSizes.small};
`;

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in...", { email, password });
    onLogin();
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Sign in to FitPro</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <Mail size={18} />
            </InputIcon>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <Lock size={18} />
            </InputIcon>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit">Sign in</Button>
        </Form>
        <ToggleText>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </ToggleText>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
