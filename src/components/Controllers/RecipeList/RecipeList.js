import React, { useState } from 'react';
import RecipeModal from '../../RecipeModal/RecipeModal'; // Ensure this path is correct

const RecipeList = ({ recipes, userId }) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = (recipe) => {
        setSelectedRecipe(recipe); // Set the selected recipe
        setIsModalVisible(true);    // Show the modal
        console.log("Selected recipe:", recipe);  // Log the selected recipe
        console.log("Modal visible:", true); 
    };

    const closeModal = () => {
        setIsModalVisible(false);   // Hide the modal
        setSelectedRecipe(null);    // Clear the selected recipe
    };

    return (
        <div>
            {recipes.map((recipe, index) => {
                const key = recipe.id ? `recipe-${recipe.id}` : `recipe-${index}`;
                return (
                  <div key={key} onClick={() => openModal(recipe)} style={{ cursor: 'pointer' }}>

                        <h3>{recipe.title}</h3>
                        {/* More recipe details */}
                    </div>
                );
            })}

            {/* Render RecipeModal only if a recipe is selected and modal visibility is true */}
            {selectedRecipe && isModalVisible && (
                <RecipeModal
                    recipe={selectedRecipe}
                    visible={isModalVisible}
                    onClose={closeModal}
                    userId={userId}
                />
            )}
        </div>
    );
};

export default RecipeList;
