var express = require('express');
var app = express();
var mysql = require('mysql');
var async = require('async');
var q = require('q');
var query = require('./my-modules/query');
var admin = require('./my-modules/admin');
var favorite = require('./my-modules/favorite');
var auth = require('./my-modules/auth');
var lastfm = require('./my-modules/lastfm');
var wiki = require('./my-modules/wiki');

var user;

app.configure(function()
{
    //configure the server
    app.set('views', __dirname + '/views');
    //set views as the root directory of stuff

    app.set('view engine', 'ejs');  //set templating engine
    //like handlebars or whatever on the server side

    app.set(express.static(__dirname + '/public'));
    //css, javascript, serve static assets
});

app.get('/', function (req, res)
{
    //callback function
    res.render('hello', {
        name: 'Johnson'
    });
});

app.get('/login-page', function(req, res)
{
    //console.log(req);
    res.render('login-page');    //create artist-search view
});

app.get('/log-in', function(req, res)
{
    var username = req.query.username;
    var password = req.query.pass;

    auth.validLogin(username, password, function(user1)
    {
        if (!user)
        {
            user = user1[0];
        }

        loadHomePage(res);
    });

});

var loadHomePage = function(res)
{
    console.log(user);
    if (user)
    {
        async.parallel([
            function(callback)
            {
                query.getFavoriteSongs(user.username, function(searchResults)
                {
                    callback(null, searchResults);
                });
            },
            function(callback)
            {
                query.getFavoriteArtists(user.username, function(searchResults)
                {
                    callback(null, searchResults);
                });
            }
        ],
            function (err, results)
            {
                console.log('made it!!!');

                var favSongs = results[0];
                var favArtists = results[1];

                console.log(favSongs);
                console.log(favArtists);

                res.render('home-page', {
                    username: user.username,
                    password: user.password,
                    admin: user.admin,
                    favSongs: favSongs,
                    favArtists: favArtists
                });
            });
    }
    else
    {
        //alert("Bad login, please try again!");
        res.render('login-page', {
            error: 'Bad Logon'
        });
    }
}

app.get('/search', function(req, res)
{
    res.render('search-page');
});

app.get('/search/music', function(req, res)
{
    //perform the search
    var title = req.query.title;
    var artist = req.query.artist;

    async.parallel([
        function(callback)
        {
            if (title != "")
            {
                query.getSongs(title, function(searchResults)
                {
                    callback(null, searchResults);
                });
            }
            else
            {
                callback(null, null);
            }
        },
        function(callback)
        {
            if (artist != "")
            {
                query.getArtists(artist, function(searchResults)
                {
                    callback(null, searchResults);
                });
            }
            else
            {
                callback(null, null);
            }
        }
    ],
    function (err, results)
    {
        var songs = results[0];
        var artists = results[1];

        console.log(songs);
        console.log(artists);

        res.render('results-page', {
            songs: songs,
            artists: artists
        });
    });

});

app.get('/admin', function(req, res)
{
    query.getArtists("", function(searchResults)
    {
        console.log(searchResults);

        res.render('admin-page', {
            artists: searchResults
        });
    });

});

app.get('/admin/create-user', function(req, res)
{
    var user = req.query.username;
    var pass = req.query.pass;

    admin.createUser(user, pass, function(searchResults)
    {
        console.log(searchResults);

        if (searchResults.affectedRows != 0)
        {
            res.render('sql-result', {
                action: "Successfully Created User"
            });
        }
        else
        {
            res.render('sql-result', {
                action: "Unsuccessfully Created User"
            });
        }
    });
});

app.get('/admin/create-artist', function(req, res)
{
    var artist = req.query.artist;

    admin.createArtist(artist, function(searchResults)
    {
        console.log(searchResults);

        if (searchResults.affectedRows != 0)
        {
            res.render('sql-result', {
                action: "Successfully Created Artist"
            });
        }
        else
        {
            res.render('sql-result', {
                action: "Unsuccessfully Created Artist"
            });
        }
    });
});

app.get('/admin/create-song', function(req, res)
{
    var title = req.query.title;
    var artist = req.query.artist;

    admin.createSong(title, artist, function(searchResults)
    {
        console.log(searchResults);

        if (searchResults.affectedRows != 0)
        {
            res.render('sql-result', {
                action: "Successfully Created Song"
            });
        }
        else
        {
            res.render('sql-result', {
                action: "Unsuccessfully Created Song"
            });
        }
    });
});

app.get('/admin/delete-artist', function(req, res)
{
    var artist = req.query.artist;

    admin.deleteArtist(artist, function(searchResults)
    {
        console.log(searchResults);

        if (searchResults.affectedRows != 0)
        {
            res.render('sql-result', {
                action: "Successfully Deleted Artist"
            });
        }
        else
        {
            res.render('sql-result', {
                action: "Unsuccessfully Deleted Artist"
            });
        }
    });
});

app.get('/admin/delete-song', function(req, res)
{
    var title = req.query.title;

    admin.deleteSong(title, function(searchResults)
    {
        console.log(searchResults);

        if (searchResults.affectedRows != 0)
        {
            res.render('sql-result', {
                action: "Successfully Deleted Song"
            });
        }
        else
        {
            res.render('sql-result', {
                action: "Unsuccessfully Deleted Song"
            });
        }
    });
});

app.get('/add-favorite-song', function(req, res)
{
    var title = req.query.addFavoriteSong;

    favorite.favoriteSong(user.ID, title, function(searchResults)
    {
        console.log(searchResults);

        loadHomePage(res);
    });
});

app.get('/add-favorite-artist', function(req, res)
{
    var artist = req.query.addFavoriteArtist;

    favorite.favoriteArtist(user.ID, artist, function(searchResults)
    {
        console.log(searchResults);

        loadHomePage(res);

    });

});

app.get('/track/:title', function(req, res)
{
    async.parallel([
        function(callback)
        {
            wiki.getPage(req.params.title, function(page)
            {
                callback(null, page['*']);
            });
        },
        function(callback)
        {
            lastfm.getSong(req.params.title, function(searchResults)
            {
                callback(null, searchResults);
            });
        }],
        function(err, searchResults)
        {
            var wiki = searchResults[0];
            var artist = searchResults[1].artistName;
            var album = searchResults[1].collectionName;
            var genre = searchResults[1].primaryGenreName;
            var preview = searchResults[1].previewUrl;
            var picture = searchResults[1].artworkUrl100;

            res.render('song-info', {
                title: req.params.title,
                artist: artist,
                album: album,
                genre: genre,
                preview: preview,
                picture: picture,
                wiki: wiki
            });

        });


});

app.get('/artist/:name', function(req, res)
{
    async.parallel([
        function(callback)
        {
            wiki.getPage(req.params.name, function(page)
            {
                callback(null, page['*']);
            });
        },
        function(callback)
        {
            lastfm.getArtist(req.params.name, function(searchResults)
            {
                callback(null, searchResults);
            });
        }],
        function(err, searchResults)
        {
            res.render('artist-info', {
                wiki: searchResults[0],
                songs: searchResults[1]
            });
        });
});

app.listen(4500);
console.log("starting server...");