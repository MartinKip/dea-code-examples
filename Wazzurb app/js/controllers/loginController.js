(function() {
    'use strict';
    
    angular.module('wazzurb').controller('loginController', loginController);
        
    function loginController(){
        var vm = this;
        
        vm.loggedIn = false;
        
        vm.login = function(){
            
            if (!vm.checkSimulator()) {
                $cordovaFacebookProvider.getLoginStatus(function(response) {
                    if (response.status === "connected"){
                        alert("you are logged in, details:\n\n" + JSON.stringify(response.authResponse));
                    } else {
                        alert("Not logged in");
                    }
                });
                vm.loggedIn = true;
            }
            
        }
        
        vm.checkSimulator = function() {
            if (window.navigator.simulator === true){
                alert('This plugin is not available in the simulator');
                //return true;
            } 
            if ($cordovaFacebookProvider === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }
        
        vm.logout = function() {
            vm.loggedIn = false;
        }
        
    }
    
})();