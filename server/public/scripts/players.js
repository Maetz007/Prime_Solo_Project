angular.module('myApp')
.controller('playersController',['$scope', '$http', '$uibModal', '$rootScope',
function($scope, $http, $uibModal, $rootScope){

  $rootScope.playersArray = [];

  $scope.nameInput = '';
  $scope.classInput = '';
  $scope.levelInput = '';
  $scope.armorInput = '';
  $scope.shieldInput = '';

  $scope.classTypes = ['Archer', 'Assassin', 'Barbarian', 'Bard',
    'Druid', 'Healer', 'Monk', 'Scout', 'Warrior', 'Wizard', 'Anti-Paladin', 'Paladin'];
  $scope.levelNum = ['1', '2', '3', '4', '5', '6'];
  $scope.armorNum = ['0%', '20%', '40%', '60%', '80%', '100%'];
  $scope.shieldCheck = ['Yes', 'No'];
    // {value: true, label: 'True'},
    // {value: false, label: 'False'}

  $scope.randomNum = function (max, min) {
    return Math.floor(Math.random() * (max- min + 1)) + min;
  };

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
    if(playerInfo.name === '' || undefined || 0){
        playerInfo.name = 'Player#' + $scope.randomNum(1000000, 1000);
    }
    if(playerInfo.class === '' || undefined || 0){
      playerInfo.class = 'Peasants';
    }
    if(playerInfo.level === '' || undefined || null || 0){
      playerInfo.level = 1;
    }
    if(playerInfo.armor === '' || undefined || 0){
      playerInfo.armor = '0%';
    }
    if(playerInfo.shield === '' || undefined || 0){
      playerInfo.shield = 'No';
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

    if(updateInfo.name === '' || undefined){
      updateInfo.name = $rootScope.playersArray[id].name;
    }
    if(updateInfo.class === '' || undefined){
      updateInfo.class = $rootScope.playersArray[id].class;
    }
    if(updateInfo.level === '' || undefined){
      updateInfo.level = $rootScope.playersArray[id].level;
    }
    if(updateInfo.armor === '' || undefined){
      updateInfo.armor = $rootScope.playersArray[id].armor;
    }
    if(updateInfo.shield === '' || undefined){
      updateInfo.shield = $rootScope.playersArray[id].shield;
    }
      $http({
        method: 'POST',
        url: '/playerUpdate',
        data: updateInfo
      }); // end http
    $rootScope.cancel();
  }; // end updatePlayer

  $scope.randomPlayer = function(){
    $scope.randomValue = Math.random() < 0.5 ? 0 : 1;
    var playerInfo = {
      name: $scope.nameInput,
      class: $scope.classInput,
      level: $scope.levelInput,
      armor: $scope.armorInput,
      shield: $scope.shieldInput
    }; // end object
    playerInfo.name = 'player#' + $scope.randomNum(1000000, 1000);
    playerInfo.class = $scope.classTypes[$scope.randomNum(9,0)];
    playerInfo.level = $scope.randomNum(6,1);
    playerInfo.armor = $scope.armorNum[$scope.randomNum(5,0)];
    playerInfo.shield = $scope.shieldCheck[$scope.randomValue];
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
  }; // end randomPlayer function
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

  $rootScope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel
}); // end updateController
