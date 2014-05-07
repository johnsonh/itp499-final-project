/**
 * Created by Johnson on 5/6/14.
 */

var mysql = require('mysql');
var q = require('q');

module.exports = {
    getFavoriteSongs: function(username, queryCB)
    {
        console.log("getting favorite songs");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         SELECT * FROM songs
         RIGHT JOIN favorite_songs
         ON songs.ID = favorite_songs.song_id
         LEFT JOIN users
         ON users.ID = favorite_songs.user_id
         WHERE users.username = 'johnson'
         */

        connection.connect(function(err)
        {
            var sql =  "SELECT * FROM songs RIGHT JOIN favorite_songs ON songs.ID = favorite_songs.song_id LEFT JOIN users ON users.ID = favorite_songs.user_id WHERE users.username = ?";

            connection.query(sql, [username], function(err, rows){
                //rows = results
                queryCB(rows);   //control going back to app.js  the parallel call
            });

        });

    },

    getFavoriteArtists: function(username, queryCB)
    {
        console.log("getting favorite artists");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         SELECT * FROM artists
         RIGHT JOIN favorite_artists
         ON artists.ID = favorite_artists.artist_id
         LEFT JOIN users
         ON users.ID = favorite_artists.user_id
         WHERE users.username = 'johnson'
         */

        connection.connect(function(err)
        {
            var sql =  "SELECT * FROM artists RIGHT JOIN favorite_artists ON artists.ID = favorite_artists.artist_id LEFT JOIN users ON users.ID = favorite_artists.user_id WHERE users.username = ?";

            connection.query(sql, [username], function(err, rows){
                //rows = results
                queryCB(rows);   //control going back to app.js  the parallel call
            });

        });
    },

    getSongs: function(title, queryCB)
    {
        console.log("getting songs");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         SELECT * FROM `songs` WHERE title like '%e%'
         */

        connection.connect(function(err)
        {
            var sql =  "SELECT * FROM `songs` WHERE title like ?";

            connection.query(sql, ['%' + title + '%'], function(err, rows){
                //rows = results
                queryCB(rows);   //control going back to app.js  the parallel call
            });
        });
    },

    getArtists: function(name, queryCB)
    {
        console.log("getting artists");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         SELECT * FROM `artists` WHERE artist_name like '%e%'
         */

        connection.connect(function(err)
        {
             var sql =  "SELECT * FROM `artists` WHERE artist_name like ?";

            connection.query(sql, ['%' + name + '%'], function(err, rows){
                queryCB(rows);   //control going back to app.js  the parallel call
            });
        });
    }


};
