import React, { useState, useEffect } from "react";
import RecipeService from "../../../services/RecipeService/RecipeService";
import RecipeList from "../RecipeList/RecipeList";
import { Pagination, Alert, Button, Row, Col, Dropdown } from "react-bootstrap";
import "../RecipeSearch/recipeSearch.css";
import { useAuth } from "../../Auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";

const RecipeSearch = () => {
  const { currentUser, isLoading, login, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(3);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // Use the user ID for further operations
  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      setShowAlert(true);
      return;
    }

    try {
      const recipeData = await RecipeService.searchRecipes(searchQuery);
      setRecipes(recipeData);
      setCurrentPage(1); // Reset to first page when new search is performed
      setShowAlert(false); // Hide the alert when search is successful
    } catch (error) {
      console.error("Error searching for recipes:", error);
      setRecipes([]);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      navigate("/login"); // Redirect the user to the login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
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

  if (!currentUser && !isLoading) {
    return (
      <div className="recipe-search-container background-image">
        <div className="container recipe-form-alert recipe-search-form">
          <h2 className="form-title">Please log in to access this page.</h2>
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
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="recipe-search-container background-image">
        <div className="recipe-search-form">
          <div className="dropdown-button-container dropdown-container">
            <Dropdown drop="start">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <BsFillPersonFill />
              </Dropdown.Toggle>

              <Dropdown.Menu align="right">
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item onClick={login}>Login</Dropdown.Item>{" "}
                {/* Add the login function to the Login menu item */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <h1 className="form-title">Delicious Recipes with Recipe Finder</h1>
          <p className="form-description">
            Turn your leftover ingredients into culinary masterpieces! With
            Recipe Finder, simply enter the ingredients you have on hand and
            unlock a world of mouthwatering recipes tailored to your pantry.
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
  }

  return (
    <div className="recipe-search-container background-image">
      <div className="recipe-search-form">
        <div className="dropdown-button-container dropdown-container">
          <Dropdown drop="start">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <BsFillPersonFill />
            </Dropdown.Toggle>

            <Dropdown.Menu align="right">
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
