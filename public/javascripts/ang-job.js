/**
 * Created by zhangyong on 2015/11/24.
 */

var app = angular.module('job-app', []);

app.controller('jobCtrl', function ($scope, $http) {
    $scope.requestParams = {};
    $scope.taskName = [];
    $scope.taskPeriod = [];
    $scope.taskStatus = [];

    /**
     * 设置task_name。
     * task_name format： "'hour_hermes_stat','day_hermes_stat','hour_monitor_stat','day_monitor_stat'"
     *
     * @param name
     */
    $scope.setTaskNameParams = function () {
        angular.forEach($scope.taskName, function (key, val) {
            if (val != undefined) {
                console.log("aaa:" + key);
            }
        });
    };

    /**
     * 多选筛选框
     * @param itemName
     */
    $scope.clickMulitQueryItem = function (items, itemName) {
        if (items.indexOf(itemName) === -1) {
            items.push(itemName);
        }
        else {
            //remove from array
            var idx = items.indexOf(itemName);
            items.splice(idx, 1);
        }
    };

    $scope.clickSingleQueryItem = function (items, itemName) {
        if (items.indexOf(itemName) === -1) {
            console.log(itemName);
            items = [];
            items.push(itemName);
        } else {
            var idx = items.indexOf(itemName);
            items.splice(idx, 1);
        }
        console.log($scope.taskPeriod);

    };

    $scope.clickTaskStatus = function (items, taskStatusItem) {
        $scope.items[taskStatusItem] = $scope.items[taskStatusItem] === undefined ? "selected" : undefined;
    };

    $scope.getSelectedClass = function (items, itemName) {
        //console.log(items.indexOf(itemName) === -1 ? "" : "selected");
        return items.indexOf(itemName) === -1 ? "" : "selected";
    };

    $scope.doQuery = function () {
        $scope.requestParams.taskName = $scope.taskName.map(function (taskName) {
            return "'" + taskName + "'";
        }).join(",");

        $scope.requestParams.taskStatus = $scope.taskStatus.map(function (taskStatus) {
            return "'" + taskStatus + "'";
        }).join(",");


    };
});