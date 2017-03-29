angular.module('history', [])

.config(function ($routeProvider) {
    $routeProvider.when("/history",{
        templateUrl : 'app/history/history.tpl.html',
        controller  : 'HistoryController'
    });  
})

.controller('HistoryController', HistoryController);

function HistoryController($scope, $http, HistoryService){

}