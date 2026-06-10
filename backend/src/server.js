const express = require("express");

const authRoutes = require("../routes/authRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("POOLER Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});