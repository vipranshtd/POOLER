const pool = require("../config/db");

async function testDB() {
    try {
        const result = await pool.query(
            "SELECT current_database();"
        );

        console.log("Connected to:", result.rows[0]);
    } catch (err) {
        console.error(err);
    }
}

testDB();