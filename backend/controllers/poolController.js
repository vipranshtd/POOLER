const pool = require("../config/db");

const createPool = async (req, res) => {
  try {

    const {
      source,
      destination,
      departure_time,
      required_people
    } = req.body;

    const creator_id = req.user.userId;

    const result = await pool.query(
      `
      INSERT INTO pools
      (
        creator_id,
        source,
        destination,
        departure_time,
        required_people
      )
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        creator_id,
        source,
        destination,
        departure_time,
        required_people
      ]
    );

    res.status(201).json({
      message: "Pool created successfully",
      pool: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Pool creation failed"
    });
  }
};

module.exports = {
  createPool
};