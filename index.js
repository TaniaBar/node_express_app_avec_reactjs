// I call files connexion.js, createTable.js, routes.js
const connection = require('./connexion');
const createTable = require('./createTable');
const app = require('./routes');

// server is listening at 127.0.0.1:5000
app.listen(5000, ()=> {
    console.log('Server is listening @5000');
});

