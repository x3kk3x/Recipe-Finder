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
        <h1 className="home-title">
          The Gastronomic Galaxy <br></br> <small>(A Whimsical Journey into Human Cuisine)</small>
        </h1>
        <p className="home-description">
          In 'The Intergalactic Epicurean's Handbook,' aliens embark on a
          delightful odyssey through human cuisine. With humor and curiosity,
          the guide demystifies the intricacies of human gastronomy, exploring
          peculiar ingredients, unique cooking methods, and cultural nuances.
          From the simplicity of meatloaf to the complexity of molecular
          gastronomy, the aliens encounter a diverse array of recipes. Through
          witty narratives and absurd encounters, the guide captures the essence
          of culinary exploration, inviting readers on a delightful and
          perplexing journey through the cosmos of human food
        </p>
        {/* <Row className="justify-content-between">
          <Col xs="auto"> */}
            <Link to="/signup">
              <Button className="welcome-cta" variant="dark">
                WELCOME
              </Button>
            </Link>
          {/* </Col> */}
          {/* <Col xs="auto">
            <Link to="/login">
              <Button className="home-button" variant="dark">
                Login
              </Button>
            </Link>
          </Col>
        </Row> */}
      </motion.div>
    </Container>
  );
};

export default Home;
