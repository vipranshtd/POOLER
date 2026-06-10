const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "pooler_db",
    password: "vippy99",
    port: 5432,
});

module.exports = pool;