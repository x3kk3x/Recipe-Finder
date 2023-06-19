import React from "react";
import { Form, Button } from "react-bootstrap";
import "./style/login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container background-image">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="login-input"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Control
              type="password"
              placeholder="Password"
              className="login-input"
            />
          </Form.Group>

          <Link to="/recipe-search">
            <Button variant="dark" type="submit" className="mt-5">
              Login
            </Button>
          </Link>

          <div className="login-links mt-3">
            <Link to="/forgotten-password">
              <Button variant="link" className="login-buttons">
                Forgot password?
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="link" className="login-buttons">
                Sign up
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
