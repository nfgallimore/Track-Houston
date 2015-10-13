var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next)
{
    var Parse = require('parse').Parse;
    Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
    var query = new Parse.Query(Parse.User);
    query.find({
        success: function (users)
        {
            for (var i = 0; i < users.length; ++i)
            {
                console.log(users[i].get('lname'));
                console.log(users[i].get('id'));
            }
            res.send(users);
        }
    });
});
/* GET users listing. */
router.get('/:user', function (req, res, next)
{
    var Parse = require('parse').Parse;
    Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
    var id = req.params.user;
    if (id)
    {
        var User = Parse.Object.extend("_User");
        var query = new Parse.Query(User);
        query.equalTo("username", id);
        query.find({
            success: function (results)
            {
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++)
                {
                    var object = results[i];
                    console.log(object.get('time'));
                }
                res.send(results);
            },
            error: function (error)
            {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
    else
    {
        var UserNew = Parse.Object.extend("_User");
        var queryNew = new Parse.Query(UserNew);
        queryNew.find({
            success: function (results)
            {
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++)
                {
                    var object = results[i];
                    console.log(object.get('time'));
                }
                res.send(results);
            },
            error: function (error)
            {
                alert("Error: " + error.code + " " + error.message);
            }
        });
        next();
    }
});
module.exports = router;
