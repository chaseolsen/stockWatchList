// (function(){
//
//   var app = angular.module('stockApp', []);
//
//   // app.controller('HomeCtrl', function(){
//   //   this.message = "Hello, world!";
//   // });
//
// })();


angular.module('stockApp', ['ui.router']).config(function($urlRouterProvider, $stateProvider) {
  //include $location

   $urlRouterProvider.otherwise('/');

  //  $stateProvider
  //  .state('home', {
  //    url: '/home',
  //   //  controller: 'myComponentCtrl',
  //    templateUrl: '/index.html'
  //  })


});
