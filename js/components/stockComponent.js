(() => {
  'use strict';

  const app = angular.module('stockApp');

  app.component('menuBar', {
    bindings: {
      brand: '='
    },
    templateUrl: '/js/components/stockComponent.html',
    controller: myComponentCtrl
  });

// myComponentCtrl.$inject = ['$scope', '$timeout'];
// My Controller
  function myComponentCtrl(stockService, $http, $scope, $timeout) {

    this.testName = 'Chase';
    $scope.data = stockService.getCharacter();

    this.stockList = [{
        id: 'nvidia'
    }, {
        id: 'apple'
    }, {
        id: 'amd'
    }, {
        id: 'amazon'
    }, {
        id: 'netflix'
    }, {
        id: 'starbucks'
    }
 ];

    this.addStock = function(newStockId){
      console.log(newStockId);
      this.stockList.push(newStockId);
    }

  };


// My service
app.service('stockService', function($http, $q){

  var stockService = {};

  stockService.data = {};

  stockService.getCharacter = function() {
    $http.get('https://www.google.com/finance/info?q=NASDAQ:aapl').success(function(response){
      var removedComment = response.split("//");
      var newData = JSON.parse(removedComment[1]);
      var symbol = newData[0];
      console.log(symbol);
      stockService.data.character = symbol;

    });
    return stockService.data;
  }
  return stockService;

});

})();
