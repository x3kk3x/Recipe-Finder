import React from "react";
import { Form, Button } from "react-bootstrap";
import "./style/forgotPassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container background-image">
      <div className="forgot-password-form">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="forgot-password-input"
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="mt-5">
            Reset Password
          </Button>

          <div className="forgot-password-links mt-3">
            <Link to="/login">
              <Button variant="link" className="link-btn">
                Login
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

export default ForgotPassword;
