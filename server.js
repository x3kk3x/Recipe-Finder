const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "mySecretKey123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Add other server-side code as needed

const port = process.env.PORT || 5000; // Specify the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
