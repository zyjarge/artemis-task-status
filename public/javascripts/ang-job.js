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
        return items.indexOf(itemName) === -1 ? "" : "selected";
    };


    var getPeriodTime = function () {
        var dateStr = "";
        var getLastDays = function (offset) {
            var d = new Date();
            d.setDate(d.getDate() - offset);
            return d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate()
        };
        switch ($scope.taskPeriod[0]) {
            case "today":
                dateStr = getLastDays(0);
                break;
            case "yesterday":
                dateStr = getLastDays(1);
                break;
            case "3days":
                dateStr = getLastDays(3);
                break;
            case "1weeks":
                dateStr = getLastDays(7);
                break;
        }
        return dateStr;
    };

    /**
     * 通过服务器端返回的json结果渲染表格
     * @param data
     */
    var renderTable = function (data) {

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