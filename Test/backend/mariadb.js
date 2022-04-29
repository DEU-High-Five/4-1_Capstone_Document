const mariadb = require('mysql');
const connection = mariadb.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'hifiveDB',
    connectionLimit: 5,
    multipleStatements: true
});  
module.exports = connection;