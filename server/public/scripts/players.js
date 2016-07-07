angular.module('myApp').controller('playersController', ['$scope', '$http', '$uibModal', '$rootScope',
function($scope, $http, $uibModal, $rootScope){

  $rootScope.playersArray = [];

  $scope.classTypes = ['Anti-Paladin', 'Archer', 'Assassin', 'Barbarian', 'Bard',
    'Druid', 'Healer', 'Monk', 'Paladin', 'Scout', 'Warrior', 'Wizard'];
  $scope.levelNum = ['1', '2', '3', '4', '5', '6'];
  $scope.armorNum = ['0%', '20%', '40%', '60%', '80%', '100%'];
  $scope.shieldCheck = [
    {value: true, label: 'True'},
    {value: false, label: 'False'}
  ]; // end sheildCheck array

  $scope.displayPlayers = function(){
    $http({
      method: 'GET',
      url: '/getPlayers', }).then(function(response){
        $rootScope.playersArray = response.data;
      }); // end http GET
    }; // end displayPlayers function

  $scope.displayPlayers();

  $scope.addPlayer = function(){
    var playerInfo = {
      name: $scope.nameInput,
      class: $scope.classInput,
      level: $scope.levelInput,
      armor: $scope.armorInput,
      shield: $scope.shieldInput
    }; // end object
    function randomNum() {
      return Math.floor(Math.random() * (1000000- 1000 + 1)) + 1000;
    }
    if(playerInfo.name === '' || undefined){
        playerInfo.name = 'Player#' + randomNum();
    }
    if(playerInfo.class === '' || undefined){
      playerInfo.class = 'Peasants';
    }
    if(playerInfo.level === '' || undefined){
      playerInfo.level = 1;
    }
    if(playerInfo.armor === '' || undefined){
      playerInfo.armor = '0%';
    }
    if(playerInfo.shield === '' || undefined){
      playerInfo.shield = false;
    }
    $http({
      method: 'POST',
      url: '/playerAdd',
      data: playerInfo
    }); // end POST
    $scope.nameInput = '';
    $scope.classInput = '';
    $scope.levelInput = '';
    $scope.armorInput = '';
    $scope.shieldInput = '';

    $scope.displayPlayers();
  }; // end addPlayer function

  $scope.deletePlayer = function(index){
    console.log($rootScope.playersArray[index]._id);
    var playerId = {
      id: $rootScope.playersArray[index]._id
    }; // end playerId
    $http({
      method: 'POST',
      url: '/playerRemove',
      data: playerId
    }); // end http
    $rootScope.playersArray.splice(index, 1);
  }; // end deletePlayer

  $scope.openUpdate = function(index){
    $uibModal.open({
      templateUrl: 'views/pages/updatePlayer.html',
      controller: 'updateController',
      size: 'sm',
      resolve: {
         playerId: function(){
           return index;
         } // end playerID
       } // end resolve
    }); // end $modal.open
  }; // end openUpdate

  $scope.updatePlayer = function(id){
    var updateInfo = {
      id: $rootScope.playersArray[id]._id,
      name: $scope.nameUpdate,
      class: $scope.classUpdate,
      level: $scope.levelUpdate,
      armor: $scope.armorUpdate,
      shield: $scope.shieldUpdate
    }; // end updateInfo

    if(updateInfo.name === undefined || '' || null){
      updateInfo.name = $rootScope.playersArray[id].name;
    }
    if(updateInfo.class === undefined || '' || null){
      updateInfo.class = $rootScope.playersArray[id].class;
    }
    if(updateInfo.level){
      updateInfo.level = $rootScope.playersArray[id].level;
    }
    if(updateInfo.armor){
      updateInfo.armor = $rootScope.playersArray[id].armor;
    }
    if(updateInfo.shield === undefined || '' || null){
      updateInfo.shield = $rootScope.playersArray[id].shield;
    }

    console.log("---------<><><><><>----------");
    console.log(updateInfo.name);
    console.log(updateInfo.class);
    console.log(updateInfo.level);
    console.log(updateInfo.armor);
    console.log(updateInfo.shield);

      $http({
        method: 'POST',
        url: '/playerUpdate',
        data: updateInfo
      }); // end http
  }; // end updatePlayer


}]); // end controller 'playersController'

//-----------------------------------------  uodateController -----------------------------------------

angular.module('myApp').controller('updateController',
  function ($scope, $uibModalInstance, $rootScope, playerId) {

  $rootScope.id = playerId;
  $scope.nameUpdate = $rootScope.playersArray[playerId].name;
  $scope.classUpdate = $rootScope.playersArray[playerId].class;
  $scope.levelUpdate = $rootScope.playersArray[playerId].level;
  $scope.armorUpdate = $rootScope.playersArray[playerId].armor;
  $scope.shieldUpdate = $rootScope.playersArray[playerId].shield;

  $scope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel
}); // end updateController
