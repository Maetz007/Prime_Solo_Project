angular.module('myApp').controller('playersController', ['$scope', '$http', function($scope, $http){

  $scope.playersArray = [];

  $scope.classTypes = ['Anti-Paladin', 'Archer', 'Assassin', 'Barbarian', 'Bard',
    'Druid', 'Healer', 'Monk', 'Paladin', 'Scout', 'Warrior', 'Wizard'];
  $scope.levelNum = ['1', '2', '3', '4', '5', '6'];
  $scope.armorNum = ['0%', '20%', '40%', '60%', '80%', '100%'];
  $scope.shieldCheck = ['Yes', 'No'];
    // {value: true, label: 'True'},
    // {value: false, label: 'False'}


  $scope.displayPlayers = function(){
    $http({
      method: 'GET',
      url: '/getPlayers', }).then(function(response){
        $scope.playersArray = response.data;
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
