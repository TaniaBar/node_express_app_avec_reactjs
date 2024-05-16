// connexion à la base des données
const mysql = require('mysql');
console.log('Get connection ...');

const connection = mysql.createConnection({
    database: 'restaurants',
    host: "localhost",
    user: "root",
    password: "root"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected !");
});

module.exports = connection;