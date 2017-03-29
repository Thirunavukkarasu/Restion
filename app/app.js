/**
 * Main AngularJS Web Application
 */
angular.module('Restion', [
    'ngRoute',
    'ngMaterial',
    'jsonFormatter',
    'home',
    'history'
])

.config(function($mdThemingProvider) {
  $mdThemingProvider.definePalette('amazingPaletteName', {
    '50': 'E3F2FD',
    '100': 'BBDEFB',
    '200': '90CAF9',
    '300': '64B5F6',
    '400': '42A5F5',
    '500': '2196F3',
    '600': '1E88E5',
    '700': '1976D2',
    '800': '1565C0',
    '900': '0D47A1',
    'A100': '82B1FF',
    'A200': '448AFF',
    'A400': '2979FF',
    'A700': '2962FF',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light

    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('amazingPaletteName');
})

.factory('HistoryService', HistoryService);

function HistoryService(){
    var vm = this;

    return {
        getLocalStorage : function(){
            return chrome.storage.local;
        },
        getHistory : function(){
            return this.getLocalStorage().restionHistory;
        },
        getHistoryCount : function(){
            return Object.keys(this.getHistory()).length;
        },
        initializeHistory : function(){
            if(!this.getHistory()){
                this.getLocalStorage().restionHistory = {};
            }
        },
        saveToHistory   : function(form){
            this.getHistory()["Service "+this.getHistoryCount()] = {
                method   : form.method,
                url      : form.url,
                payload  : form.payload,
                dateTime : new Date()
            };
        }
    };
}