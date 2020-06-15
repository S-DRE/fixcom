var mysql = require('mysql');
var CONFIG = require("../config.json");

var POOL = mysql.createPool({
    host: CONFIG.dbHost,
    database: CONFIG.dbName,
    user: CONFIG.dbUser,
    password: CONFIG.dbPassword
});

POOL.getConnection((err, connection) => {
    if (err) {
        throw err;
    }

    if (connection) {
        connection.release();
    }

     
});

module.exports = POOL;