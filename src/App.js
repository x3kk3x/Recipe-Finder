import "./App.css";
import RecipeSearch from "./components/RecipeSearch/RecipeSearch";
import RecipeList from "./components/RecipeList/RecipeList";
import Login from "./components/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      {
        <Login />
        /* <RecipeSearch />
           <RecipeList /> */
      }
    </div>
  );
}

export default App;
