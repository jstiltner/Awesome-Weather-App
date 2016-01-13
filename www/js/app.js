// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'angular-skycons'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller( 'weatherCtrl', function($http){
   var weather = this;
   var url = 'http://api.wunderground.com/api/db2e52b4bf0f042b/';
   var ctag = 'conditions/q/autoip.json';
   var ftag = 'forecast/q/autoip.json';
   
   function parseWUData (res){
      var data = res.data.current_observation;
      weather.temp = data.temp_f;
      weather.city = data.display_location.city; 
      city = weather.city
      weather.icon = data.icon_url; 
      return res;
    };
  
  weather.search = function(){ 
    $http
      .get(url + 'conditions/q/' + weather.searchQuery+ '.json')
      .then(parseWUData)
      .then(function(res){ 
        var history = JSON.parse(localStorage.getItem('searchHistory')) || {};
        history[weather.city] = res.data.current_observation.station_id;
        localStorage.setItem('searchHistory', JSON.stringify(history));
      });
   }

   

  $http.get(url + ctag).then(function(res){
  parseWUData(res);   
  });

  $http.get(url + ftag).then(function(res){    
  })
});
