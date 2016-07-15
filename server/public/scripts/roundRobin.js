angular.module('myApp').controller('roundRobinController',
['$scope', '$http', '$rootScope', '$uibModal', 'playerData',
function($scope, $http, $rootScope, $uibModal, playerData) {

  playerData.loadPlayers();
  playerData.getTournament();
  $scope.playersList = 'Players in Tournament:';

  $scope.winLossDisplay = ['2 - 0', '2 - 1', '1 - 2', '0 - 2'];

  $scope.resultCheck = {
    options: [
      {point: 1, select: '2 - 1'},
      {point: 2, select: '2 - 0'}
  ]}; // end resultCheck

  function Match(roundNum, playerOne, playerTwo) {
    this.roundNum = roundNum;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  } // end Match

  function Record(playerName, playerRound, playerInfo) {
    this.playerName = playerName;
    this.playerRound = playerRound;
    this.playerInfo = {
      wins: 0,
      losses: 0,
      points: 0
    }; // end playerRound array
  } // end Record

  function Competitor(competitor, competitorInfo) {
    this.competitor = competitor;
    this.competitorInfo = {
      wins: 0,
      losses: 0,
      points: 0
    }; // end playerRound array
  } // end Record

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
    $rootScope.competitors = [];
    $rootScope.record = [];
    $rootScope.tournament = [];
    $scope.getTournamentName();
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
        var match = new Match(
          round,
          arrayOne[x],
          arrayTwo[x]
        ); // end Match
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
    for (var z = 0; z < $rootScope.playersArray.length; z++) { // for loop #4
      for (var n = 0; n <$rootScope.playersArray.length - 1; n++) { // for loop #5
        var playerName = $rootScope.playersArray[z].name;
        var roundNum = n+1;
        var initialInfo = new Record (
          playerName,
          roundNum
        ); // end Record
        $rootScope.record.push(initialInfo);
      } // end for loop #5
      var addPlayers = new Competitor (
        $rootScope.playersArray[z].name
      ); // end new Competitor
      $rootScope.competitors.push(addPlayers);
    } // end for loop #4
    var allPlayers = $rootScope.competitors;
    for(var r = 0; r < allPlayers.length; r++) { // for loop #6
      if (allPlayers[r].competitor == 'BYE') {
        $rootScope.competitors.splice(r, 1);
        break;
      } // end if
    } // end for loop #6
    } // end else
  }; // end roundRobin

  $scope.getTournamentName = function(){
    $uibModal.open({
      templateUrl: 'views/pages/newTournament.html',
      controller: 'tournamentController',
      size: 'sm'
    }); // end $modal.open
  }; // end openUpdate

  $scope.loadTournamentPopup = function(){
    $uibModal.open({
      templateUrl: 'views/pages/loadTournament.html',
      controller: 'tournamentController',
    }); // end $modal.open
  };

  $scope.saveTourneyPopup = function(index){
    $uibModal.open({
      templateUrl: 'views/pages/saveTournament.html',
      controller: 'tournamentController',
      size: 'sm'
    }); // end $modal.open
  }; // end openUpdate

  $scope.deleteTourneyPopup = function(){
    $uibModal.open({
      templateUrl: 'views/pages/deleteTournament.html',
      controller: 'tournamentController'
    }); // end $modal.open
  }; // end openUpdate

  $scope.saveTournamentName = function(){
    $rootScope.tournamentName = $scope.tournamentNameInput;
    $rootScope.cancel();
  }; // end saveTournamentName

  $scope.loadTournament = function(index){
    playerData.getTournament();
    $rootScope.tournamentName = '';
    $rootScope.tournament =[];
    $rootScope.competitors = [];
    $rootScope.tournamentName = $rootScope.tournamentInfo[index].name;
    $rootScope.tournament = $rootScope.tournamentInfo[index].tournament;
    $rootScope.competitors = $rootScope.tournamentInfo[index].results;
    // $rootScope.record = [];
    $rootScope.cancel();
  };

  $scope.saveTournament = function(){
    var tournamentToSave = {
      name: $rootScope.tournamentName,
      tournament: $rootScope.tournament,
      results: $rootScope.competitors
    }; // end object
    $http({
      method: 'POST',
      url: '/tournamentAdd',
      data: tournamentToSave
    }).then(function(response){
    }); // end .then
    $rootScope.tournamentName = '';
    $scope.playersList = '';
    $rootScope.tournament =[];
    $rootScope.competitors = [];
    $rootScope.cancel();
  }; // end saveTournament

  $scope.deleteTournament = function(index){
    var tournamentId = {
      id: $rootScope.tournamentInfo[index]._id
    }; // end playerId
    $http({
      method: 'POST',
      url: '/deleteTournament',
      data: tournamentId
    }); // end http
    $rootScope.tournamentInfo.splice(index, 1);
  }; // end deletePlayer

  $scope.updateRecord = function(winner, loser, round, points) {
    console.log('updateRecord button clicked');
    var winnerPoints, loserPoints, wins, losses, oppPoints;
    if (points == 2) {
      winnerPoints = 3; loserPoints = 0;
    } else if (points == 1) {
      winnerPoints = 2; loserPoints = 1;
    } // end else if
    for (var l = 0; l < $rootScope.record.length; l++) { // for loop #1
      if($rootScope.record[l].playerName == loser && $rootScope.record[l].playerRound == round){
        $rootScope.record[l].playerInfo.wins = 0;
        $rootScope.record[l].playerInfo.losses = 1;
        $rootScope.record[l].playerInfo.points = loserPoints;
        wins = 0;
        losses = 1;
        // oppPoints = $rootScope.record[l].playerInfo.points;
        $scope.displayRecords(loser, wins, losses, loserPoints);
        break;
      } // end if
    } // end for loop #1
    for (var w = 0; w < $rootScope.record.length; w++) { // for loop #2
      if($rootScope.record[w].playerName == winner && $rootScope.record[w].playerRound == round){
        // winnerPoints = winnerPoints + oppPoints;
        $rootScope.record[w].playerInfo.wins = 1;
        $rootScope.record[w].playerInfo.losses = 0;
        $rootScope.record[w].playerInfo.points = winnerPoints;
        wins = 1;
        losses = 0;
        $scope.displayRecords(winner, wins, losses, winnerPoints);
        break;
      } // end if
    } // end for loop #2
  }; // end pickWinner

  $scope.displayRecords = function(player, wins, losses, points){
    var tempArray = [];
    for (var c = 0; c < $rootScope.competitors.length; c++) { // for loop #1
      if($rootScope.competitors[c].competitor == player){
        $rootScope.competitors[c].competitorInfo.wins = $rootScope.competitors[c].competitorInfo.wins + wins;
        $rootScope.competitors[c].competitorInfo.losses = $rootScope.competitors[c].competitorInfo.losses + losses;
        $rootScope.competitors[c].competitorInfo.points = $rootScope.competitors[c].competitorInfo.points + points;
      } // end if
    } // for loop #1
    $scope.sortingHat();
  }; // end displayRecords

  $scope.sortingHat = function(){
    $rootScope.competitors.sort(function (left, right) { // sorts by points first
      if (left.competitorInfo.points > right.competitorInfo.points) {
        return 1;
      } // end if
      if (left.competitorInfo.points < right.competitorInfo.points) {
        return -1;
      } // end if
      return 0;
    }); // end sort
    $rootScope.competitors.sort(function (up, down) { // sorts by wins after points have been sorted
      if (up.competitorInfo.wins > down.competitorInfo.wins) {
        return 1;
      } // end if
      if (up.competitorInfo.wins < down.competitorInfo.wins) {
        return -1;
      } // end if
      return 0;
    }); // end sort
    return $rootScope.competitors.reverse();
  }; // end sortingHat

 $scope.doSomething = function(){
   var tableRound = angular.element(document.querySelector('#tableDiv'));
   var roundAttach;
   var tempArray = [];
   tempArray = $rootScope.tournament;

   var thingyMehJigger = ' STUFF! ';

   var numPlayers = $rootScope.playersArray.length;
   for (var r = 1; r < numPlayers; r++) {
     var roundNum = r;
     tableRound.append('<table class="rounds" id="round' + roundNum + '"</table>');
   }
  //  for (var m = 1; m < tempArray.length + 1; m++) {
  //    if ($rootScope.tournament[m-1].roundNum == m) {
  //     roundAttach = angular.element(document.querySelector('#round' + m));
  //     roundAttach.append('<tr> <td>{{ contestant.playerOne }}</td> <td> <select ng-model="resultInputOne"ng-change="updateRecord(contestant.playerOne, contestant.playerTwo, contestant.roundNum, resultInputOne)"><option ng-repeat="option in resultCheck.options" value="{{option.point}}"> {{option.select}} </option> </td> <td>{{ contestant.playerTwo }}</td> <td> <select ng-model="resultInputTwo" ng-change="updateRecord(contestant.playerTwo, contestant.playerOne, contestant.roundNum, resultInputTwo)"> <option ng-repeat="option in resultCheck.options" value="{{option.point}}"> {{option.select}} </option> </td> </tr>');
  //     tempArray.splice(m-1, 1);
  //    }
  //  }
 }; // end doSomething


}]); // end controller 'roundRobinController'


//-----------------------------------------  tournamentController -----------------------------------------

angular.module('myApp').controller('tournamentController',
function ($scope, $uibModalInstance, $rootScope) {

  $rootScope.cancel = function(){
    $uibModalInstance.close();
    }; // end cancel
  }); // end updateController

angular.module('myApp').directive('myTables', function(){
  return {
    template: '<tr><td>{{ $rootScope.tournament[1].playerOne }}</td><td> <select ng-model="resultInputOne"ng-change="updateRecord(contestant.playerOne, contestant.playerTwo, contestant.roundNum, resultInputOne)"><option ng-repeat="option in resultCheck.options" value="{{option.point}}"> {{option.select}} </option> </td> <td>{{ contestant.playerTwo }}</td> <td> <select ng-model="resultInputTwo" ng-change="updateRecord(contestant.playerTwo, contestant.playerOne, contestant.roundNum, resultInputTwo)"> <option ng-repeat="option in resultCheck.options" value="{{option.point}}"> {{option.select}} </option> </td> </tr>'
  		// restrict: "E",
  		// replace: true,
  		// template: "<div class='led led-off' ng-class='{ \"led-on\": isOn, \"led-off\": !isOn }' ng-click='onOff()'>{{isOn}}</div>",
  	// 	link: function(scope, element, attributes, controller)
  	// 	{
  	// 		scope.isOn = false;
    //           scope.onOff = function () {
    //               scope.isOn = !scope.isOn;
    //           };
    //
  	// 	}
  	};
});
