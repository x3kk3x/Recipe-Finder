import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./profile.css";
import { useCookies } from "react-cookie";
import jwtDecode from 'jwt-decode';
import { firestore } from '../../services/Firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [cookies] = useCookies(["userToken"]);

  useEffect(() => {
    if (cookies.userToken) {
      const userData = parseUserDataFromToken(cookies.userToken);
      if (userData) {
        setEmail(userData.email);
        setName(userData.name);
        fetchUserData(userData.email);
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

  const fetchUserData = async (userEmail) => {
    try {
      const docRef = doc(firestore, "users", userEmail);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDescription(docSnap.data().description);
        setPhotoURL(docSnap.data().photoURL || ""); // Set photo URL if available
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateDescriptionInFirestore = async () => {
    try {
      const userDocRef = doc(firestore, 'users', email);
      await updateDoc(userDocRef, { description: description });
      alert('Description updated successfully!');
    } catch (error) {
      console.error('Error updating description: ', error);
      alert('Error updating description: ' + error.message);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storage = getStorage();
    const storageRef = ref(storage, 'profilePictures/' + email);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const newPhotoURL = await getDownloadURL(snapshot.ref);
      setPhotoURL(newPhotoURL);

      const userDocRef = doc(firestore, 'users', email);
      await updateDoc(userDocRef, { photoURL: newPhotoURL });
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading profile picture: ', error);
      alert('Error uploading profile picture: ' + error.message);
    }
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
        {photoURL && <img src={photoURL} alt="Profile" className="profile-picture" />}
        <Form className="profile-form">
          <Form.Group controlId="formProfilePicture">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              readOnly
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

          <Button variant="primary" onClick={updateDescriptionInFirestore}>
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
