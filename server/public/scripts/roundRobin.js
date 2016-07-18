angular.module('myApp').controller('roundRobinController',
['$scope', '$http', '$rootScope', '$uibModal', '$window', 'playerData',
function($scope, $http, $rootScope, $uibModal, $window, playerData) {

  playerData.loadPlayers();
  playerData.getTournament();
  $scope.leftTournament = [];
  $scope.rightTournament = [];
  // $scope.tournamentLength = [];
  $scope.playersList = 'Players in Tournament:';

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
      points: 0,
      place: 0
    }; // end playerRound array
  } // end Record

  $scope.getByePlayer = function(){
    if ($rootScope.playersArray.length % 2 !== 0) {
      var byeInfo = {
        name: 'BYE',
        class: 'N/A',
        level: 'Level 0'
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
      window.alert('Round Robin Tournaments must \nhave an even number of players.' +
      '\nPlease use the "Add BYE Player" button.');
    } else {
    $rootScope.competitors = [];
    $rootScope.record = [];
    $rootScope.tournament = [];
    $scope.leftTournament = [];
    $scope.rightTournament = [];
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
    var tournamentHalf = Math.ceil($rootScope.tournament.length / 2);
    for (var lr = 1; lr < $rootScope.tournament.length; lr++) { // for loop #7
      if (lr <= tournamentHalf){
        $scope.leftTournament.push($rootScope.tournament[lr-1]);
      } else if (lr > tournamentHalf) {
        $scope.rightTournament.push($rootScope.tournament[lr-1]);
      } // end else if
    } // end for loop #7
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
      size: 'sm'
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
    $scope.leftTournament = [];
    $scope.rightTournament = [];
    $rootScope.tournamentName = $rootScope.tournamentInfo[index].name;
    $rootScope.tournament = $rootScope.tournamentInfo[index].tournament;
    $rootScope.competitors = $rootScope.tournamentInfo[index].results;
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
        $scope.displayRecords(loser, wins, losses, loserPoints);
        break;
      } // end if
    } // end for loop #1
    for (var w = 0; w < $rootScope.record.length; w++) { // for loop #2
      if($rootScope.record[w].playerName == winner && $rootScope.record[w].playerRound == round){
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
    $rootScope.competitors.sort(function (left, right) { // sorts by points first then...
      if (left.competitorInfo.points > right.competitorInfo.points) {
        return 1;
      } // end if
      if (left.competitorInfo.points < right.competitorInfo.points) {
        return -1;
      } // end if
      return 0;
    }); // end sort
    $rootScope.competitors.sort(function (up, down) { //... sorts by wins after points have been sorted.
      if (up.competitorInfo.wins > down.competitorInfo.wins) {
        return 1;
      } // end if
      if (up.competitorInfo.wins < down.competitorInfo.wins) {
        return -1;
      } // end if
      return 0;
    }); // end sort
    var rank = $rootScope.competitors.length;
    for (var i = 0; i < $rootScope.competitors.length; i++) {
      $rootScope.competitors[i].competitorInfo.place = rank;
      rank--;
    }
    return $rootScope.competitors.reverse();
  }; // end sortingHat


// fun times, fun times!
  $scope.devPopup = function(){
    var x = (screen.width/2)-(300/2);
    var y = (screen.height/2)-(300/2);
    $window.open('/images/devPopupPic.jpg', '', 'width=237, height=283, left='+x+', top='+y);
  };

//-------------------------------------------  player Control  -------------------------------------------

playerData.loadPlayers();

$scope.nameInput = '';
$scope.classInput = '';
$scope.levelInput = '';

$scope.classTypes = ['Archer', 'Assassin', 'Barbarian', 'Bard',
  'Druid', 'Healer', 'Monk', 'Scout', 'Warrior', 'Wizard', 'Anti-Paladin', 'Paladin'];
$scope.levelNum = ['Level: 1', 'Level: 2', 'Level: 3', 'Level: 4', 'Level: 5', 'Level: 6'];

$scope.numTeams = {
  options: [
    {teams: 2, select: '2'},
    {teams: 3, select: '3'},
    {teams: 4, select: '4'},
]}; // end resultCheck

$scope.addPlayer = function(){

    var playerInfo = {
      name: $scope.nameInput,
      class: $scope.classInput,
      level: $scope.levelInput
    }; // end object
    if (playerInfo.name === 'Dev'){
      $scope.devPopup();
    } else {
    if(playerInfo.name === '' || undefined || 0){
        playerInfo.name = playerData.randomId();
    }
    if(playerInfo.class === '' || undefined || 0){
      playerInfo.class = 'Peasant';
    }
    if(playerInfo.level === '' || undefined || null || 0){
      playerInfo.level = 1;
    }
    $http({
      method: 'POST',
      url: '/playerAdd',
      data: playerInfo
    }); // end POST
    $scope.nameInput = '';
    $scope.classInput = '';
    $scope.levelInput = '';

    playerData.loadPlayers();
  } // end else
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
    level: $scope.levelUpdate
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
  }; // end object
  playerInfo.name = playerData.randomId();
  playerInfo.class = $scope.classTypes[playerData.randomNum(9,0)];
  playerInfo.level = playerData.randomNum(6,1);
  $http({
    method: 'POST',
    url: '/playerAdd',
    data: playerInfo
  }); // end POST
  $scope.nameInput = '';
  $scope.classInput = '';
  $scope.levelInput = '';

  playerData.loadPlayers();
}; // end randomPlayer function

$scope.openTeamsModal = function(){
  $uibModal.open({
    templateUrl: 'views/pages/teamsView.html',
    controller: 'tournamentController',
    size: 'sm'
  }); // end $modal.open
}; // end openTeamsModal

// split teams based on class, level, armor, and shield. Reach goal
$scope.createTeams = function(numberTeams){
  console.log(numberTeams);
  $rootScope.cancel();
}; // end createTeams

}]); // end controller 'roundRobinController'

//-----------------------------------------  tournamentController -----------------------------------------

angular.module('myApp').controller('tournamentController',
function ($scope, $uibModalInstance, $rootScope) {

  $rootScope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel
}); // end updateController

//-------------------------------------------  uodateController  -------------------------------------------

angular.module('myApp').controller('updateController',
function ($scope, $uibModalInstance, $rootScope, playerId) {

  $rootScope.id = playerId;
  $scope.nameUpdate = $rootScope.playersArray[playerId].name;
  $scope.classUpdate = $rootScope.playersArray[playerId].class;
  $scope.levelUpdate = $rootScope.playersArray[playerId].level;

  $rootScope.cancel = function(){
    $uibModalInstance.close();
  }; // end cancel
}); // end updateController
