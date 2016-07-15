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


//-----------------------------------------  playerData factory-----------------------------------------

myApp.factory('playerData', ['$http', '$rootScope', function($http, $rootScope){

  $rootScope.playersArray = [];
  $rootScope.tournamentInfo = [];
  $rootScope.tournamentName = '';
  $rootScope.tournament = [];
  $rootScope.record = [];
  $rootScope.competitors = [];

  var getPlayers = function(){
    $http({
      method: 'GET',
      url: '/getPlayers', }).then(function(response){
        $rootScope.playersArray = response.data;

      }); // end http GET
  }; // end showPlayers

  var getTournament = function(){
    $http({
      method: 'GET',
      url: '/getTournament', }).then(function(response){
        $rootScope.tournamentInfo = response.data;
      }); // end http GET
  }; // end showPlayers

  var randomId = function(){
    var text = [];
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i=0; i < 7; i++)
      text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    return text.join('');
  };

  var randomNum = function (max, min) {
    return Math.floor(Math.random() * (max- min + 1)) + min;
  };

  return {
    loadPlayers: getPlayers,
    getTournament: getTournament,
    randomId: randomId,
    randomNum: randomNum
  };

}]);
