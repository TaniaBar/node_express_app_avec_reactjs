const express = require('express');
const connection = require('./connexion');
const mysql = require('mysql');

const app = express();

// middleware pour que node puisse inerpreter le body json envoyé par Postman
app.use(express.json());

// Route Home
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js & Express server');
});

// route /POST/restaurant
app.post('/restaurant', (req, res) => {
    let sql = "INSERT INTO restaurants (name, city, nbcouverts, terrasse, parking) "
    + " VALUES ('" + req.body.name + "', '"
    + req.body.city + "', '"
    + req.body.nbcouverts + "', '"
    + req.body.terrasse + "', '"
    + req.body.parking + "')";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        console.log("Insert a record !");
    });
    res.status(200);
});

// route GET/restaurants
app.get('/restaurant', (req, res) => {
    var sql_template = "Select * from ?? ";
    var replaces = ['restaurants'];
    sql = mysql.format(sql_template, replaces);
    connection.query(sql, function(err, rows) {
        if (err) throw err;
        res.send(rows)
    });
    res.status(200);
});

// route GET/restaurant/:id
app.get('/restaurant/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let sql_template = "Select * from restaurants WHERE id = " + id;
    let replaces = ['restaurants', 'id'];
    sql = mysql.format(sql_template, replaces);
    connection.query(sql, function(err, row, fields) {
        if (err) throw err;
        res.send(row);
    });
    res.status(200);
});

// Route/PUT/restaurant/:id
app.put("/restaurant/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, city, nbcouverts, terrasse, parking } = req.body;

    const updateRestaurant = `UPDATE restaurants SET name='${name}', city='${city}', nbcouverts=${nbcouverts}, terrasse='${terrasse}', parking='${parking}'  WHERE id=${id}`;

    connection.query(updateRestaurant, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send("Error updating a restaurant");
        } else {
            res.status(200).send("Restaurant updated successfully 🎉");
        }
    });
});

// DELETE/restaurant/:id ************************ code ok
// app.delete('/restaurant/:id', (req, res) => {
//     const id = parseInt(req.params.id);

//     let deleteRestaurant = `DELETE FROM restaurants WHERE id=${id}`;

//     connection.query(deleteRestaurant, function (err) {
//         if (err) {
//             console.log(err);
//             res.status(500).send("Error delete a restaurant");
//         } else {
//             res.status(200).send("Restaurant deleted successfully 🎉");
//         }
//     });
    
//     res.status(200);
// });

// DELETE/restaurant/:id et chaque employee lié à ce restaurant
app.delete('/restaurant/:id', (req, res) => {
    const id = parseInt(req.params.id);

    let deleteRestaurant = `DELETE FROM restaurants WHERE id=${id}`;

    let deleteEmployes = `DELETE FROM employes WHERE restaurant_id=${id}`;

    connection.query(deleteEmployes, [id], function (err) {
        if (err) {
            console.log(err);
            res.status(500).send("Error delete employees");
        } else {
            res.status(200);
        }
    });

    connection.query(deleteRestaurant, [id], function (err) {
        if (err) {
            console.log(err);
            res.status(500).send("Error delete a restaurant");
        } else {
            res.status(200);
        }
    });
    res.status(200).send("Restaurant and associated employees deleted successfully 🎉");
})
    
// Route POST/restaurant/:idResto/employee
app.post('/restaurant/:id/employees', (req, res) => {
    
    const { first_name, last_name, hire_date, restaurant_id } = req.body;

    if (!first_name || !last_name || !hire_date || !restaurant_id) {
        return res.status(400).send({ error: "All fields are required" });
    }

    const query = 'INSERT INTO Employes (first_name, last_name, hire_date, restaurant_id) VALUES (?, ?, ?, ?)';
    connection.query(query, [first_name, last_name, hire_date, restaurant_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ message: "Employee added successfully", employeeId: results.insertId });
    });
});

// Route GET/restaurant/:idResto/employes
app.get('/restaurant/:id/employees', (req, res) => {
    const id = parseInt(req.params.id);

    let getEmployees = "SELECT id, first_name, last_name, DATE_FORMAT(hire_date, '%d-%m-%Y') as hire_date, restaurant_id FROM employes WHERE restaurant_id = ? ";

    connection.query(getEmployees, [id], function(err, row, fields) {
        if (err) {
            console.log(err);
            res.status(500).send("Error get employes");
        } else {
            res.send(row);
        }
    });
    res.status(200);
});

// Route GET/restaurant/:idResto/employes/:idEmploye
app.get('/restaurant/:id/employees/:idEmployee', (req, res) => {
    const id = parseInt(req.params.id);
    const idEmployee = parseInt(req.params.idEmploye);

    let oneEmployee = "SELECT id, first_name, last_name, DATE_FORMAT(hire_date, '%d-%m-%Y') as hire_date, restaurant_id FROM employes WHERE id = ?";

    connection.query(oneEmployee, [idEmployee], function(err, row, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('Error get an employee');
        } else {
            res.send(row);
        }
    });
    res.status(200);
});

// Route PUT/restaurant/:idResto/employes/:idEmploye
app.put('/restaurant/:id/employees/:idEmployee', (req, res) => {
    const id = parseInt(req.params.id);
    const { first_name, last_name, hire_date} = req.body;
    const idEmployee = parseInt(req.params.idEmployee);

    const updateEmployee = `UPDATE employes SET first_name='${first_name}', last_name='${last_name}', hire_date='${hire_date}' WHERE id=${idEmployee}`;

    connection.query(updateEmployee, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send("Error updating an employee");
        } else {
            res.status(200).send("Employee updated successfully 🎉");
        }
    });
});

// Route DELETE/restaurant/:idResto/employes/:idEmploye
app.delete('/restaurant/:id/employees/:idEmployee', (req, res) => {
    const idEmployee = parseInt(req.params.idEmployee);

    let deleteEmployee = `DELETE FROM employes WHERE id=${idEmployee}`;

    connection.query(deleteEmployee, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send("Error delete an employee");
        } else {
            res.status(200).send("Employee deleted successfully 🎉");
        }
    });
    res.status(200);
});

module.exports = app;
