import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./style/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/Firebase/firebase"; // Import the 'auth' object from the Firebase module

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password); // Use the 'auth' object to create a new user with email and password
      // You can add additional logic here (e.g., save user data to Firestore)

      navigate("/home"); // Redirect to the home page after successful sign up
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

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Control
              type="password"
              placeholder="Password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="mt-5">
            Sign Up
          </Button>

          <div className="signup-links mt-3">
            <Link to="/login">
              <Button variant="link" className="link-btn">
                Login
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
