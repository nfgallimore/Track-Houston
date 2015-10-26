/**
 * Created by nickgallimore on 8/24/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var Parse = require('parse').Parse;
    Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
    var Run = Parse.Object.extend("Run");
    var query = new Parse.Query(Run);
    query.find({
        success: function (results) {
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                console.log(object.get('time'));
            }
            res.render('profile', {title: 'Track-Houston'});
            res.send(results);
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
});

/* GET users listing. */
router.get('/:user', function(req, res, next) {
    var Parse = require('parse').Parse;
    Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
    var id = req.params.user;
    if (id) {
        var Run = Parse.Object.extend("Run");
        var query = new Parse.Query(Run);
        query.equalTo("username", id);
        query.find({
            success: function (results) {
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.get('time'));
                }
                res.render('profile', {title: 'Track-Houston'});
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
    else {
        var RunNew = Parse.Object.extend("Run");
        var queryNew = new Parse.Query(RunNew);
        queryNew.find({
            success: function (results) {
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.get('time'));
                }
                res.send(results);
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
        next();
    }
    var username = id;
    var Run = Parse.Object.extend("Run");
    var query = new Parse.Query(Run);
    query.equalTo("username", username);
    query.find({
        success: function (results)
        {
            for (var i = 0; i < results.length; i++)
            {
                var object = results[i];
                var name = object.get('name');
                var time = object.get('time');
                var event = object.get('event');
                var date = object.get('date');
                var obj = {Name: name, Time: time, Event: event, Date: date};
            }
        },
        error: function (error)
        {
            alert("Error: " + error.code + " " + error.message);
        }
    });
});
module.exports = router;