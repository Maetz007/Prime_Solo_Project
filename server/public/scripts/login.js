angular.module('myApp').controller('loginController', ['$scope', '$http', function($scope, $http){

  $scope.userLogin = function(){
console.log('user login button clicked from scripts!');
    var userInfo = {
      uaer_name: $scope.adminName,
      user_password: $scope.adminPassword,
    }; // end userLogin
    $http({
      method: 'POST',
      url: '/userLogin',
      data: userInfo
    }); // end POST
    // clears inputs by user
    $scope.userName = '';
    $scope.userPassword = '';
  }; // end userLoogin function
}]); // end controller 'userController'
