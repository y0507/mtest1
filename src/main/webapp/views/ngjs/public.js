/**=========================================================
 * Module: public.js
 * Main Application Controller
 * Created by yl on 2016/3/23.
 =========================================================*/

App.controller('',['',
    function($scope, $rootScope, $state){

        // 页面标题
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function() {
            var title = $rootScope.app.indexTitle + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
            document.title = title;
            return title;
        };




}]);
