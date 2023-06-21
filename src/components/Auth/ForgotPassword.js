import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./style/forgotPassword.css";
import { auth } from "../../services/Firebase/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 4000);
      return;
    }

    try {
      await auth.sendPasswordResetEmail(email);
      setShowSuccessAlert(true);
      setEmail("");
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    } catch (error) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
      console.log(error.message);
    }
  };

  return (
    <div className="forgot-password-container background-image">
      <div className="forgot-password-form">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <Form onSubmit={handleResetPassword}>
          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="forgot-password-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="mt-5 mb-5">
            Reset Password
          </Button>

          {showSuccessAlert && (
            <Alert
              variant="success"
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              Password reset email sent successfully. Please check your email.
            </Alert>
          )}

          {showErrorAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowErrorAlert(false)}
              dismissible
            >
              Please enter a valid email address.
            </Alert>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
