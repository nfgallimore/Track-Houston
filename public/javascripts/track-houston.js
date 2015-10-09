/**
 * Created by nickgallimore on 8/24/15.
 */

angular.module('track-houston', []).run(['$rootScope', function ($scope) {
    Parse.initialize("sD4tDFzNyuas8Vg0VhoXeF5OSnLHMkJRLxuHOkUL", "ntKIRdfzedSkLFGaj99qrC2lG2VNOXdWIrONcVIP", "");
    $scope.scenario = 'Log in';
    $scope.currentUser = Parse.User.current();
    $scope.createCoachSuccess = null;
    $scope.createStudentSuccess = null;
    $scope.newAcctType = null;
    $scope.isAdmin = false;
    $scope.isCoach = false;
    $scope.isStudent = false;
    $scope.createAdminSuccess = null;
    $scope.createAdmin = function () {
        var admin = new Parse.User;
        var fname = $('#adminForm-fname').val().toLowerCase();
        var lname = $("#adminForm-lname").val().toLowerCase();
        admin.set("username", (fname.charAt(0) + lname));
        admin.set("password", "password");
        admin.set("type", "admin");
        admin.set("fname", fname);
        admin.set("lname", lname);
        var email = $("#adminForm-email").val();
        if (email.indexOf("@") > -1 || email.indexOf("." > -1)) {
            $scope.createAdminSuccess = 'Invalid Email'
        }
        admin.set("email", email);
        admin.signUp(null, {
            success: function (admin) {
                admin.save();
                $scope.createAdminSuccess = 'Coach successfully created!';
                $scope.$apply();
            },
            error: function (coach, error) {
                alert("Unable to sign up:  " + error.code + " " + error.message);
            }
        })
    };
    $scope.createAccount = function (form) {
        var user = new Parse.User();
        user.set("email", form.email);
        user.set("username", form.username);
        user.set("password", form.password);
        //user.set("fname", $("#firstname").val());
        //user.set("lname", $("#lastname").val());
        //user.set("byear", $("#birthyear").val());
        //if (form.globalpassword.equals("trackhouston")) {
        user.signUp(null, {
            success: function (user) {
                $scope.currentUser = user;
                $scope.$apply();
            },
            error: function (user, error) {
                alert("Unable to sign up:  " + error.code + " " + error.message);
            }
        });
        //}
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
    $scope.logOut = function () {
        Parse.User.logOut();
        $scope.currentUser = null;
        $scope.isAdmin = false;
        $scope.isCoach = false;
        $scope.isStudent = false;
    };
    $scope.submitRunForm = function () {
        var Run = Parse.Object.extend("Run");
        var run = new Run();
        var name = $("#name").val();
        var fname = "";
        var lname = "";
        for (var i = 0; i < name.length; i++) {
            if (name[i] === ' ') {
                fname = name.slice(0, i);
                lname = name.slice(i + 1, name.length);
            }
        }
        //console.log(fname);
        //console.log(lname);

        run.set("name", name);
        run.set("time", $("#time").val());
        run.set("event", $("#event").val());
        run.set("date", $("#datepicker1").val());
        run.set("fname", fname);
        run.set("lname", lname);
        var username = "";
        var User = Parse.Object.extend("_User");
        var query = new Parse.Query(User);
        query.find({
            success: function (results) {
                for (var i = 0; i < results.length; i++) {
                    //console.log(results[i].get("name"))
                    if (results[i].get("fname") + " " + results[i].get("lname") === $("#name").val()) {
                        username = results[i].get("username").toLowerCase();
                    }
                }
            },
            error: function (user, error) {
                alert("Unable to log in: " + error.code + " " + error.message);
            }
        });
        username = $scope.lookUpUsernameByName(name);
        run.set("username", username);
        run.save(null, {
            success: function (run) {
                run.save();
                //console.log("Successfully ran the function submitRunForm()!");
            }
        })
    };
    //$scope.createDiv = function (id, html) {
    //    var div = document.createElement("div");
    //    document.getElementById("tabs").appendChild(div);
    //    div.id = id;
    //    div.innerHTML = html;
    //};
    //$scope.renderProfile = function (name) {
    //    $scope.hideDiv("runTable");
    //    var html = name + "\'s run times:";
    //    $scope.createDiv("profile", html);
    //};
    //$scope.home = function() {
    //    $scope.hideDiv("profile");
    //    $scope.showDiv("runTable");
    //};
    //$scope.hideForms = function() {
    //    document.getElementById("rundata").style.display = 'none';
    //    document.getElementById("coachCreateAccount").style.display = 'none';
    //    document.getElementById("adminCreateAccount").style.display = 'none';
    //    document.getElementById("runTable").style.display = 'none';
    //};
    //$scope.showForms = function() {
    //    document.getElementById("rundata").style.display = 'block';
    //    document.getElementById("coachCreateAccount").style.display = 'block';
    //    document.getElementById("adminCreateAccount").style.display = 'block';
    //    document.getElementById("runTable").style.display = 'block';
    //};
    $scope.submitGradeForm = function () {
        var Grade = Parse.Object.extend("Grade");
        var grade = new Grade();
        grade.set("name", $scope.currentUser.get("username"));
        //console.log($scope.currentUser.get("username"));
        grade.set("grade1", $("#class1").val() + ": " + $("#grade1").val());
        grade.set("grade2", $("#class2").val() + ": " + $("#grade2").val());
        grade.set("grade3", $("#class3").val() + ": " + $("#grade3").val());
        grade.set("grade4", $("#class4").val() + ": " + $("#grade4").val());
        grade.set("grade5", $("#class5").val() + ": " + $("#grade5").val());

        grade.save(null, {
            success: function (grade) {
                grade.save();
                //console.log("Successfully ran the function submitGradeForm()!");
            }
        })
    };
    //$scope.hideDiv = function(id) {
    //    (function($) {
    //        $('#' + id).hide();
    //    })(jQuery);
    //};
    //$scope.showDiv = function(id) {
    //    (function($) {
    //        $('#' + id).show();
    //    })(jQuery);
    //};
    $scope.createStudent = function () {
        var currUserToken = $scope.currentUser.getSessionToken();
        var student = new Parse.User;
        var fname = $("#studentForm-fname").val();
        var lname = $("#studentForm-lname").val().toLowerCase();
        student.set("username", (fname.charAt(0) + lname));
        student.set("password", "password");
        student.set("fname", fname);
        student.set("lname", lname);
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
                //console.log("Good news boss, I Successfully ran the function createStudent()!");
            },
            error: function (student, error) {
                alert("Unable to sign up:  " + error.code + " " + error.message);
            }
        });
    };
    $scope.createCoach = function () {
        Parse.User.enableRevocableSession();
        var currUserToken = $scope.currentUser.getSessionToken();
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
                //console.log("Good news boss, I Successfully ran the function createCoach()!");
            },
            error: function (coach, error) {
                alert("Unable to sign up:  " + error.code + " " + error.message);
            }
        })
    };
    $scope.lookUpNameByUsername = function (username) {
        var User = Parse.Object.extend("_User");
        var query = new Parse.Query(User);
        query.find({
            success: function (results) {
                for (var i = 0; i < results.length; i++) {
                    var usrname = results[i].get("username");
                    if (usrname === username) {
                        var fname = results[i].get("fname");
                        var lname = results[i].get("lname");
                        var name = fname + " " + lname;
                        //console.log(name);
                        return name;
                    }
                }
            },
            error: function (results, error) {
                alert("Unable to find name: " + error.code + " " + error.message);
            }
        })
    };
    $scope.lookUpUsernameByName = function (name) {
        var User = Parse.Object.extend("_User");
        var query = new Parse.Query(User);
        query.find({
            success: function (results) {
                for (var i = 0; i < results.length; i++) {
                    var fname = results[i].get("fname");
                    var lname = results[i].get("lname");
                    var n = fname + " " + lname;
                    if (n === name) {
                        //console.log(results[i].get("username"));
                        return results[i].get("username");
                    }
                }
            },
            error: function (results, error) {
                alert("Unable to find username: " + error.code + " " + error.message);
            }
        })
    };
    $scope.populateDropdown = function () {
        var User = Parse.Object.extend("_User");
        var query = new Parse.Query(User);
        var namesArr = [];
        query.find({
            success: function (results) {
                for (var i = 0; i < results.length; i++) {
                    var fname = results[i].get("fname");
                    var lname = results[i].get("lname");
                    var name = fname + " " + lname;
                    var username = $scope.lookUpUsernameByName(name);
                    namesArr.push(name);
                    //console.log(name);
                    (function ($) {
                        $('#name').append($('<option>', {
                            value: username,
                            text: name
                        }));
                    })(jQuery);
                }
            },
            error: function (results, error) {
                alert("Unable to sign up:  " + error.code + " " + error.message);
            }
        });
        //console.log(namesArr);
        for (var i = 0; i < namesArr.length; i++) {
            $('#name').append($('<option>', {
                value: $scope.lookUpUsernameByName(namesArr[i]),
                text: namesArr[i]
            }));
        }
    };
    $scope.createRunTable = function () {
        var Run = Parse.Object.extend("Run");
        var query = new Parse.Query(Run);
        query.find({
            success: function (results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var name = object.get('name');
                    (function ($) {
                        var append = "<tr><td><a href=";
                        append += "\"javascript:renderProfile(\'";
                        append += name;
                        append += "\')\">";
                        append += object.get('name') + '</a></td><td>' + object.get('time') + '</td><td>' + object.get('event') + '</td><td>' + object.get('date') + '</td></tr>';
                        $('#rundata').append(append);
                    })(jQuery);
                    var time = object.get('time');
                    var event;
                    event = object.get('event');
                    var date = object.get('date');
                    var obj = {Name: name, Time: time, Event: event, Date: date};
                }
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };
    $scope.createGradeTable = function () {
        var Grade = Parse.Object.extend("Grade");
        var query = new Parse.Query(Grade);
        query.find({
            success: function (results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    (function ($) {
                        $('#gradeData').append('<tr><td>' + object.get('name') + '</td><td>' + object.get('grade1') + '</td><td>' + object.get('grade2') + '</td><td>' + object.get('grade3') + '</td><td>' + object.get('grade4') + '</td><td>' + object.get('grade5') + '</td></tr>');
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
        if ($("#studentType")[0].checked) {
            $scope.newAcctType = "student";
        }
        if ($("#coachType")[0].checked) {
            $scope.newAcctType = "coach";
        }
        if ($("#adminType")[0].checked) {
            $scope.newAcctType = "admin";
        }
    };
    // initial functions to call
    $scope.init = function () {
        $scope.newAcctTypeUpdate();
        $scope.createRunTable();
        $scope.createGradeTable();
        $scope.populateDropdown();
    };
    //$scope.init();
    //var elements = document.getElementsByClassName("homeButton");

    //for (var e in elements) {
    //    e.prop("href", "javascript:home()");
    //}
}]);
