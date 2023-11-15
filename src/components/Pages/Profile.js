import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./profile.css";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { firestore } from "../../services/Firebase/firebase";
import { doc, updateDoc } from 'firebase/firestore';

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
          // Optionally, fetch and set the existing description from Firestore
        }
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, [cookies]);

  const parseUserDataFromToken = (userToken) => {
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      return {
        email: decodedToken.email,
        name: decodedToken.name,
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

  const updateDescriptionInFirestore = async () => {
    try {
      const userDocRef = doc(firestore, 'users', email); // Correct way to get a document reference
      await updateDoc(userDocRef, { description: description });
      alert('Description updated successfully!');
    } catch (error) {
      console.error('Error updating description: ', error);
      alert('Error updating description: ' + error.message);
    }
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

          {/* Save Button */}
          <Button
            type="button"
            variant="primary"
            onClick={updateDescriptionInFirestore}
          >
            Save Description
          </Button>
        </Form>
        <Link to="/home">
          <Button className="home-button" variant="dark">
            Go Back to Home
          </Button>
        </Link>
      </motion.div>
    </Container>
  );
};

export default Profile;
