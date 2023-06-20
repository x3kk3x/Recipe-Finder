import React from "react";
import { Button } from "react-bootstrap";
import "./style/registrationSuccessfull.css";
import { Link } from "react-router-dom";

const RegistrationSuccessful = () => {
  return (
    <div className="registration-successful-container background-image">
      <div className="registration-successful-content">
        <h2 className="registration-successful-title">
          Registration Successful
        </h2>
        <p className="registration-successful-message">
          Thank you for registering! Your account has been created successfully.
        </p>

        <Link to="/login">
          <Button variant="dark" className="registration-successful-button">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccessful;
