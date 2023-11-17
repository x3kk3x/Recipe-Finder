import React from "react";
import { Modal } from "react-bootstrap";
import { saveRecipe } from '../../services/Firebase/firebaseActions'; // Adjust the path as needed

const RecipeModal = ({ recipe, visible, onClose, userId }) => {
  console.log("Rendering RecipeModal with recipe:", recipe); // Log the recipe

  if (!recipe) {
    return null; // Or a loading indicator, if appropriate
  }

  const handleSaveRecipe = async () => {
      try {
          await saveRecipe(userId, recipe.id);
          alert('Recipe saved successfully!');
      } catch (error) {
          console.error("Error saving recipe: ", error);
          alert('Failed to save recipe.');
      }
  };

  const formatText = (text) => {
    return typeof text === "string" ? text.split(" ").join(" / ") : text;
  };

  return (
    <Modal show={visible} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 className="recipe-modal">Recipe Details</h3>
        <button onClick={handleSaveRecipe}>Save Recipe</button>
        <p className="recipe-info">
          Cuisine Type: {formatText(recipe.cuisineType)}
        </p>
        <p className="recipe-info">Meal Type: {formatText(recipe.mealType)}</p>
        <p className="recipe-info">
          Diet Labels: {formatText(recipe.dietLabels)}
        </p>
        <p className="recipe-info">
          Ingredients: {formatText(recipe.ingredientLines)}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default RecipeModal;
