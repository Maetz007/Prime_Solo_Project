angular.module('myApp').controller('adminController', ['$scope', '$http', function($scope, $http){

  $scope.adminLogin = function(){
console.log('admin login button clicked from scripts!');
    var userInfo = {
      admin_name: $scope.adminName,
      admin_password: $scope.adminPassword,
    }; // end adminLogin
    $http({
      method: 'POST',
      url: '/adminLogin',
      data: adminInfo
    }); // end POST
    // clears inputs by user
    $scope.adminName = '';
    $scope.adminPassword = '';
  }; // end adminLoogin function
}]); // end controller 'adminController'
