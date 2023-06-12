import axios from "axios";

const RecipeService = {
  searchRecipes: async (query) => {
    const apiKey = "a96769467aaaa12dd02251275db36ac8";
    const appId = "469eecfc";
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const recipeData = response.data.hits.map((hit) => hit.recipe);
      return recipeData;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  },
};

export default RecipeService;
