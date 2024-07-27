require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const SECRET = process.env.SECRET;
const axios = require("axios");

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

module.exports = {
  login: async (req, res) => {
    try {
      let { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );

        if (isAuthenticated) {
          let token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 48;

          console.log(foundUser);
          res.status(200).send({
            username: foundUser.dataValues.username,
            userId: foundUser.dataValues.id,
            token,
            exp: exp,
          });
        } else {
          res.status(401).send("Password incorrect.");
        }
      } else {
        res.status(401).send("User does not exist.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("Failed to log in.");
    }
  },
  register: async (req, res) => {
    try {
      let { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });
      console.log(foundUser);
      if (foundUser) {
        return res.status(400).send("Username already exists.");
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      let newUser = await User.create({ username, hashedPass: hash });
      console.log(newUser);
      const token = createToken(
        newUser.dataValues.username,
        newUser.dataValues.id
      );
      const exp = Date.now() + 1000 * 60 * 60 * 48;
      res.status(200).send({
        username: newUser.dataValues.username,
        userId: newUser.dataValues.id,
        token,
        exp: exp,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to register.");
    }
  },
};
