CREATE DATABASE pern_stack;

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    Description VARCHAR(255)
);