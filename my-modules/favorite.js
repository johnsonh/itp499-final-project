
/**
 * Created by Johnson on 5/6/14.
 */

var mysql = require('mysql');

module.exports = {

    favoriteSong: function(userID, songID, queryCB)
    {
        console.log("adding favorite songs");


        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         INSERT INTO `johnson`.`favorite_songs` (`ID`, `user_id`, `song_id`) VALUES (NULL, '2', '7');
         */

        connection.connect(function(err)
        {
            var sql =  "INSERT INTO favorite_songs (`ID`, `user_id`, `song_id`) VALUES (NULL, ?, ?);";

            connection.query(sql, [userID, songID], function(err, rows){
                //rows = results
                queryCB(rows);   //control going back to app.js  the parallel call
            });

        });

    },


    favoriteArtist: function(userID, artistID, queryCB)
    {
        console.log("adding favorite artistIDs");

        var connection = mysql.createConnection({
            host: 'itp460.usc.edu',
            user: 'johnson',
            password: 'angular',
            database: 'johnson'
        });

        /*
         INSERT INTO `johnson`.`favorite_artists` (`ID`, `user_id`, `artist_id`) VALUES (NULL, '2', '7');
         */

        connection.connect(function(err)
        {
            var sql =  "INSERT INTO favorite_artists (`ID`, `user_id`, `artist_id`) VALUES (NULL, ?, ?);";

            connection.query(sql, [userID, artistID], function(err, rows){
                //rows = results
                queryCB(rows);   //control going back to app.js  the parallel call
            });

        });

    }


}
