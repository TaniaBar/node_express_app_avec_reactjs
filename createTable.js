const connection = require('./connexion');
const mysql = require('mysql');

// on verifie si les tables existent déjà
function checkTableExists(tableName) {
    return new Promise((resolve, reject) => {
        connection.query(`SHOW TABLE LIKE '${tableName}'`, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.lenght > 0);
            }
        });
    });
}

// // creation table Restaurants
//     // si la table exist on la efface avant de la recréer
//     let sql1 = "DROP TABLE IF EXISTS Restaurants";

//     connection.query(sql1, function(err) {
//         if (err) throw err;
//         console.log("Table Restaurants dropped");
//     });

// let createTableRestaurants = "CREATE TABLE Restaurants (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, city VARCHAR(100) NOT NULL, nbcouverts INT(10) NOT NULL, terrasse VARCHAR(3) NOT NULL, parking VARCHAR(3) )";

// connection.query(createTableRestaurants, function(err) {
//     if (err) throw err;
//     console.log("Table Restaurants created");
// });

// // creation table Employes
//     // si la table exist on la efface avant de la recréer
//     let dropEmployes = "DROP TABLE IF EXISTS Employes";

//     connection.query(dropEmployes, function(err) {
//         if (err) throw err;
//         console.log("Table Employes dropped");
//     });

// let createTableEmployes = "CREATE TABLE Employes (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, hire_date DATE NOT NULL, restaurant_id INT NOT NULL )";

// connection.query(createTableEmployes, function(err) {
//     if (err) throw err;
//     console.log("Table Employes created");
// });

// function to create table Restaurants
async function createTableRestaurants() {
    try {
        const tableExists = await checkTableExists('Restaurants');
        if (!tableExists) {
            let sql = `
                CREATE TABLE Restaurants (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    city VARCHAR(100) NOT NULL,
                    nbcouverts INT(10) NOT NULL,
                    terrasse VARCHAR(3) NOT NULL,
                    parking VARCHAR(3)
                )`;
    
            connection.query(sql, (err) => {
                if (err) throw err;
                console.log("Table Restaurants created");
            });
        } else {
            console.log("Table Restaurants already exists");
        }
    } catch (error) {
        console.error("Error checking/creating Restaurants table:", error);
    }
}

// function to create table Employes
async function createTableEmployes() {
    try {
        const tableExists = await checkTableExists('Employes');
        if (!tableExists) {
            let sql = `
                CREATE TABLE Employes (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    first_name VARCHAR(100) NOT NULL,
                    last_name VARCHAR(100) NOT NULL,
                    hire_date DATE NOT NULL,
                    restaurant_id INT NOT NULL
                )`;
    
            connection.query(sql, (err) => {
                if (err) throw err;
                console.log("Table Employes created");
            });
        } else {
            console.log("Table Employes already exists");
        }
    } catch (error) {
        console.error("Error checking/creating Employes table:", error);
    }
}

// Create tables
createTableRestaurants();
createTableEmployes();

module.exports = createTableRestaurants;
module.exports = createTableEmployes;
