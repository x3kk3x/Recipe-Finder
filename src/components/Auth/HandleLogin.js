const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      // After successful login
      req.session.userId = user.id;
      console.log("User ID stored in session:", req.session.userId);
  
      navigate("/recipe-search"); // Redirect the user to the dashboard or desired page
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login error
    }
  };