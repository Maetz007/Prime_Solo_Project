var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
      when('/main', {
          templateUrl: '/views/pages/main.html',
          controller: 'mainController'
      }).
      when('/login', {
          templateUrl: '/views/pages/login.html',
      }).
      when('/register', {
          templateUrl: '/views/pages/register.html',
      }).
      when('/players', {
          templateUrl: '/views/pages/players.html',
          // controller: 'playersController'    <--- removed due to being loaded twice
      }).
      when('/events', {
          templateUrl: '/views/pages/events.html',
          controller: 'eventsController'
      }).
      when('/roundrobin', {
          templateUrl: 'views/pages/roundRobin.html',
          controller: 'roundRobinController'
      }).
      when('/admin', {
          templateUrl: '/views/pages/admin.html',
          controller: 'adminController'
      }).
      otherwise({
      redirectTo: '/login'
      });
}]); // end $routeProvider
