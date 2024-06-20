const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "webdev",
    password: "webDevelopment",
    database: "helpm8"
});

module.exports = dbConnection;
