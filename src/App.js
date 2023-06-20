import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import RecipeSearch from "./components/RecipeSearch/RecipeSearch";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import RegistrationSuccessful from "./components/Auth/RegistrationSuccessful";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipe-search" element={<RecipeSearch />} />
        <Route path="/forgotten-password" element={<ForgotPassword />} />
        <Route
          path="/registration-successfull"
          element={<RegistrationSuccessful />}
        />
      </Routes>
    </Router>
  );
};

export default App;
