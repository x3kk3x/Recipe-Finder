import React from "react";

const RecipeList = ({ recipes }) => {
  if (!recipes || !Array.isArray(recipes)) {
    return null;
  }

  return (
    <div>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h3>{recipe.label}</h3>
          <img src={recipe.image} alt={recipe.label} />
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
