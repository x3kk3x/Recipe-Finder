import React from "react";
import { Form, Button } from "react-bootstrap";
import "./style/forgotPassword.css";

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
            <a href="#" variant="link" className="forgot-password-buttons">
              Back to Login
            </a>
            <a href="#" variant="link" className="forgot-password-buttons">
              Sign up
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
