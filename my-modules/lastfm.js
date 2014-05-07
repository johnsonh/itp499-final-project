/**
 * Created by Johnson on 5/6/14.
 */

var request = require("request");

var endpoint = "https://itunes.apple.com/search?term=";

module.exports = {

    getSong: function(song, apiCB)
    {
        console.log("getting song from lastfm");

        song = song.split(' ').join('+');
        var url = endpoint + song;

        request({
            url: url,
            json: true
        },
        function(error, response, body)
        {
            if (!error && response.statusCode === 200) {
                console.log(body.results[0]); // Print the json response

                apiCB(body.results[0]);

            }
        });

    },

    getArtist: function(artist, apiCB)
    {
        console.log("getting artist from lastfm");

        artist = artist.split(' ').join('+');
        var url = endpoint + artist + "&limit=5";

        request({
            url: url,
            json: true
        },
        function(error, response, body)
        {
            if (!error && response.statusCode === 200) {
                console.log(body.results); // Print the json response

                apiCB(body.results);

            }
        });

    }

};