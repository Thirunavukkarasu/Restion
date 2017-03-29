angular.module('home', [])

.config(function ($routeProvider, JSONFormatterConfigProvider) {

    // Enable the hover preview feature
    JSONFormatterConfigProvider.hoverPreviewEnabled = true;

    $routeProvider.when("/",{
        templateUrl : 'app/home/home.tpl.html',
        controller  : 'HomeController'
    });  
})

.controller('HomeController', HomeController);

function HomeController($scope, $http, HistoryService){
    $scope.form = {
        method : "GET",
        url    : "http://localhost:8001/api"
    };

    $scope.responseHeaders = {};

    HistoryService.initializeHistory();
    $scope.onClickSend = function(form, event){
        $http({
            url    : form.url,
            method : form.method,
            data   : form.payload,
        })
        .success(function(data, status, headers, config) {
            $scope.rawData  = JSON.stringify(data);
            $scope.jsonData = data;
            $scope.responseHeaders = headers();
        })
        .error(function(data, status, headers, config){
            console.log("Request failed!");
            $scope.responseHeaders = headers();
        });
    }

    $scope.onClickSave = function(form){
        MainService.saveToHistory(form);
    }
}