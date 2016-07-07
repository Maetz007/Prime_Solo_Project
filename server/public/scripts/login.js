angular.module('myApp').controller('loginController', ['$scope', '$http', function($scope, $http){

  $scope.userLogin = function(){
    console.log('user login button clicked from scripts');
    var userInfo = {
      uaer_name: $scope.userName,
      user_password: $scope.userPassword,
    }; // end userLogin
    $http({
      method: 'POST',
      url: '/userLogin',
      data: userInfo
    }); // end POST
    $scope.userName = '';
    $scope.userPassword = '';
  }; // end userLoogin function

  $scope.registerUser = function(){
    console.log('register button clicked');
  };



}]); // end controller 'userController'
