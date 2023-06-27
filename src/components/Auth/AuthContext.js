import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../services/Firebase/firebase"; // Import your Firebase authentication instance
import { useSession, setSession } from "react-session";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const session = useSession(); // Call the useSession function instead of destructuring

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      // Set session data based on authentication status
      if (user) {
        setSession({ loggedIn: true, userId: user.uid });
      } else {
        setSession({ loggedIn: false, userId: null });
      }
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
    session, // Include session data in the context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
