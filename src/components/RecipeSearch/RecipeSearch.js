import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const RecipeSearch = () => {
  const handleSearch = (event) => {
    // Handle the search logic
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for recipes"
              aria-label="Search for recipes"
              aria-describedby="search-button"
            />
            <Button variant="primary" id="search-button" onClick={handleSearch}>
              Search
            </Button>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
