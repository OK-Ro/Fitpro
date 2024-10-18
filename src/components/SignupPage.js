import React, { useState } from "react";

import { User, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Import the styled components from LoginPage
import {
  LoginContainer,
  LoginCard,
  Title,
  Form,
  InputGroup,
  Input,
  InputIcon,
  Button,
  ToggleText,
} from "./LoginPage";

const SignupPage = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up...", { email, password, name });
    onSignup();
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Create your FitPro account</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <User size={18} />
            </InputIcon>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>
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
          <Button type="submit">Sign up</Button>
        </Form>
        <ToggleText>
          Already have an account? <Link to="/login">Sign in</Link>
        </ToggleText>
      </LoginCard>
    </LoginContainer>
  );
};

export default SignupPage;
