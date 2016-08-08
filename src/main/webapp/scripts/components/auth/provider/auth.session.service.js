'use strict';

angular.module('sdlctoolApp')
    .factory('AuthServerProvider', function loginService($http, localStorageService, $window, $rootScope, $location) {
        return {
            login: function(credentials) {
                var data = 'j_username=' + encodeURIComponent(credentials.username) +
                    '&j_password=' + encodeURIComponent(credentials.password) +
                    '&remember-me=' + credentials.rememberMe + '&submit=Login';
                return $http.post('api/authentication', data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function (response) {
                    return response;
                });
            },
            logout: function() {
                // logout from the server
                $http.post('api/logout').success(function (response) {
                    localStorageService.clearAll();
                    // to get a new csrf token call the api                    
                    $http.get('api/account');
                    if($rootScope.ANTHENTICATIONTYPE) {
                    	location.href = $rootScope.CASLOGOUTURL;
                    }

                    
                    return response;
                });
            },
            getToken: function () {
                var token = localStorageService.get('token');
                return token;
            },
            hasValidToken: function () {
                var token = this.getToken();
                return !!token;
            }
        };
    });
