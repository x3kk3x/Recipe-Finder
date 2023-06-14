import React from "react";
import { Modal } from "react-bootstrap";

const RecipeModal = ({ recipe, visible, onClose }) => {
  const formatText = (text) => {
    if (typeof text === "string") {
      return text.split(" ").join(" / ");
    }
    return text;
  };

  return (
    <Modal show={visible} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 className="recipe-modal">Recipe Details</h3>
        <p className="recipe-info">
          Cuisine Type: {formatText(recipe.cuisineType)}
        </p>
        <p className="recipe-info">Meal Type: {formatText(recipe.mealType)}</p>
        <p className="recipe-info">
          Diet Labels: {formatText(recipe.dietLabels)}
        </p>
        <p className="recipe-info">
          Ingredient: {formatText(recipe.ingredientLines)}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default RecipeModal;
