/*https://github.com/felixge/node-mysql*/
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

connection.query()
    .select(["id", "user", "email"])
    .from("users")
    .where("role IN ?", [
        ["administrator", "user"]
    ])
    .and("created > ?", [new Date(2011, 1, 1)])
    .execute(function(error, rows, columns) {
        if (error) {
            console.log('ERROR: ' + error);
            return;
        }
        // Do something with rows & columns
    });

connection.end();