CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    password_hash TEXT,
    trust_score INT DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE pools (
    pool_id SERIAL PRIMARY KEY,

    creator_id INT,

    source VARCHAR(255),

    destination VARCHAR(255),

    departure_time TIMESTAMP,

    required_people INT,

    status VARCHAR(20) DEFAULT 'OPEN',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (creator_id)
    REFERENCES users(user_id)
);
CREATE TABLE pool_members (

    pool_id INT,

    user_id INT,

    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(pool_id,user_id),

    FOREIGN KEY(pool_id)
    REFERENCES pools(pool_id),

    FOREIGN KEY(user_id)
    REFERENCES users(user_id)
);
CREATE TABLE messages (

    message_id SERIAL PRIMARY KEY,

    pool_id INT,

    sender_id INT,

    message TEXT,

    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(pool_id)
    REFERENCES pools(pool_id),

    FOREIGN KEY(sender_id)
    REFERENCES users(user_id)
);