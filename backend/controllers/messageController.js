const pool = require("../config/db");

const sendMessage = async (req, res) => {
  try {

    const {
      pool_id,
      message
    } = req.body;

    const sender_id = req.user.userId;

    const result = await pool.query(
      `
      INSERT INTO messages
      (
        pool_id,
        sender_id,
        message
      )
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [
        pool_id,
        sender_id,
        message
      ]
    );

    res.status(201).json({
      message: "Message sent",
      data: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to send message"
    });
  }
};

const getMessages = async (req, res) => {
  try {

    const poolId = req.params.poolId;

    const result = await pool.query(
      `
      SELECT
        messages.message_id,
        users.name,
        messages.message,
        messages.sent_at
      FROM messages
      JOIN users
      ON messages.sender_id = users.user_id
      WHERE messages.pool_id = $1
      ORDER BY messages.sent_at ASC
      `,
      [poolId]
    );

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch messages"
    });
  }
};

module.exports = {
  sendMessage,
  getMessages
};