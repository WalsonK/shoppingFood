var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // Mac
    // password: '', // Windows
    database: "easyHomeDb",
    port: 3306, // windows : 3306 | mac : 8889
    //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' // Uniquement mac
});

connection.connect((err) => {
    if (!err)
        global.bdd = connection

    return (err) ? console.error('error connecting: ' + err.stack) : console.log('Connected as id ' + connection.threadId);
});