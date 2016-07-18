angular.module('myApp').controller('loginController', ['$scope', '$http', 'playerData',
function($scope, $http, playerData){
  playerData.loadPlayers();

}]); // end controller 'userController'
