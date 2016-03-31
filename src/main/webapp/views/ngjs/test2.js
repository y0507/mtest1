/**=========================================================
 * Module: test2.js
 * Main Application Controller
 * Created by yl on 2016/3/23.
 =========================================================*/


App.controller('formCtrl',function($scope){
    $scope.master = {firstName:"",add:"",email:""};
    $scope.reset = function(){
        $scope.user = angular.copy($scope.master);
        $scope.user = {};
    };
    $scope.reset();
});
