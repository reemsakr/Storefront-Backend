
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password_digest VARCHAR(255),
    username VARCHAR(255)
);