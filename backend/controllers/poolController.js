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
const getAllPools = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT *
      FROM pools
      WHERE status='OPEN'
      ORDER BY created_at DESC
      `
    );

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch pools"
    });
  }
};

const joinPool = async (req, res) => {
  try {

    const pool_id = req.params.id;

    const user_id = req.user.userId;

    const result = await pool.query(
      `
      INSERT INTO pool_members
      (pool_id, user_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [pool_id, user_id]
    );

    res.status(201).json({
      message: "Joined pool successfully",
      membership: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to join pool"
    });
  }
};


module.exports = {
  createPool,
  getAllPools,
  joinPool
};