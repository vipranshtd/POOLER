const pool = require("../config/db");

const lateCancel = async (req, res) => {
  try {

    const userId = req.user.userId;

    await pool.query(
      `
      UPDATE users
      SET trust_score = trust_score - 10
      WHERE user_id = $1
      `,
      [userId]
    );

    await pool.query(
      `
      INSERT INTO trust_events
      (
        user_id,
        action,
        score_change
      )
      VALUES ($1,$2,$3)
      `,
      [
        userId,
        'late_cancel',
        -10
      ]
    );

    res.status(200).json({
      message: "Late cancellation recorded"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed"
    });
  }
};

const noShow = async (req, res) => {
  try {

    const userId = req.user.userId;

    await pool.query(
      `
      UPDATE users
      SET trust_score = trust_score - 20
      WHERE user_id = $1
      `,
      [userId]
    );

    await pool.query(
      `
      INSERT INTO trust_events
      (
        user_id,
        action,
        score_change
      )
      VALUES ($1,$2,$3)
      `,
      [
        userId,
        'no_show',
        -20
      ]
    );

    res.status(200).json({
      message: "No-show recorded"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed"
    });
  }
};

module.exports = {
  lateCancel,
  noShow
};