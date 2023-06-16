import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <Container className="d-flex align-items-center background-image justify-content-center vh-100">
      <motion.div
        className="animated-component home-window"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="home-title">Delicious Recipes with Recipe Finder</h1>
        <p className="home-description">
          Turn your leftover ingredients into culinary masterpieces! With Recipe
          Finder, simply enter the ingredients you have on hand and unlock a
          world of mouthwatering recipes tailored to your pantry.
        </p>
        <Row className="justify-content-between">
          <Col xs="auto">
            <Link to="/signup">
              <Button className="home-button" variant="dark">
                Sign Up
              </Button>
            </Link>
          </Col>
          <Col xs="auto">
            <Link to="/login">
              <Button className="home-button" variant="dark">
                Login
              </Button>
            </Link>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Home;
