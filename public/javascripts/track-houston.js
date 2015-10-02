/**
 * Created by nickgallimore on 8/24/15.
 */
Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
angular.module('track-houston', []).run(['$rootScope', function ($scope) {

    $scope.scenario = 'Log in';
    $scope.currentUser = Parse.User.current();
    $scope.createCoachSuccess = null;
    $scope.createStudentSuccess = null;
    $scope.newAcctType = null;
    $scope.isAdmin = false;
    $scope.isCoach = false;
    $scope.isStudent = false;
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
                $scope.updateType();
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
        $scope.isAdmin = false;
        $scope.isCoach = false;
        $scope.isStudent = false;
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
                $scope.createRunTable();
            }
        })
    };
    /*
     studentForm-fname
     ...        lname
     ...        parentName
     ...        birthYear
     ...        practiceSite
     */
    $scope.createStudent = function () {
        Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
        Parse.User.enableRevocableSession();
        var currUserToken = Parse.User.current().getSessionToken();
        var student = new Parse.User;
        student.set("username", ($("#studentForm-fname").val().charAt(0) + $("#studentForm-lname").val()).toLowerCase());
        student.set("password", "password");
        student.set("fname", $("#studentForm-fname").val().toLowerCase());
        student.set("lname", $("#studentForm-lname").val().toLowerCase());
        student.set("pname", $("#studentForm-parentName").val().toLowerCase());
        student.set("byear", $("#studentForm-birthYear").val().toLowerCase());
        student.set("psite", $("#studentForm-practiceSite").val().toLowerCase());
        student.set("type", "student");
        student.signUp(null, {
            success: function (student) {
                student.save();
                $scope.createStudentSuccess = "Student successfully created!";
                $scope.$apply();
                Parse.User.become(currUserToken, null).then(function (newUser) {
                    // The current user is now set to user.
                }, function (error) {
                    // The token could not be validated.
                });
                console.log("Good news boss, I Successfully ran the function createStudent()!");
            },
            error: function (student, error) {
                alert("Unable to sign up:  " + error.code + " " + error.message);
            }
        });
    };

    $scope.createCoach = function () {
        Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP");
        Parse.User.enableRevocableSession();
        var currUserToken = Parse.User.current().getSessionToken();
        var coach = new Parse.User;
        coach.set("username", ($("#coachForm-fname").val().charAt(0) + $("#coachForm-lname").val()).toLowerCase());
        coach.set("password", "password");
        coach.set("type", "coach");
        coach.set("fname", $("#coachForm-fname").val().toLowerCase());
        coach.set("lname", $("#coachForm-lname").val().toLowerCase());
        coach.set("position", $("#coachForm-position").val().toLowerCase());
        coach.set("homesite", $("#coachForm-homesite").val().toLowerCase());
        var email = $("#coachForm-email").val();
        if (email.indexOf("@") > -1 || email.indexOf("." > -1)) {
            $scope.createCoachSuccess = 'Invalid Email'
        }
        coach.set("email", email);

        coach.signUp(null, {
            success: function (coach) {
                coach.save();
                $scope.createCoachSuccess = 'Coach successfully created!';
                $scope.$apply();
                Parse.User.become(currUserToken, null).then(function (newUser) {
                    // The current user is now set to user.
                }, function (error) {
                    // The token could not be validated.
                });
                console.log("Good news boss, I Successfully ran the function createCoach()!");
            },
            error: function (coach, error) {
                alert("Unable to sign up:  " + error.code + " " + error.message);
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

    $scope.updateType = function () {
        if ($scope.currentUser != null) {
            if ($scope.currentUser.attributes.type === "student") {
                $scope.isStudent = true;
            }
            else if ($scope.currentUser.attributes.type === "coach") {
                $scope.isCoach = true;
            }
            else if ($scope.currentUser.attributes.type == "admin") {
                $scope.isAdmin = true;
            }
        }
    };

    $scope.updateType();
    $scope.newAcctTypeUpdate = function () {
        if ($(studentType)[0].checked) {
            $scope.newAcctType = "student";
        }
        if ($(coachType)[0].checked) {
            $scope.newAcctType = "coach";
        }
        if ($(adminType)[0].checked) {
            $scope.newAcctType = "admin";
        }
    };

    $scope.newAcctTypeUpdate();

}]);