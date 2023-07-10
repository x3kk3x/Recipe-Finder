import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./profile.css";
import { useCookies } from "react-cookie";
import jwtDecode from 'jwt-decode';

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [cookies] = useCookies(["userToken"]);

  useEffect(() => {
    if (cookies.userToken) {
      try {
        const userData = parseUserDataFromToken(cookies.userToken);
        if (userData) {
          setEmail(userData.email);
          setName(userData.name);
        }
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, [cookies]);
  
  

  const parseUserDataFromToken = (userToken) => {
    if (userToken) {
      // Decode the user token
      const decodedToken = jwtDecode(userToken);
  
      // Extract the email and name from the decoded token
      const email = decodedToken.email;
      const name = decodedToken.name;
  
      // Return an object with the email and name properties
      return {
        email: email,
        name: name,
      };
    }
    return null;
  };
  
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Container className="d-flex align-items-center background-image justify-content-center vh-100">
      <motion.div
        className="animated-component profile-window"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-header">
          <h1 className="profile-title">Profile</h1>
        </div>
        <Form className="profile-form">
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Form>
        <Link to="/">
          <Button className="home-button" variant="dark">
            Go Back to Home
          </Button>
        </Link>
      </motion.div>
    </Container>
  );
};

export default Profile;
