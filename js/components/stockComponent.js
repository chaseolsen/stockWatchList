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




    //_______________Gets Stock List____________________
    $scope.getMyList = function(){
      $scope.stocks = stockService.getMyList();
    }
    $scope.getMyList(); // Triggers function above to get list



    $scope.myStocks = [
    ];

    //______Gets Data for Each Stock Immediately _______
    $scope.getDataForEach = function(){

      for(var i = 0; i < $scope.stocks.length; i++){
      stockService.lessSpecific($scope.stocks[i].id).then(function(response){

        var NewStock = {
          name: response.t,
          price: response.el
        };

        // $scope.myStocks.push(NewStock);


        });
      }
    };

    $scope.getDataForEach();



    //_______________Gets Stock Data____________________
    $scope.lessSpecific = function(stockReq){
      stockService.lessSpecific(stockReq).then(function(response){
        $scope.stockReqData = response;
      });
    };



    //_______Adds Stock Name to List(Object)_____________
    this.addStock = function(){
      var newStock = {
        id: $scope.newStockId
      };
      console.log(newStock);
      if (stockService.addStock(newStock)){
        $scope.newStockId = "";
      } else {};

      $scope.getDataForEach();
      console.log($scope.myStocks);

    };


    //____________Deletes from Stocks_____________________
    this.deleteStock = function(stockToRemove){
      console.log("In Controller, passing " + stockToRemove + " to stockService");
      stockService.removeData(stockToRemove);
    }



};
// End of controller








// My service
  app.service('stockService', function($http, $q){


//_________Inputs name, then converts it to stock name and returns data_____________
  this.lessSpecific = function(stockReq){
    return $http({
      method: 'GET',
      url: 'http://dev.markitondemand.com/MODApis/Api/v2/lookup/json?input=' + stockReq
    }).then(function(response){
      var stockSymbol = response.data[0].Symbol;
      // console.log(stockSymbol);
      var stockCompany = response.data[0].Name

      return $http({
        method: 'GET',
        url: 'http://www.google.com/finance/info?q=NASDAQ:' + stockSymbol
      }).then(function(response){
        if (response.status === 200){
          var total = response.data.split("//");
          var newTotal = JSON.parse(total[1]);
          var symbol = newTotal[0];
          // console.log(symbol);
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
