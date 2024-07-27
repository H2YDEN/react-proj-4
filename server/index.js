const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 4005;
const { login, register } = require("./controllers/auth");
const {
  addPost,
  getAllPosts,
  getCurrentUserPosts,
  editPost,
  deletePost,
} = require("./controllers/posts");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");

User.hasMany(Post);
Post.belongsTo(User);

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);

app.get("/posts", getAllPosts);
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
  .sync()
  .then(() =>
    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    })
  )
  .catch((err) => console.log(err));
