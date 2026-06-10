const pool = require("../config/db");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users
      (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Registration failed",
    });
  }
};

module.exports = {
  registerUser,
};