const express = require("express");

const authRoutes = require("../routes/authRoutes");
const poolRoutes = require("../routes/poolRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/pools", poolRoutes);

app.get("/", (req, res) => {
  res.send("POOLER Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});