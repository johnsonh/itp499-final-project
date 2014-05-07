/**
 * Created by Johnson on 5/6/14.
 */

var mysql = require('mysql');
var q = require('q');

module.exports = {

    createUser: function(username, pass, queryCB)
    {
        console.log("creating user");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         INSERT INTO  `johnson`.`users` (
         `ID` ,
         `username` ,
         `password` ,
         `admin`
         )
         VALUES (
         NULL ,  'test',  'test',  '0'
         );
         */

        connection.connect(function(err)
        {
            var sql =  "INSERT INTO users (`ID`, `username`, `password`, `admin`) VALUES (NULL ,  ?,  ?,  '0');";

            connection.query(sql, [username, pass], function(err, result){
                //result = results
                console.assert(result.affectedRows <= 1, "There was more than 1 row affected");
                queryCB(result);   //control going back to app.js  the parallel call
            });

        });

    },

    createArtist: function(artist, queryCB)
    {
        console.log("creating artist");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         INSERT INTO `johnson`.`artists` (`ID`, `artist_name`) VALUES (NULL, 'Journey');
         */

        connection.connect(function(err)
        {
            var sql =  "INSERT INTO artists (`ID`, `artist_name`) VALUES (NULL ,  ?);";

            connection.query(sql, [artist], function(err, result){
                //result = results
                console.assert(result.affectedRows <= 1, "There was more than 1 row affected");
                queryCB(result);   //control going back to app.js  the parallel call
            });

        });

    },

    createSong: function(title, artist, queryCB)
    {
        console.log("creating song");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         INSERT INTO  `johnson`.`songs` (
         `ID` ,
         `title` ,
         `artist_id`
         )
         VALUES (
         NULL ,  'Separate Ways',  '6'
         );
         */

        connection.connect(function(err)
        {
            var sql =  "INSERT INTO songs (`ID`, `title`, `artist_id`) VALUES (NULL , ?, ?);";

            connection.query(sql, [title, artist], function(err, result){
                //result = results
                console.assert(result.affectedRows <= 1, "There was more than 1 row affected");
                queryCB(result);   //control going back to app.js  the parallel call
            });

        });

    },

    deleteArtist: function(artist, queryCB)
    {
        console.log("deleting artist");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         DELETE FROM artists WHERE artist.artist_name = x
         */

        connection.connect(function(err)
        {
            var sql =  "DELETE FROM artists WHERE artists.ID = ?";

            connection.query(sql, [artist], function(err, result){
                //result = results
                console.assert(result.affectedRows <= 1, "There was more than 1 row affected");
                queryCB(result);   //control going back to app.js  the parallel call
            });

        });

    },

    deleteSong: function(title, queryCB)
    {
        console.log("deleting song");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         DELETE FROM songs WHERE songs.ID = x
         */

        connection.connect(function(err)
        {
            var sql =  "DELETE FROM songs WHERE songs.title = ?";

            connection.query(sql, [title], function(err, result){
                //result = results
                console.assert(result.affectedRows <= 1, "There was more than 1 row affected");
                queryCB(result);   //control going back to app.js  the parallel call
            });

        });

    },

};