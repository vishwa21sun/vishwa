const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_password',
    port: 5432,
});

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    try {
        const { name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp } = req.body;

        // Validate email
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Validate credit card number
        if (!isValidCreditCardNumber(cardNumber)) {
            return res.status(400).json({ error: 'Invalid credit card number' });
        }

        const query = `
            INSERT INTO customer (name, address, email, date_of_birth, gender, age, card_holder_name, card_number, expiry_date, cvv, timestamp)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id;
        `;
        const values = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp];

        const result = await pool.query(query, values);
        const customerId = result.rows[0].id;

        return res.status(201).json({
            message: `Customer ${name} has been registered`,
            customerId: customerId
        });
    } catch (error) {
        console.error('Error registering customer:', error);
        return res.status(400).json({ error: 'Bad Request' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function isValidEmail(email) {
    // You can implement your email validation logic here
    // For simplicity, a basic validation is shown
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidCreditCardNumber(cardNumber) {
    // Validate credit card number (12 digits)
    const cardNumberRegex = /^\d{12}$/;
    return cardNumberRegex.test(cardNumber);
}
