import React, { useState } from "react";
import RecipeService from "../../services/RecipeService/RecipeService";
import RecipeList from "../RecipeList/RecipeList";
import "../../App.css";

const RecipeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const recipeData = await RecipeService.searchRecipes(searchQuery);
      setRecipes(recipeData);
    } catch (error) {
      console.error("Error searching for recipes:", error);
      setRecipes([]);
    }
  };

  return (
    <div className="recipe-search-container">
      <div className="recipe-search-form">
        <form onSubmit={handleSearch} className="d-flex justify-content-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search for recipes"
            className="form-control me-2 recipe-search-input"
          />
          <button
            type="submit"
            className="btn btn-primary recipe-search-button"
          >
            Search
          </button>
        </form>

        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};

export default RecipeSearch;
