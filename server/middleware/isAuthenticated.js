require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  // middleware function to check authentication
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get("Authorization");

    // checks if token exists
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    let token;

    try {
      // verifies the token using the secret
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }

    // checks if the token verification was successful
    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    next(); // will only be ran if authenticated
  },
};
