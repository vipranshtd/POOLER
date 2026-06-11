const express = require("express");

const authRoutes = require("../routes/authRoutes");
const poolRoutes = require("../routes/poolRoutes");
const messageRoutes = require("../routes/messageRoutes");
const userRoutes = require("../routes/userRoutes");
const ratingsRoutes = require("../routes/ratingsRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pools", poolRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ratings", ratingsRoutes);

app.get("/", (req, res) => {
  res.send("POOLER Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});