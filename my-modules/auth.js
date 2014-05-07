/**
 * Created by Johnson on 5/6/14.
 */

var mysql = require('mysql');

module.exports = {

    validLogin: function(username, password, cb)
    {
        console.log("validating user");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         SELECT 1 FROM users WHERE users.username = x AND users.password = y
         */

        connection.connect(function(err)
        {
            var sql =  "SELECT * FROM users WHERE users.username = ? AND users.password = ?";

            connection.query(sql, [username, password], function(err, rows){
                //rows = results
                console.assert(r.length <= 1, "There is more than 1 matching user");
                cb(rows);   //control going back to app.js  the parallel call
            });

        });
    }

};