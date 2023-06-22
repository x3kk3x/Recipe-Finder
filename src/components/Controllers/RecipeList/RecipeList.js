import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "./recipeList.css";
import RecipeModal from "../../RecipeModal/RecipeModal";

const RecipeList = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedRecipe(null);
  };

  return (
    <Row className="justify-content-center d-flex">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <Col key={index}>
            <div className="recipe-card">
              <Card className="recipe-card">
                <Card.Img variant="top" src={recipe.image} />
                <Card.Body>
                  <Card.Title className="recipe-title">
                    {recipe.label}
                  </Card.Title>
                  <Card.Text className="recipe-description">
                    {recipe.cuisineType}
                  </Card.Text>
                  <Card.Text className="recipe-description">
                    {recipe.mealType}
                  </Card.Text>
                  <Button
                    variant="dark"
                    onClick={() => handleCardClick(recipe)}
                  >
                    Show more
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))
      ) : (
        <div></div>
      )}
      {modalVisible && (
        <RecipeModal
          recipe={selectedRecipe}
          visible={modalVisible}
          onClose={handleModalClose}
        />
      )}
    </Row>
  );
};

export default RecipeList;
