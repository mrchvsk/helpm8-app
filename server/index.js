const express = require('express');
const app = express();
const connection = require('./db');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Entry API");
});

//USERS DATA FETCHING
app.get('/users', (req, res) => {
    connection.connect(function (err) {
        if (err) {
            console.log("an error occured" + err);
        }
    });

    const sql = "SELECT * FROM Users";

    connection.query(sql, function (err, result) {
        if (err) {
            console.log("an error occured" + err);
        }
        res.json(result);
    });
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id; 

    connection.connect(function (err) {
        if (err) { throw err; }

        const sql = "SELECT * FROM Users WHERE id = ?";
        connection.query(sql, [id], function (err, result) {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    });
});

app.get('/users/:username', (req, res) => {
    const username = req.params.username;

    connection.connect(function (err) {
        if (err) {
            throw err;
        }

        const sql = "SELECT * FROM Users WHERE username = ?";
        connection.query(sql, [username], function (err, result) {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    });
});

app.post('/register', (req, res) => {
    const { name, surname, email, country, city, password } = req.body;
    const sql = 'INSERT INTO Users (firstname, lastname, email, country, city, password) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [name, surname, email, country, city, password], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send({ message: 'User registered successfully', userId: result.insertId });
        }
    });
});


//OFFERS DATA FETCHING
app.get('/offersPreview', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
    });

    const sql = "SELECT id, title, description, participants, participantsMax FROM Offers LIMIT 5";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/offers', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
    });

    const sql = "SELECT * FROM Offers";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/offers/:id', (req, res) => {
    const id = req.params.id;

    connection.connect(function (err) {
        if (err) { throw err; }

        const sql = "SELECT * FROM Offers WHERE id = ?";
        connection.query(sql, [id], function (err, result) {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    });
});

//SERVER START
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
