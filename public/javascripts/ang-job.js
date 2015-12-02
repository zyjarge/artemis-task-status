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
            items.splice(0, items.length);
            items.push(itemName);
        } else {
            var idx = items.indexOf(itemName);
            items.splice(idx, 1);
        }
    };

    $scope.clickTaskStatus = function (items, taskStatusItem) {
        $scope.items[taskStatusItem] = $scope.items[taskStatusItem] === undefined ? "selected" : undefined;
    };

    $scope.getSelectedClass = function (items, itemName) {
        return items.indexOf(itemName) === -1 ? "" : "active";
    };


    var getPeriodTime = function () {
        var dateStr = "";
        switch ($scope.taskPeriod[0]) {
            case "today":
                dateStr = 1;
                break;
            case "yesterday":
                dateStr = 2;
                break;
            case "3days":
                dateStr = 3;
                break;
            case "1weeks":
                dateStr = 7;
                break;
        }
        return dateStr;
    };

    /**
     * 通过服务器端返回的json结果渲染表格
     * @param data
     */
    $scope.getRowClass = function (status) {
        var ret = "";
        switch (status){
            case "running" :
                ret = "info";
                break;
            case "error":
                ret = "danger";
                break;
            case "done":
                ret = "success";
                break;
            default :
                ret="danger";
                break;
        }
        return ret;
    };
    /**
     * 点击查询按钮触发此方法
     */
    $scope.doQuery = function () {
        //拼接task_name
        $scope.requestParams.taskName = $scope.taskName.map(function (taskName) {
            return "'" + taskName + "'";
        }).join(",");

        //拼接task_status
        $scope.requestParams.taskStatus = $scope.taskStatus.map(function (taskStatus) {
            return "'" + taskStatus + "'";
        }).join(",");

        //    处理task_period
        $scope.requestParams.taskPeriod = getPeriodTime();

        console.log($scope.requestParams);

        $http({
            method: "POST",
            url: "/query/q",
            headers: {'Content-Type': 'application/json'},
            data: $scope.requestParams,
            responseType: "json"
        }).then(function successCallback(response) {
            $scope.tasks = response.data;
            console.log($scope.tasks);
        }, function errorCallback(response) {
            console.log(response);
        });
    };
});