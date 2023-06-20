import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./style/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/Firebase/firebase";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      await user.sendEmailVerification();

      navigate("/registration-successfull");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container background-image">
      <div className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <Form onSubmit={handleSignUp}>
          <Form.Group controlId="formName">
            <Form.Control
              type="text"
              placeholder="Enter your name"
              className="signup-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3 mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {emailError && <Alert variant="danger">{emailError}</Alert>}

          <Button variant="dark" type="submit" className="mt-5">
            Sign Up
          </Button>

          <div className="mt-5">
            <Link to="/login">
              <Button variant="outline-dark">Login</Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
