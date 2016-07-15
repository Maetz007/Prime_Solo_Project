angular.module('myApp')
.controller('playersController',['$scope', '$http', '$uibModal', '$rootScope', 'playerData',
function($scope, $http, $uibModal, $rootScope, playerData){

  playerData.loadPlayers();

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
  $scope.numTeams = {
    options: [
      {teams: 2, select: '2'},
      {teams: 3, select: '3'},
      {teams: 4, select: '4'},
      {teams: 5, select: '5'},
      {teams: 6, select: '6'}
  ]}; // end resultCheck

  $scope.addPlayer = function(){
    var playerInfo = {
      name: $scope.nameInput,
      class: $scope.classInput,
      level: $scope.levelInput,
      armor: $scope.armorInput,
      shield: $scope.shieldInput
    }; // end object
    if(playerInfo.name === '' || undefined || 0){
        playerInfo.name = 'RP: ' + playerData.randomId();
    }
    if(playerInfo.class === '' || undefined || 0){
      playerInfo.class = 'Peasant';
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

    playerData.loadPlayers();
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
      }).then(function(response){
        playerData.loadPlayers();
        } // end then
      ); // end http
    $rootScope.cancel();
  }; // end updatePlayer

  $scope.randomPlayer = function(){
    $scope.randomValue = Math.random() <= 0.5 ? 0 : 1;
    var playerInfo = {
      name: $scope.nameInput,
      class: $scope.classInput,
      level: $scope.levelInput,
      armor: $scope.armorInput,
      shield: $scope.shieldInput
    }; // end object
    playerInfo.name = 'Player: ' + playerData.randomId();
    playerInfo.class = $scope.classTypes[playerData.randomNum(9,0)];
    playerInfo.level = playerData.randomNum(6,1);
    playerInfo.armor = $scope.armorNum[playerData.randomNum(5,0)];
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

    playerData.loadPlayers();
  }; // end randomPlayer function

  $scope.openTeamsModal = function(){
    $uibModal.open({
      templateUrl: 'views/pages/teamsView.html',
      controller: 'teamsController',
      size: 'sm'
    }); // end $modal.open
  }; // end openTeamsModal

  $scope.createTeams = function(numberTeams){
    console.log(numberTeams);
    


    $rootScope.cancel();
  };

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

//-----------------------------------------  teamsController -----------------------------------------

angular.module('myApp').controller('teamsController',
function ($scope, $uibModalInstance, $rootScope) {

  $rootScope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel
}); // end updateController
