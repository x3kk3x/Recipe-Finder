import React, { useState, useEffect } from "react";
import RecipeService from "../../services/RecipeService/RecipeService";
import { Pagination, Alert } from "react-bootstrap";
import RecipeList from "../RecipeList/RecipeList";
import "./recipeSearch.css";
import { useAuth } from "../../components/Auth/AuthContext"; // Import the AuthContext

const RecipeSearch = () => {
  const { currentUser, isLoading } = useAuth(); // Access the current user and loading state from AuthContext
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

  // Check if the user is logged in or authentication state is loading
  if (!currentUser && !isLoading) {
    return (
      <div className="recipe-search-container background-image">
        <div className="recipe-search-form">
          <h2 className="form-title">Please log in to access this page.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-search-container background-image">
      <div className="recipe-search-form">
        <h1 className="form-title">Delicious Recipes with Recipe Finder</h1>
        <p className="form-description">
          Turn your leftover ingredients into culinary masterpieces! With Recipe
          Finder, simply enter the ingredients you have on hand and unlock a
          world of mouthwatering recipes tailored to your pantry.
        </p>
        <form
          onSubmit={handleSearch}
          className="d-flex justify-content-center form-container"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search for recipes..."
            className="recipe-search-input me-2"
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
