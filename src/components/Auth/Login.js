import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./style/login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/Firebase/firebase";

const Login = () => {
  const [notExistAlert, setNotExistAlert] = useState(false);
  const [incorrectPasswordAlert, setIncorrectPasswordAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotExistAlert(false);
      setIncorrectPasswordAlert(false);
      setShowErrorAlert(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [notExistAlert, incorrectPasswordAlert, showErrorAlert]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Redirect to the desired page after successful login
      navigate("/recipe-search");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setNotExistAlert(true);
      } else if (error.code === "auth/wrong-password") {
        setIncorrectPasswordAlert(true);
      } else {
        setErrorMessage(error.message);
        setShowErrorAlert(true);
      }
    }
  };

  return (
    <div className="login-container background-image">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <Form onSubmit={handleLogin}>
          {/* Form fields */}
          <Form.Group controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="login-input"
              name="email"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Control
              type="password"
              placeholder="Password"
              className="login-input"
              name="password"
            />
          </Form.Group>

          {/* Bootstrap Alerts */}
          {notExistAlert && (
            <Alert
              variant="danger"
              onClose={() => setNotExistAlert(false)}
              dismissible
            >
              User does not exist. Please sign up.
            </Alert>
          )}

          {incorrectPasswordAlert && (
            <Alert
              variant="danger"
              onClose={() => setIncorrectPasswordAlert(false)}
              dismissible
            >
              Incorrect password. Please try again.
            </Alert>
          )}

          {showErrorAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowErrorAlert(false)}
              dismissible
            >
              {errorMessage}
            </Alert>
          )}

          {/* Login button */}
          <Button variant="dark" type="submit" className="mt-5">
            Login
          </Button>
        </Form>
        <Link to="/forgotten-password">
          <Button variant="outline-dark" type="submit" className="mt-5">
            Forgot password?
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
