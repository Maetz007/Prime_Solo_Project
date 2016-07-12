angular.module('myApp').controller('eventsController', ['$scope', '$http', '$rootScope', 'playerData',
function($scope, $http, $rootScope, playerData){

  console.log('in event page');

  playerData.loadPlayers();

$scope.doThings = function(){
  playerData.punch();
};

}]); // end controller 'eventsController'
