import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./recipeList.css";

const RecipeList = ({ recipes }) => {
  return (
    <Row className="justify-content-center d-flex">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <Col key={index}>
            <Card className="recipe-card">
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <Card.Title className="recipe-title">{recipe.label}</Card.Title>
                <Card.Text className="recipe-description">
                  {recipe.healthLabels}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <div></div>
      )}
    </Row>
  );
};

export default RecipeList;
