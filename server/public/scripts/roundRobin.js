angular.module('myApp').controller('roundRobinController',
['$scope', '$http', '$rootScope', '$uibModal', 'playerData',
function($scope, $http, $rootScope, $uibModal, playerData) {

  playerData.loadPlayers();

  $scope.resultCheck = ['3 - 0', '2 - 1', '1 - 2 ', '0 - 3'];

  function Match(roundNum, playerOne, playerTwo) {
    this.roundNum = roundNum;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  } // end Match

  $scope.getByePlayer = function(){
    if ($rootScope.playersArray.length % 2 !== 0) {
      var byeInfo = {
        name: 'BYE',
        class: 'NONE',
        level: '0',
        armor: '0%',
        shield: 'No'
      }; // end object
      $http({
          method: 'POST',
          url: '/playerAdd',
          data: byeInfo
      }).then(function(response){
        playerData.loadPlayers();
      }); // end .then
    } // end if
  }; // end showrounds

  $scope.roundRobin = function(){
  if ($rootScope.playersArray.length % 2 !== 0){
    window.alert('Round Robin Tournaments must \nhave an even number of players. \nPlease use the "Add BYE Player" button.');
  } else {
    $scope.geteTournamentName();
    var halfLength = ($rootScope.playersArray.length / 2);
    var tempArray = $rootScope.playersArray;
    var arrayOne = [];
    var arrayTwo = [];
    var round = 1;

    for (var i = 0; i < $rootScope.playersArray.length; i++) { // for loop #1
      if (i <= (halfLength - 1) ){
        arraySpot = tempArray[i].name;
        arrayOne.push(arraySpot);
      } else if (i > (halfLength - 1) ) {
        arraySpot = tempArray[i].name;
        arrayTwo.unshift(arraySpot);
      } // end else if
    } // end for loop #1

    for (var y = 0; y < ($rootScope.playersArray.length - 1); y++) { // for loop #2
      for (var x = 0; x < halfLength; x++) { // for loop #3
        var clickable = true;
        var match = new Match(round, arrayOne[x], arrayTwo[x]);
        $rootScope.tournament.push(match);
      } // end for loop #3
        var first = arrayTwo[0];
        var last = arrayOne[halfLength - 1];
        arrayOne.splice(1, 0, first);
        arrayTwo.push(last);
        arrayOne.pop();
        arrayTwo.shift();
        round++;
      } // end for loop #2
    } // end else
  }; // end roundRobin

  $scope.geteTournamentName = function(){
    $uibModal.open({
      templateUrl: 'views/pages/newTournament.html',
      controller: 'tournamentController',
    }); // end $modal.open
  }; // end openUpdate

  $scope.saveTourneyPopup = function(index){
    $uibModal.open({
      templateUrl: 'views/pages/tournamentModal.html',
      controller: 'tournamentController',
    }); // end $modal.open
  }; // end openUpdate

  $scope.saveTournamentName = function(){
    $rootScope.tournamentName = $scope.tournamentNameInput;
    $rootScope.cancel();
  }; // end saveTournamentName

  $scope.addTournament = function(){
    var tournamentToSave = {
      name: $rootScope.tournamentName,
      tournament: $rootScope.tournament
    }; // end object
    $http({
      method: 'POST',
      url: '/tournamentAdd',
      data: tournamentToSave
    }).then(function(response){
    }); // end .then
    $rootScope.cancel();
  }; // end saveTournament

  $scope.pickWinner = function(winner, loser, round, value) {
    console.log('round: ', round);
    console.log('winner = ', winner);
    console.log('loser = ', loser);
    console.log(value);
  }; // end pickWinner



}]); // end controller 'roundRobinController'


//-----------------------------------------  tournamentController -----------------------------------------

angular.module('myApp').controller('tournamentController',
  function ($scope, $uibModalInstance, $rootScope) {

  // $rootScope.id = playerId;

  $rootScope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel
}); // end updateController
