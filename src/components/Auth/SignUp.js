import React from "react";
import { Form, Button } from "react-bootstrap";
import "./style/signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup-container background-image">
      <div className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <Form>
          <Form.Group controlId="formName">
            <Form.Control
              type="text"
              placeholder="Enter your name"
              className="signup-input"
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="signup-input"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Control
              type="password"
              placeholder="Password"
              className="signup-input"
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
