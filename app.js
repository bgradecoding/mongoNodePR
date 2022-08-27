const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/user");

const users = [];

const MONGO_URI =
  "mongodb+srv://sosangsosang:UOsgMwrQ0oYLWCWl@cluster0.l8v54yp.mongodb.net/blogService";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
  }
}

connectDB();
app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.send(user);
});

app.listen(7000, () => {
  console.log("Server started on port 3000");
});
