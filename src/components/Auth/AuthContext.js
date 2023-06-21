import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../services/Firebase/firebase"; // Import your Firebase authentication instance

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Clean up the subscription on unmount
    return unsubscribe;
  }, []);

  // Function to register a new user
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // Function to log in an existing user
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // Function to log out the current user
  function logout() {
    return auth.signOut();
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
