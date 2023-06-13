import React, { useState, useEffect } from "react";
import RecipeService from "../../services/RecipeService/RecipeService";
import { Pagination, Alert } from "react-bootstrap";
import RecipeList from "../RecipeList/RecipeList";
import "./recipeSearch.css";

const RecipeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(3);
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      setShowAlert(true);
      return;
    }

    try {
      const recipeData = await RecipeService.searchRecipes(searchQuery);
      console.log(recipeData); // Check the data received from the service
      setRecipes(recipeData);
      setCurrentPage(1); // Reset to first page when new search is performed
      setShowAlert(false); // Hide the alert when search is successful
    } catch (error) {
      console.error("Error searching for recipes:", error);
      setRecipes([]);
    }
  };

  useEffect(() => {
    // Update pagination when recipes change
    setCurrentPage(1);
  }, [recipes]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="recipe-search-container">
      <div className="recipe-search-form">
        <form onSubmit={handleSearch} className="d-flex justify-content-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search for recipes..."
            className="form-control me-2 recipe-search-input"
          />
          <button type="submit" className="btn btn-dark recipe-search-button">
            Search
          </button>
        </form>

        {showAlert && (
          <Alert variant="danger" className="mt-3">
            Please enter a search query.
          </Alert>
        )}

        {recipes.length > 0 && <RecipeList recipes={currentRecipes} />}

        <div className="pagination-container">
          <Pagination>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
