CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    age INT NOT NULL,
    card_holder_name VARCHAR(255) NOT NULL,
    card_number VARCHAR(12) NOT NULL,
    expiry_date VARCHAR(7) NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
