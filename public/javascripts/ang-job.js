/**
 * Created by zhangyong on 2015/11/24.
 */

var app = angular.module('job-app', []);


app.controller('jobCtrl', function ($scope, $http) {


    $scope.requestParams = {};


    /**
     * …Ë÷√task_name°£
     * task_name format£∫ "'hour_hermes_stat','day_hermes_stat','hour_monitor_stat','day_monitor_stat'"
     *
     * @param name
     */
    $scope.setTaskName = function (name) {
        $scope.requestParams.taskName = name;
    }

});