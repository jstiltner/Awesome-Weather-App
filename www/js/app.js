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
  // navigator.geolocation.getCurrentPosition(function (geopos){
    // var lat = geopos.coords.latitude;
    // var lon = geopos.coords.longitude;
    // var apikey = 'd679dd009502745611a44ae9f8f35978';
    var url = 'http://api.wunderground.com/api/db2e52b4bf0f042b/conditions/q/autoip.json';
    // var url = '/api/forecast/' + apikey + '/' + lat + ',' + lon;
    var url2 = 'http://api.wunderground.com/api/db2e52b4bf0f042b/forecast/q/autoip.json';
    
    $http.get(url).then(function(res){
    console.log("res.data.current_observation", res.data.current_observation );
      weather.temp = res.data.current_observation.temp_f;
      weather.city = res.data.current_observation.display_location.city; 
      weather.icon = res.data.current_observation.icon_url; 
      
      // res.data.currently.temperature = weather.temp;
      
      // weather.temp = parseInt(res.data.currently.temperature); 
      // weather.icon = res.data.currently.icon;
      console.log("weather.icon", weather.icon);
    });

    $http.get(url2).then(function(res){
      console.log("res2", res);
    })





  });
// weather.temp = "--"
  
  // Could have used ng-resource call here, but Scott has warned us against this.
// });


// .config(function ($stateProvider, $urlRouterProvider){
//   $stateProvider.state('root',{
//     url: '/',
//     template: '<h1>Hello World</h1>'
//   });
//   $urlRouterProvider.otherwise('/');

// })