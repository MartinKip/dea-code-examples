(function() {
    'use strict';
    
    angular.module('wazzurb').controller('loginController', loginController);
        
    function loginController(){
        var vm = this;
        
        vm.loggedIn = false;
        
        vm.login = function(){
            /*
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
            */
            facebookConnectPlugin.getApplicationSignature(function(response) {
                console.log('fail');
            })
        }
        /*
        vm.checkSimulator = function() {
            if (window.navigator.simulator === true){
                alert('This plugin is not available in the simulator');
                return true;
            } else if ($cordovaFacebookProvider === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }
        */
        
        vm.logout = function() {
            vm.loggedIn = false;
        }
        
    }
    
})();