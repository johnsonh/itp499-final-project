/**
 * Created by Johnson on 5/6/14.
 */

module.exports = {
    'testValidArtistCreation': function(beforeExit, assert)
    {
        var admin = require('./my-modules/admin');

        var artist = "Muse";

        admin.createArtist(artist, function(results)
        {
            console.assert(results.affectedRows == 1, "There was more than 1 row affected");
        });

    },

    'testInvalidSongDeletion': function(beforeExit, assert)
    {
        var admin = require('./my-modules/admin');

        var song = "sdjfklsdjfk";

        admin.deleteSong(song, function(results)
        {
            console.assert(results.affectedRows == 0, "There was more than 0 rows affected");
        });

    }

};