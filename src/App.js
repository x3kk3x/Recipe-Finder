import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import RecipeSearch from "./components/RecipeSearch/RecipeSearch";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeSearch />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
