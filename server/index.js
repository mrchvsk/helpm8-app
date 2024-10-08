const express = require('express');
const app = express();

const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization'
}));

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
        if (results && results.length > 0) {
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

/* 
//OLD SETUP WITHOUT PARTICIPATION
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
*/

//NEW SETUP WITH PARTICIPATION
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

            //creating participation table
            const createParticipation = `
                CREATE TABLE participation (
                    pid INT AUTO_INCREMENT PRIMARY KEY,
                    uid INT,
                    oid INT,
                    participation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (uid) REFERENCES user(uid),
                    FOREIGN KEY (oid) REFERENCES offer(oid)
                );
            `;
            connection.query(createParticipation, (err) => {
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
const jwtSecret = 'test123';

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (results.length > 0) {
            const user = results[0];
            const token = jwt.sign({ id: user.uid, email: user.email }, jwtSecret);
            res.json({ message: 'Login successful', token, user: { id: user.uid, firstName: user.firstName, lastName: user.lastName, email: user.email } });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

app.get('/protected', verifyToken, (req, res) => {
    res.json({
        message: 'Protected Route',
        authData: req.authData
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken, jwtSecret, (err, authData) => {
            if (err) {
                return res.sendStatus(403); 
            }
            req.authData = authData;
            next();
        });
    } else {
        res.sendStatus(403); 
    }
}

//preview offers fetching
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

//all offers fetching
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

// new offer
app.post('/newOffer', (req, res) => {
    const { uid, title, description, category, country, city, date, budget, frequency, skillsReq, partMax } = req.body;

    const sql = `
        INSERT INTO offer (uid, title, description, category, country, city, date, budget, frequency, skillsReq, part, partMax, likes, dislikes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, 0, 0)
    `;

    connection.query(sql, [uid, title, description, category, country, city, date, budget, frequency, skillsReq, partMax], (err, result) => {
        if (err) {
            console.error('Failed to insert new offer:', err);
            return res.status(500).json({ error: 'Failed to insert new offer' });
        }
        res.status(201).json({ message: 'New offer created successfully', offerId: result.insertId });
    });
});

//get specific order details
app.get('/offers/:id', (req, res) => {
    const id = req.params.id;

    connection.connect(function (err) {
        if (err) { throw err; }

        const sql = "SELECT * FROM offer WHERE oid = ?";
        connection.query(sql, [id], function (err, result) {
            if (err) {
                throw err;
            }

            res.json(result);
        });
    });
});

// updated
app.post('/participate', (req, res) => {
    const { uid, oid } = req.body;

    const insertParticipation = `INSERT INTO participation (uid, oid) VALUES (?, ?);`;

    connection.query(insertParticipation, [uid, oid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to record participation' });
        }

        const updateParticipators = `UPDATE offer SET part = part + 1 WHERE oid = ?;`;

        connection.query(updateParticipators, [oid], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update part count' });
            }

            res.status(201).json({ message: 'Success' });
        });
    });
});

//likes and dislikes logic
app.put('/offers/:id/likeDislike', (req, res) => {
    const { id } = req.params;
    const { action } = req.body;

    let likeNumber = 0;
    let dislikeNumber = 0;

    if (action === 'like') {
        likeNumber = 1;
    } else if (action === 'dislike') {
        dislikeNumber = 1;
    }

    const sql = `UPDATE offer SET likes = likes + ?, dislikes = dislikes + ? WHERE oid = ?; `;

    connection.query(sql, [likeNumber, dislikeNumber, id], (err) => {
        if (err) {
            console.error('Failed to update likes/dislikes:', err);
            return res.status(500).json({ error: 'Failed to update likes/dislikes' });
        }
        res.status(200).json({ message: 'Action completed successfully' });
    });
});

//SERVER START
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});