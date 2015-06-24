(function() {
    'use strict';
    
    angular.module('wazzurb').controller('loginController', loginController);
    
    loginController.$inject = ["$rootScope", "$localStorage", "$q"];
    
    function loginController($rootScope, $localStorage, $q) {
        var vm = this;
        
        vm.login = function() {
            if (!vm.checkSimulator()) {
                facebookConnectPlugin.login(["email"], function(response) {
                    if (response.status === "connected") {
                        vm.getUserData();
                    } else {
                        alert("You are not logged in.");
                    }
                });
            }
        }
        
        vm.logout = function() {
            if (!vm.checkSimulator()) {
                facebookConnectPlugin.logout(function(succes) {
                    saveUserData(false, "undefined");
                }, function(failure) {
                    saveUserData(false, "undefined");
                });
            }
        }
        
        vm.loginStatus = function() {
            if (!vm.checkSimulator()) {
                var deferred = $q.defer();
                facebookConnectPlugin.getLoginStatus(function(succes) {
                    deferred.resolve(true);
                }, function(failure) {
                    deferred.reject(false);
                });
                
                return deferred.promise;
            } 
        }
        
        vm.inviteFriends = function() {
            if (!vm.checkSimulator()) {
                facebookConnectPlugin.showDialog({
                    method: "send",
                    caption: "Caption",
                    name: "Name",
                    link: "www.google.nl",
                    description: "description",
                    picture: "img"
                }, function(succes) {}, function(fail) {alert(fail)})
            }
        }
        
        vm.getUserData = function() {
            if (!vm.checkSimulator()) {
                var graphPath = "me/?fields=name,picture";
                facebookConnectPlugin.api(graphPath, [], function(response) {
                    if (response.error) {
                        alert("Error: " + JSON.stringify(response.error));
                    } else {
                        var promise = vm.loginStatus();
                        promise.then(function(loggedIn) {
                            saveUserData(true, response);
                        }, function(loggedOut) {
                            saveUserData(false, response);
                        });
                    }                    
                });
            }
        }
        
        function saveUserData(loggedIn, response) {
            if (loggedIn) {
                var json = JSON.parse(JSON.stringify(response));
                $localStorage.loggedIn = true;
                $localStorage.user = json["name"];
                var picture = json.picture;
                picture = picture.data;
                $localStorage.userProfilePic = picture["url"];
            } else {
                $localStorage.loggedIn = false;
                $localStorage.user = "";
                $localStorage.userProfilePic = "";
            }
            $rootScope.$apply();
        }
        
        vm.userLoggedIn = function() {
            return $localStorage.loggedIn;
        }
        
        vm.userName = function() {
            return $localStorage.user;
        }
        
        vm.profilePicture = function() {
            return $localStorage.userProfilePic;
        }
        
        vm.checkSimulator = function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator');
                return true;
            } else if (window.facebookConnectPlugin === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }
    }
})(window);