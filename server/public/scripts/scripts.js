var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
      when('/main', {
          templateUrl: '/views/pages/main.html',
          controller: 'mainController'
      }).
      when('/login', {
          templateUrl: '/views/pages/login.html',
          controller: 'loginController'
      }).
      when('/players', {
          templateUrl: '/views/pages/players.html',
          controller: 'playersController'
      }).
      when('/events', {
          templateUrl: '/views/pages/events.html',
          controller: 'eventsController'
      }).
      when('/admin', {
          templateUrl: '/views/pages/admin.html',
          controller: 'adminController'
      }).
      otherwise({
      redirectTo: '/main'
      });
}]); // end $routeProvider

//-----------------------------   mainController   --------------------------------------

myApp.controller('mainController', ['$scope', '$http', function($scope, $http){
  console.log("in main controller");
}]); // end controller 'mainController'

//-----------------------------   loginController   --------------------------------------

myApp.controller('loginController', ['$scope', '$http', function($scope, $http){

  $scope.userLogin = function(){
    console.log('login button clicked from scripts!');
    var userInfo = {
      user_name: $scope.userName,
      user_password: $scope.userPassword,
    }; // end userLogin
    $http({
      method: 'POST',
      url: '/userLogin',
      data: userInfo
    }); // end POST
    // clears inputs by user
    $scope.userName = '';
    $scope.userPassword = '';
  }; // end userLoogin function

}]); // end controller 'loginController'

//-----------------------------   playersController   --------------------------------------

myApp.controller('playersController', ['$scope', '$http', function($scope, $http){

  $scope.playersArray = [];
  $scope.classTypes = ['Anti-Paladin', 'Archer', 'Assassin', 'Barbarian', 'Bard',
    'Druid', 'Healer', 'Monk', 'Paladin', 'Scout', 'Warrior', 'Wizard'];
  $scope.levelNum = ['1', '2', '3', '4', '5', '6'];

  $scope.displayPlayers = function(){
    console.log('in getPlayers');
    $http({
      method: 'GET',
      url: '/getPlayers', }).then(function(response){
        $scope.playersArray = response.data;
      }); // end http GET
    }; // end displayPlayers function

  // $scope.displayPlayers();

  $scope.addPlayer = function(){
    var playerInfo = {
      name: $scope.nameInput,
      class: $scope.classInput,
      level: $scope.levelInput,
    }; // end object
    console.log(playerInfo);
    $http({
      method: 'POST',
      url: '/playerAdd',
      data: playerInfo
    }); // end POST
    $scope.nameInput = '';
    $scope.classInput = '';
    $scope.levelInput = '';
    // $scope.displayPlayers();
  }; // end addPlayer function

  $scope.deletePlayer = function(index){
    var playerId = {
      id: $scope.playersArray[index]._id
    }; // end playerId
    $http({
      method: 'POST',
      url: '/playerRemove',
      data: playerId
    }); // end http
    $scope.playersArray.splice(index, 1);
  }; // end deletePlayer
}]); // end controller 'playersController'

//-----------------------------   eventsController   --------------------------------------

myApp.controller('eventsController', ['$scope', '$http', function($scope, $http){
  console.log("in events controller");
}]); // end controller 'eventsController'

//-----------------------------   adminController   ---------------------------------------

myApp.controller('adminController', ['$scope', '$http', function($scope, $http){
  console.log("in admin controller");
}]); // end controller 'adminController'
