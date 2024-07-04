const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'helpm8-admin',
    password: 'WEBdevCo2!'
});

app.get('/', (req, res) => {
    res.send("API Entry Point");
});

//used to connect when db exists
connection.connect((err) => {
    if (err) {
        console.log('Error connecting mysql', err);
        return;
    }

    connection.query("SHOW DATABASES LIKE 'helpm8'", (err, results) => {

        //if db exists
        if (results.length > 0) {
            connection.changeUser({ database: 'helpm8' }, (err) => {
                if (err) {
                    console.error('Error using helpm8:', err);
                    return;
                }
            });
            //if the db does not exist
        } else {
            setup();
        }
    });
});

function setup() {
    const createDb = `CREATE DATABASE helpm8`;
    connection.query(createDb, (err) => {
        if (err) {
            return;
        }

        connection.changeUser({ database: 'helpm8' }, (err) => {
            if (err) {
                return;
            }

            //creating user table
            const createUser = `
                CREATE TABLE user (
                    uid INT AUTO_INCREMENT PRIMARY KEY,
                    firstName VARCHAR(255),
                    lastName VARCHAR(255),
                    email VARCHAR(255),
                    country VARCHAR(255),
                    city VARCHAR(255),
                    password VARCHAR(255),
                    joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;
            connection.query(createUser, (err) => {
                if (err) {
                    console.error('Error creating table:', err);
                    return;
                }
            });

            //creating offer table
            const createOffer = `
                CREATE TABLE offer (
                oid INT AUTO_INCREMENT PRIMARY KEY,
                uid INT,
                title VARCHAR(255),
                description TEXT,
                category VARCHAR(255),
                country VARCHAR(100),
                city VARCHAR(100),
                date DATE,
                budget INT,
                frequency VARCHAR(30),
                skillsReq BOOLEAN,
                likes INT,
                dislikes INT,
                part INT,
                partMax INT,
                created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (uid) REFERENCES user(uid)
                );
            `;
            connection.query(createOffer, (err) => {
                if (err) {
                    console.error('Error creating table:', err);
                    return;
                }
            });

            //populating user table
            const users = require('./dbData/userData');
            const insertUser = `INSERT INTO user (firstName, lastName, email, country, city, password) VALUES ?`;
            const userValues = users.map(user => [user.firstName, user.lastName, user.email, user.country, user.city, user.password]);
            connection.query(insertUser, [userValues], (err) => {
                if (err) {
                    return;
                }
            });

            //populating offer table
            const offers = require('./dbData/offerData');
            const insertOffer = `INSERT INTO offer (uid, title, description, category, country, city, date, budget, frequency, skillsReq, likes, dislikes, part, partMax) VALUES ?`;
            const offerValues = offers.map(offer => [offer.uid, offer.title, offer.description, offer.category, offer.country, offer.city, offer.date, offer.budget, offer.frequency, offer.skillsReq, offer.likes, offer.dislikes, offer.part, offer.partMax]);
            connection.query(insertOffer, [offerValues], (err) => {
                if (err) {
                    return;
                }
            });
        });
    });
}

//all user fetching
app.get('/users', (req, res) => {
    connection.connect(function (err) {
        if (err) {
            console.log("an error occured" + err);
        }
    });

    const sql = "SELECT * FROM user";

    connection.query(sql, function (err, result) {
        if (err) {
            console.log("an error occured" + err);
        }
        res.json(result);
    });
});

//sepcific user fetching
app.get('/users/:id', (req, res) => {
    const id = req.params.id;

    connection.connect(function (err) {
        if (err) { throw err; }

        const sql = "SELECT * FROM user WHERE id = ?";
        connection.query(sql, [id], function (err, result) {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    });
});

//registering user
app.post('/register', (req, res) => {
    const { name, surname, email, country, city, password } = req.body;
    const sql = 'INSERT INTO user (firstname, lastname, email, country, city, password) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [name, surname, email, country, city, password], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send({ message: 'User registered successfully', userId: result.insertId });
        }
    });
});

//logging user
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query(
        'SELECT * FROM user WHERE email = ? AND password = ?', [email, password],
        (results) => {
            if (results.length > 0) {
                const user = results[0];
                const token = jwt.sign({ id: user.id, email: user.email }, '123jbs');
                res.json({ token });
            } 
        }
    );
});

app.get('/protected', verifyToken, (req, res) => {
    jwt.verify(req.token, 'your_jwt_secret', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Protected Route',
                authData
            });
        }
    });
});

// Verify Token Middleware
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}



//all offers fetching
app.get('/offersPreview', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
    });

    const sql = "SELECT oid, title, description, part, partMax FROM offer LIMIT 5";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/offers', (req, res) => {
    connection.connect(function (err) {
        if (err) throw err;
    });

    const sql = "SELECT * FROM offer";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/offers/:id', (req, res) => {
    const id = req.params.id;

    connection.connect(function (err) {
        if (err) { throw err; }

        const sql = "SELECT * FROM offer WHERE id = ?";
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