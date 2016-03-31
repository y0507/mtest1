/**=========================================================
 * Module: table1.js
 * Main Application Controller
 * Created by yl on 2016/3/24.
 =========================================================*/

App.controller('userTable1Controller',function($scope){

    $scope.fName = '';
    $scope.lName = '';
    $scope.passw1 = '';
    $scope.passw2 = '';

    $scope.users = [
        {id:1,fName:'Hege',lName:'Page'},
        {id:2,fName:'Kim',lName:'Pim'},
        {id:3,fName:'Jack',lName:'Jones'},
        {id:4,fName:'John',lName:'Doe'},
        {id:5,fName:'Peter',lName:'Pan'}
    ];

    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.editUser = function(id){
        if(id == 'new'){
            $scope.edit =true;
            $scope.incomplete =true;
            $scope.fName = '';
            $scope.lName='';
        }else{
            $scope.edit = false;
            $scope.fName = $scope.users[id-1].fName;
            $scope.lName = $scope.users[id-1].lName;
        }
    };

    $scope.$watch('passw1',function(){$scope.test();});
    $scope.$watch('passw2',function(){$scope.test();});
    $scope.$watch('fName',function(){$scope.test();});
    $scope.$watch('lName',function(){$scope.test();});
    $scope.test = function(){
        if($scope.passw1 != $scope.passw2){
            $scope.error = true;
        }else{
            $scope.error = false;
        }
        $scope.incomplete = false;
        if($scope.edit && (!$scope.fName.length || !$scope.lName.length || !$scope.passw1.length || !$scope.passw2.length)){
            $scope.incomplete = true;
        }
    };
});