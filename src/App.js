import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import RecipeSearch from "./components/Controllers/RecipeSearch/RecipeSearch";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import Profile from "./components/Pages/Profile";
import ForgotPassword from "./components/Auth/ForgotPassword";
import RegistrationSuccessful from "./components/Auth/RegistrationSuccessful";
import { AuthProvider } from "./components/Auth/AuthContext";

const App = () => {
    return (
    <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/recipe-search" element={<RecipeSearch />} />
            <Route path="/forgotten-password" element={<ForgotPassword />} />
            <Route
              path="/registration-successfull"
              element={<RegistrationSuccessful />}
            />
             <Route
              path="/profile"
              element={<Profile />}
            />
          </Routes>
        </AuthProvider>
    </Router>
  );
};

export default App;
