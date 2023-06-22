import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import RecipeSearch from "./components/Controllers/RecipeSearch/RecipeSearch";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import RegistrationSuccessful from "./components/Auth/RegistrationSuccessful";
import { AuthProvider } from "./components/Auth/AuthContext";
const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "MySecretKey123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

const App = () => {
  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
};

export default App;
