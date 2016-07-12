var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
      .when('/main', {
          templateUrl: '/views/pages/main.html',
      })
      .when('/login', {
          templateUrl: '/views/pages/login.html',
      })
      .when('/register', {
          templateUrl: '/views/pages/register.html',
      })
      .when('/players', {
          templateUrl: '/views/pages/players.html',
      })
      .when('/events', {
          templateUrl: '/views/pages/events.html',
      })
      .when('/roundRobin', {
          templateUrl: 'views/pages/roundRobin.html',
      })
      .when('/admin', {
          templateUrl: '/views/pages/admin.html',
      })
      .otherwise({
      redirectTo: '/login'
      });
}]); // end $routeProvider

myApp.factory('playerData', ['$http', '$rootScope', function($http, $rootScope){

  var stuff = {
    moarStuff:'I am stuff',
    click: 1
  };

  var doingStuff = function(){
    stuff.click++;
    console.log('stuff.click = ' + stuff.click);
  };

  $rootScope.playersArray = [];

  var getPlayers = function(){
    $http({
      method: 'GET',
      url: '/getPlayers', }).then(function(response){
        $rootScope.playersArray = response.data;
      }); // end http GET
  }; // end showPlayers

  return {
    thing: stuff,
    punch: doingStuff,
    loadPlayers: getPlayers
  };

}]);
