(() => {
  'use strict';

  const app = angular.module('stockApp');

  app.component('stockContent', {
    templateUrl: '/js/components/stockComponent.html',
    controller: myComponentCtrl,
  });

// myComponentCtrl.$inject = ['$scope', '$timeout'];
// My Controller
  function myComponentCtrl(stockService, $http, $scope, $timeout) {

    this.testName = 'Chase';
    // $scope.data = stockService.getCharacter();

    $scope.getMyList = function(){
      $scope.stocks = stockService.getMyList();
    }

    $scope.getMyList();

    $scope.lessSpecific = function(stockReq){
      stockService.lessSpecific(stockReq).then(function(response){
        $scope.stockReqData = response;

      });
    };

    this.addStock = function(){
      var newStock = {
        id: $scope.newStockId
      };
      console.log(newStock);
      if (stockService.addStock(newStock)){
        $scope.newStockId = "";
      }
    };

    this.deleteStock = function(stockToRemove){
      console.log("In Controller, passing " + stockToRemove + " to stockService");
      stockService.removeData(stockToRemove);
    }

    $scope.getThing = function(){ // gets called with ng-click="getThing()"
      $scope.theThing = stockService.getThing();
      console.log($scope.theThing);
    }

    // $scope.getThing(); <<-- Gets it as soon as page this loads


};
// End of controller

// My service
  app.service('stockService', function($http, $q){

    var thing = "TREASURE!";

    this.getThing = function(){ //<<-- Gets called from controller: $scope.theThing = stockService.getThing();
      return thing; // <<-- Returns var thing = "TREASURE!";
    }

  this.lessSpecific = function(stockReq){

    return $http({
      method: 'GET',
      url: 'http://dev.markitondemand.com/MODApis/Api/v2/lookup/json?input=' + stockReq
    }).then(function(response){
      var stockSymbol = response.data[0].Symbol;
      var stockCompany = response.data[0].Name

      return $http({
        method: 'GET',
        url: 'http://www.google.com/finance/info?q=NASDAQ:' + stockSymbol
      }).then(function(response){
        if (response.status === 200){
          var total = response.data.split("//");
          var newTotal = JSON.parse(total[1]);
          var symbol = newTotal[0];
          console.log(symbol);
          return symbol;
        }
        return "Something went wrong";
      });
    });
  };

  var stocks = [{
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

  this.getMyList = function(){
    return stocks;
  }

  this.addStock = function(newStock){
    console.log(newStock);
    if(newStock.id){
      stocks.push(newStock);
    }
    return true;
  };

  this.removeData = function(stockToRemove){
    console.log('In Service! Deleting ' + stockToRemove)
    for (var i = 0; i < stocks.length; i++){
      if (stocks[i].id === stockToRemove){
        stocks.splice(i--, 1);
      }
    }
    console.log("Done!");
  }




  });
// End of Service


})();
