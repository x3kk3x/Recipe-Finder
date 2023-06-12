import "./App.css";
import RecipeSearch from "./components/RecipeSearch/RecipeSearch";
import RecipeList from "./components/RecipeList/RecipeList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <RecipeSearch />
      <RecipeList />
    </div>
  );
}

export default App;
