const pool = require("../config/db");

const getProfile = async (req, res) => {
  try {

    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        user_id,
        name,
        email,
        trust_score,
        created_at
      FROM users
      WHERE user_id = $1
      `,
      [userId]
    );

    res.status(200).json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile"
    });
  }
};

module.exports = {
  getProfile
};