var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var angular = require('angular');
var Parse = require('parse');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
angular.module('track-houston', []).run(['$rootScope', function ($scope) {
  $scope.scenario = 'Log in';
  $scope.currentUser = Parse.User.current();
  $scope.createCoachSuccess = null;
  $scope.createAccount = function (form) {
    var user = new Parse.User();
    user.set("email", form.email);
    user.set("username", form.username);
    user.set("password", form.password);
    user.signUp(null, {
      success: function (user) {
        $scope.currentUser = user;
        $scope.$apply();
      },
      error: function (user, error) {
        alert("Unable to sign up:  " + error.code + " " + error.message);
      }
    });
  };
  $scope.logIn = function (form) {
    Parse.User.logIn(form.username, form.password, {
      success: function (user) {
        $scope.currentUser = user;
        $scope.$apply();
      },
      error: function (user, error) {
        alert("Unable to log in: " + error.code + " " + error.message);
      }
    });
  };
  $scope.logOut = function (form) {
    Parse.User.logOut();
    $scope.currentUser = null;
  };

  $scope.submitRunForm = function () {
    Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
    var Run = Parse.Object.extend("Run");
    var run = new Run();
    run.set("name", $("#name").val());
    run.set("time", $("#time").val());
    run.set("event", $("#event").val());
    run.set("date", $("#date").val());
    run.save(null, {
      success: function (run) {
        run.save();
        console.log("Successfully ran the function submitRunForm()!");
        createRunTable();
      }
    })
  };
  $scope.createStudent = function () {
    Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
    var Run = Parse.Object.extend("Run");
    var run = new Run();
    run.set("name", $("#name").val());
    run.set("time", $("#time").val());
    run.set("event", $("#event").val());
    run.set("date", $("#date").val());
    run.save(null, {
      success: function (run) {
        run.save();
      }
    });
    console.log("Successfully ran the function submitRunForm()!");
  };
  $scope.createCoach = function () {
    Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
    var Coach = Parse.Object.extend("Coach");
    var coach = new Coach();
    coach.set("name", $("#coachForm-fullname").val());
    coach.set("position", $("#coachForm-position").val());
    coach.set("homesite", $("#coachForm-homesite").val());
    coach.save(null, {
      success: function (run) {
        run.save();
        $scope.createCoachSuccess = 'Coach successfully created!';
        console.log("Good news boss, I Successfully ran the function createCoach()!");
        $scope.$apply();
      }
    })
  };
  $scope.createRunTable = function () {
    Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
    var Run = Parse.Object.extend("Run");
    var query = new Parse.Query(Run);
    query.find({
      success: function (results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          (function ($) {
            $('#runTable').append('<tr><td>' + object.get('name') + '</td><td>' + object.get('time') + '</td><td>' + object.get('event') + '</td><td>' + object.get('date') + '</td></tr>');
          })(jQuery);
        }
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };
  $scope.createNotesThread = function () {
    Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
    var Student = Parse.Object.extend("Student");
    var query = new Parse.Query(Student);
    query.find({
      success: function (results) {
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          (function ($) {
            $('#notesTable').append('<tr><td>' + object.get('name') + '</td><td>' + object.get('privNote') + '</td><td>' + object.get('pubNote') + '</td><td>' + object.get('date') + '</td></tr>');
          })(jQuery);
        }
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };
}]);