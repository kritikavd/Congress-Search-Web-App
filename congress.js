
var app = angular.module('legislatorsApp', [
    'angularUtils.directives.dirPagination',
    'ui.bootstrap',
]);

var isRequestFired=false;
var isRequestFiredBills =false;
var globalData=[];
var globalDataBills=[];

var isRequestFiredCommittees= false;
var globalDataCommittees=[];

var bioguideId='';

 app.controller('ListController',function($rootScope,$scope, $http){
         
     $scope.msg='this is the first div';
     $scope.users = []; //declare an empty array
     $scope.bills=[];
     $scope.favLegislators=[];
      $scope.favCommittees=[];
      $scope.favBills=[];
     $scope.committees=[];
     
     var legislatorsJsonObjectFromLocal = localStorage.getItem("favouriteLegislators");
    
     if(legislatorsJsonObjectFromLocal!=null && legislatorsJsonObjectFromLocal!=''){
          var jsonObject = JSON.parse(legislatorsJsonObjectFromLocal);
         $scope.favLegislators=jsonObject.results;
     }
     
      var billsJsonObjectFromLocal = localStorage.getItem("favouriteBills");
    
     if(billsJsonObjectFromLocal!=null && billsJsonObjectFromLocal!=''){
         
          var jsonObject = JSON.parse(billsJsonObjectFromLocal);
         $scope.favBills=jsonObject.results;
     }
     
      var committeesJsonObjectFromLocal = localStorage.getItem("favouriteCommittees");
    
     if(committeesJsonObjectFromLocal!=null && committeesJsonObjectFromLocal!=''){
        
          var jsonObject = JSON.parse(committeesJsonObjectFromLocal);
         $scope.favCommittees=jsonObject.results;
     }
    
     if(!isRequestFired){
        $http.get("congress.php").success(function(response) {
        
            $scope.users = response.results; 
            globalData=$scope.users;
            isRequestFired=true;
        });
    } else{
        $scope.users=globalData;
    }
     
     
    if(!isRequestFiredBills){
        
         $http.get("bills.php").success(function(response) {
        
            $scope.bills = response.results; 
            
             globalDataBills=$scope.bills;
            isRequestFiredBills=true;
        });
    } else{
        $scope.bills=globalDataBills;
    } 
     
     
     if(!isRequestFiredCommittees){
           
       
        
         $http.get("committee.php").success(function(response) {
        
            $scope.committees = response.results;       
             globalDataCommittees=$scope.committees;
            isRequestFiredCommittees=true;
        });
    } else{
        $scope.committees=globalDataCommittees;
    } 
       
       
               
    $scope.getData= function(bioId){
        
         $http.get("congress.php?bioguideId="+bioId).success(function(response) {
             
			$rootScope.$broadcast('datausers', response.results);       
    	});
		
		$http.get("bills.php?bioguideId="+bioId).success(function(response) {
            $rootScope.$broadcast('databills', response.results);  
    	});
    
     	$http.get("committee.php?bioguideId="+bioId).success(function(response) {
            $rootScope.$broadcast('datacommittees', response.results);  
    	})
         
     }
    
     $scope.$on('dataFavLegislators', function(event, users) {
         
         $scope.favLegislators=users;
     });
     
      $scope.$on('dataFavCommittees', function(event, users) {
         
         $scope.favCommittees=users;
     });
     
     
     
      $scope.$on('dataFavBills', function(event, users) {
         
         $scope.favBills=users;
     });
    
    $scope.getDataForBills= function(bioId){
        
       
         $http.get("bills.php?bill_id="+bioId).success(function(response) {
             
			$rootScope.$broadcast('dataBillsDetail', response.results);       
    	});
		
		
         
     }
    
     $scope.getDataFav = function(bioId){
        
         
        //var legislatorsJsonObjectFromLocal = localStorage.getItem("favouriteLegislators");
        //var jsonObject = JSON.parse(legislatorsJsonObjectFromLocal);
        var resultArray = $scope.favLegislators;
        var dataFavLegislators = [];
         
        var index=-1;
             for(var i = 0;i < resultArray.length;i++){
                 if(resultArray[i].bioguide_id==bioId){
                     index = i;
                 }
        }
         
       
        if(index>=0){
            dataFavLegislators.push(resultArray[index]);
          
            $rootScope.$broadcast('datausers', dataFavLegislators);      
        }
         
     }
     
      $scope.getDataFavBills = function(billid){
        
         
        //var legislatorsJsonObjectFromLocal = localStorage.getItem("favouriteLegislators");
        //var jsonObject = JSON.parse(legislatorsJsonObjectFromLocal);
        var resultArray = $scope.favBills;
        var dataFavBills = [];
         
        var index=-1;
             for(var i = 0;i < resultArray.length;i++){
                 if(resultArray[i].bill_id==billid){
                     index = i;
                 }
        }
         
        
        if(index>=0){
            dataFavBills.push(resultArray[index]);
           
            $rootScope.$broadcast('dataBillsDetail', dataFavBills);      
        }
         
     }
    

      $scope.removeFromFavourites=function(bioId){
            
            var legislatorsJsonObjectFromLocal = localStorage.getItem("favouriteLegislators");
            var jsonObject = JSON.parse(legislatorsJsonObjectFromLocal);
            var resultArray = jsonObject.results;
            var index=-1;
             for(var i = 0;i < resultArray.length;i++){
                 if(resultArray[i].bioguide_id==bioId){
                     index = i;
                 }
             }
             
         
                 if(index>=0){
                     resultArray.splice(index, 1);
                 }
             
             jsonObject.results=resultArray;
          
          
            $rootScope.$broadcast('dataFavLegislators', resultArray);      
                  
                    var jsonString = JSON.stringify(jsonObject);
                    localStorage.setItem("favouriteLegislators", jsonString);  
             
             var legislatorsJsonObjectFromLocalAfter = localStorage.getItem("favouriteLegislators");
            var jsonStringAftre = legislatorsJsonObjectFromLocalAfter;
         

        }
      
        $scope.removeFromFavouritesBills=function(billid){    
           
            //var $element1 = $('div[ng-controller="ListController"]');
            //var scopeList = angular.element($element1).scope();
            
            var billsJsonObjectFromLocal = localStorage.getItem("favouriteBills");
            var jsonObject = JSON.parse(billsJsonObjectFromLocal);
            var resultArray = jsonObject.results;
            var index=-1;
             for(var i = 0;i < resultArray.length;i++){
                 if(resultArray[i].bill_id==billid){
                     index = i;
                 }
             }
             
        
                 if(index>=0){
                     resultArray.splice(index, 1);
                 }
             
             jsonObject.results=resultArray;
                    //$scope.favLegislators=resultArray;
               // console.log('first_name '+$scoe.favLegislators[0].first_name);
                   // $scope.$apply();
            $rootScope.$broadcast('dataFavBills', resultArray);      
                   // favLegislators=jsonObject.results;
                    var jsonString = JSON.stringify(jsonObject);
                    localStorage.setItem("favouriteBills", jsonString);  
             
             var billsJsonObjectFromLocalAfter = localStorage.getItem("favouriteBills");
            var jsonStringAftre = billsJsonObjectFromLocalAfter;
           

        }
        
          $scope.removeFromFavouritesCommittees=function(comid){    
            
            //var $element1 = $('div[ng-controller="ListController"]');
            //var scopeList = angular.element($element1).scope();
            
            var committeesJsonObjectFromLocal = localStorage.getItem("favouriteCommittees");
            var jsonObject = JSON.parse(committeesJsonObjectFromLocal);
            var resultArray = jsonObject.results;
            var index=-1;
             for(var i = 0;i < resultArray.length;i++){
                 if(resultArray[i].committee_id==comid){
                     index = i;
                 }
             }
             
         
                 if(index>=0){
                     resultArray.splice(index, 1);
                 }
             
             jsonObject.results=resultArray;
                   
            $rootScope.$broadcast('dataFavCommittees', resultArray);      
                   // favLegislators=jsonObject.results;
                    var jsonString = JSON.stringify(jsonObject);
                    localStorage.setItem("favouriteCommittees", jsonString);  
             
             var billsJsonObjectFromLocalAfter = localStorage.getItem("favouriteCommittees");
            var jsonStringAftre = billsJsonObjectFromLocalAfter;
            

        }
    
    $scope.pageChangeHandler = function(num) {
     
  }
    
    
     $scope.addToFavouritesCommittees=function(comid){
    
          var committeesJsonObjectFromLocal = localStorage.getItem("favouriteCommittees");
        
       
            var jsonObject={};
            var arrayCom=[];
         
            var commmitteesSetArray = $scope.committees;
                var index=-1;
                for(var i = 0;i < commmitteesSetArray.length;i++){
                 if(commmitteesSetArray[i].committee_id==comid){
                     index = i;
                 }
            }
         
             if(index>=0){
                    arrayCom.push(commmitteesSetArray[index]);
                    
            }
         
            if(committeesJsonObjectFromLocal==null || committeesJsonObjectFromLocal==''){
               
                    jsonObject.results=arrayCom;
                    var jsonString = JSON.stringify(jsonObject);
                    localStorage.setItem("favouriteCommittees", jsonString);
                
            } else {
                
               
                
                     jsonObject = JSON.parse(committeesJsonObjectFromLocal);
                    var resultArray = jsonObject.results;
                    resultArray=resultArray.concat(arrayCom);
                 
                    jsonObject.results=resultArray;
                    var jsonString = JSON.stringify(jsonObject);
                    localStorage.setItem("favouriteCommittees", jsonString);    
            }
        
        $rootScope.$broadcast('dataFavCommittees', jsonObject.results);     
        
            var committeesJsonObjectFromLocalAftre = localStorage.getItem("favouriteCommittees");
            var jsonStringAftre = committeesJsonObjectFromLocalAftre;
           
        }
    
});



app.controller('DetailsController',function($rootScope,$scope,$http){
    
    var bills=[];
    var committees=[];
    var billsDetails=[];
    
    $scope.addToFavourites=function(){
    
          var legislatorsJsonObjectFromLocal = localStorage.getItem("favouriteLegislators");
        
       
            var jsonObject={};
            if(legislatorsJsonObjectFromLocal==null || legislatorsJsonObjectFromLocal==''){
                
                
                jsonObject.results=$scope.users;
               
                var jsonString = JSON.stringify(jsonObject);
                localStorage.setItem("favouriteLegislators", jsonString);
                
            } else {
                     jsonObject = JSON.parse(legislatorsJsonObjectFromLocal);
                    var resultArray = jsonObject.results;
                    resultArray=resultArray.concat($scope.users);
                 
                    jsonObject.results=resultArray;
                    var jsonString = JSON.stringify(jsonObject);
                    localStorage.setItem("favouriteLegislators", jsonString);    
               
            }
        
        $scope.users[0].fav=true;
        $scope.apply();
        
        $rootScope.$broadcast('dataFavLegislators', jsonObject.results);     
        
            var legislatorsJsonObjectFromLocalAfter = localStorage.getItem("favouriteLegislators");
            var jsonStringAftre = legislatorsJsonObjectFromLocalAfter;
           
        }
    
    $scope.addToFavouritesBills=function(){
          var billsJsonObjectFromLocal = localStorage.getItem("favouriteBills");
        
        
            var jsonObject={};
            if(billsJsonObjectFromLocal==null || billsJsonObjectFromLocal==''){
                
              
                jsonObject.results=$scope.billsDetails;
               
                var jsonString = JSON.stringify(jsonObject);
                localStorage.setItem("favouriteBills", jsonString);
                
            } else {
                
                
                
                     jsonObject = JSON.parse(billsJsonObjectFromLocal);
                    var resultArray = jsonObject.results;
                    resultArray=resultArray.concat($scope.billsDetails);
                 
                    jsonObject.results=resultArray;
                    var jsonString = JSON.stringify(jsonObject);
                    localStorage.setItem("favouriteBills", jsonString);    
               
            }
        
        $rootScope.$broadcast('dataFavBills', jsonObject.results);     
        
            var billsJsonObjectFromLocalAfter = localStorage.getItem("favouriteBills");
            var jsonStringAftre = billsJsonObjectFromLocalAfter;
           
 }
    
    
    $scope.$on('datausers', function(event, users) {
        
       
    		$scope.users=users;
            var startString  = users[0].term_start;
            var birthday = users[0].birthday;
            birthday = moment(birthday).format('MMM DD,YYYY');
            var start= moment(startString, 'YYYY-MM-DD');
        
            var startDate = moment(start).format('MMM DD,YYYY');
            var end= moment(users[0].term_end, 'YYYY-MM-DD');
            var endDate = moment(end).format('MMM DD,YYYY');
            var now= moment();
            now = moment(now,'YYYY-MM-DD');
            var numerator = now.diff(start,'days');
            var denominator = end.diff(start,'days');
            var pct = (numerator/denominator) * 100;
            pct = Math.round(pct);
            pct=(pct<=100?pct:100);
        
            $scope.pct=pct;
        $scope.startDate= startDate;
        $scope.endDate=endDate;
        $scope.birthday=birthday;
        
            
            //$scope.users[0].pct=pct;
        
            //$scope.dynamic = 10;
            //$scope.type = 'success';
  	});
	$scope.$on('databills', function(event, users) {
    		$scope.bills=users;
  	});
	$scope.$on('datacommittees', function(event, users) {
    		$scope.committees=users;
  	});
    
    $scope.$on('dataBillsDetail', function(event, users) {
    		$scope.billsDetails=users;
            
            var introduced = users[0].introduced_on;
            introduced = moment(introduced).format('MMM DD,YYYY');
            $scope.introduced = introduced;
  	});
     
});


function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    
  };
}

app.controller('OtherController', OtherController);

