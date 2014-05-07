/**
 * Created by Johnson on 5/6/14.
 */

module.exports = {
    'testValidUser': function(beforeExit, assert)
    {
        var auth = require('./my-modules/auth');

        var user = "johnson";
        var pass = "hsieh";

        auth.validLogin(user, pass, function(results)
        {
            console.assert(results.length == 1, "There is not exactly 1 matching user");
        });

    },

    'testInvalidUser': function(beforeExit, assert)
    {
        var auth = require('./my-modules/auth');

        var user = "asdfsdf";
        var pass = "jiojdfo";

        auth.validLogin(user, pass, function(results)
        {
            console.assert(results.length == 0, "There is more than 0 matching userS");
        });

    }

};