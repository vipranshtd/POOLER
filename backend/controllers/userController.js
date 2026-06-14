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

const getTrustHistory = async (req, res) => {
  try {

    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT
        action,
        score_change,
        created_at
      FROM trust_events
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch trust history"
    });
  }
};

const getUserStats = async (req, res) => {
  try {

    const userId = req.user.userId;

    const profile = await pool.query(
      `
      SELECT
        user_id,
        trust_score
      FROM users
      WHERE user_id = $1
      `,
      [userId]
    );

    const created = await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM pools
      WHERE creator_id = $1
      `,
      [userId]
    );

    const joined = await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM pool_members
      WHERE user_id = $1
      `,
      [userId]
    );

    const completed = await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM pools
      WHERE creator_id = $1
      AND completed = TRUE
      `,
      [userId]
    );

    const rating = await pool.query(
      `
      SELECT AVG(rating) AS avg_rating
      FROM ratings
      WHERE reviewed_user_id = $1
      `,
      [userId]
    );

    res.status(200).json({
      user_id: userId,
      pools_created: created.rows[0].count,
      pools_joined: joined.rows[0].count,
      pools_completed: completed.rows[0].count,
      average_rating: rating.rows[0].avg_rating,
      trust_score: profile.rows[0].trust_score
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch stats"
    });
  }
};

module.exports = {
  getProfile,
  getTrustHistory,
  getUserStats
};