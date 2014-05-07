/**
 * Created by Johnson on 5/6/14.
 */

var request = require("request");

var endpoint1 = "http://en.wikipedia.org/w/api.php?format=json&action=parse&page=";
var endpoint2 = "&prop=text&section=0";

module.exports = {

    getPage: function(term, apiCB)
    {
        console.log("getting page from Wikipedia");

        term = term.split(' ').join('+');
        var url = endpoint1 + song + endpoint2;

        request({
            url: url,
            json: true
        },
        function(error, response, body)
        {
            if (!error && response.statusCode === 200) {
                console.log(body.parse.text); // Print the json response

                apiCB(body.parse.text);

            }
        });

    }





};
