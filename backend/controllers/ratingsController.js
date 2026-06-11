const pool = require("../config/db");

const submitRating = async (req, res) => {
  try {

    const {
      pool_id,
      reviewed_user_id,
      rating
    } = req.body;

    const reviewer_id = req.user.userId;

    const result = await pool.query(
      `
      INSERT INTO ratings
      (
        pool_id,
        reviewer_id,
        reviewed_user_id,
        rating
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        pool_id,
        reviewer_id,
        reviewed_user_id,
        rating
      ]
    );

    let scoreChange = 0;

if (rating === 5) scoreChange = 2;
else if (rating === 4) scoreChange = 1;
else if (rating === 2) scoreChange = -1;
else if (rating === 1) scoreChange = -2;

if (scoreChange !== 0) {

  await pool.query(
    `
    UPDATE users
    SET trust_score = trust_score + $1
    WHERE user_id = $2
    `,
    [scoreChange, reviewed_user_id]
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
      reviewed_user_id,
      'rating_received',
      scoreChange
    ]
  );
}

    res.status(201).json({
      message: "Rating submitted",
      rating: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to submit rating"
    });
  }
};

module.exports = {
  submitRating
};