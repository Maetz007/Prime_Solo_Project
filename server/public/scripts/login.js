angular.module('myApp').controller('loginController', ['$scope', '$http', 'playerData',
function($scope, $http, playerData){
  playerData.loadPlayers();
  console.log('in login controller');

}]); // end controller 'userController'
