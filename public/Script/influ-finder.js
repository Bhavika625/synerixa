let module = angular.module("myModal", []);
let controller = module.controller("myController", function ($scope, $http) {

    $scope.fields = ["Music", "Fashion", "Dance","Lifestyle","Health", "Modal"];
    $scope.jsonArrayCity;
    $scope.jsonArrayAll;
    $scope.jsonUpcomingEvents
    $scope.jsonPrevEvents;

    $scope.getCity = function (txtField) 
    {
        // alert();
        let url = "/get-city?txtField=" +txtField;

        $http.get(url).then(allIsWell, notWell);

        function allIsWell(response) {
            // alert(JSON.stringify(response.data)) ;
            $scope.jsonArrayCity = response.data;
        }
        function notWell(err) {
            alert(err)
        }
    }

    $scope.getAllInf = function () 
    {
        // alert();
        let url = "/get-inf";

        $http.get(url).then(allIsWell, notWell);

        function allIsWell(response) {
            // alert(JSON.stringify(response.data)) ;
            $scope.jsonArrayAll = response.data;
            var len = $scope.jsonArrayAll.length;

                        // alert(len);

                        for(var i=0; i<len; i++)
                        {
                        //   alert($scope.jsonAllEvents[i].doe);
                          let date = new Date($scope.jsonArrayAll[i].dob);
                          $scope.jsonArrayAll[i].dob = date.toLocaleDateString();
                        }
        }
        function notWell(err) {
            alert(err)
        }
    }

    $scope.getInf = function () {

        let url = "";
        // alert();
    
        if($scope.txtField != undefined)
        {
            url = "/get-inf-by-field?txtField="+$scope.txtField;
            if($scope.selCity != undefined)
            {
                url = "/get-inf-by-field-city?txtField="+$scope.txtField + "&selCity="+$scope.selCity;
                if($scope.txtName != undefined)
                    url = "/get-inf-by-field-city-name?txtField="+$scope.txtField + "&selCity="+$scope.selCity + "&txtName="+$scope.txtName;
            }
            else if($scope.txtName != undefined)
            {
                url = "/get-inf-by-field-name?txtField="+$scope.txtField + "&txtName="+$scope.txtName;
            }
        }
        else if($scope.txtName != undefined)
        {
            url = "/get-inf-by-name?txtName="+$scope.txtName;
            if($scope.selCity != undefined)
            {
                url = "/get-inf-by-name-city?txtName="+$scope.txtName+"&selCity="+$scope.selCity;
            }
        }
        else if($scope.selCity != undefined)
        {
            url = "/get-inf-by-city?selCity="+$scope.selCity;
        }

        // alert(url);

        $http.get(url).then(allIsWell, notWell);

        function allIsWell(response) {
            // alert(JSON.stringify(response.data)) ;
            $scope.jsonArrayAll = response.data;
            var len = $scope.jsonArrayAll.length;

                        // alert(len);

                        for(var i=0; i<len; i++)
                        {
                          // alert($scope.jsonAllEvents[i].doe);
                          let date = new Date($scope.jsonArrayAll[i].dob);
                          $scope.jsonArrayAll[i].dob = date.toLocaleDateString();
                        }
        }
        function notWell(err) {
            alert(err)
        }
    }

    $scope.showInf = function(index)
    {
        // alert(index);
        $scope.fullDetails = $scope.jsonArrayAll[index];
        

        let url1 = "/get-pre-event?email="+$scope.fullDetails.email;
        // alert(url);
        $http.get(url1).then(allIsWell, notWell);

        function allIsWell(response) {
            // alert(JSON.stringify(response)) ;
            $scope.jsonPrevEvents = response.data;
            var len = $scope.jsonPrevEvents.length;

                        // alert(len);

                        for(var i=0; i<len; i++)
                        {
                          // alert($scope.jsonAllEvents[i].doe);
                          let date = new Date($scope.jsonPrevEvents[i].doe);
                          $scope.jsonPrevEvents[i].doe = date.toLocaleDateString();
                        }
        }
        function notWell(err) {
            alert(err)
        }

        let url2 = "/get-upcoming-event?email="+$scope.fullDetails.email;
        // alert(url);
        $http.get(url2).then(allIsWell, notWell);

        function allIsWell(response) {
            // alert(JSON.stringify(response)) ;
            $scope.jsonUpcomingEvents = response.data;
            var len = $scope.jsonUpcomingEvents.length;

                        // alert(len);

                        for(var i=0; i<len; i++)
                        {
                          // alert($scope.jsonAllEvents[i].doe);
                          let date = new Date($scope.jsonUpcomingEvents[i].doe);
                          $scope.jsonUpcomingEvents[i].doe = date.toLocaleDateString();
                        }
        }
        function notWell(err) {
            alert(err)
        }

    }

    $scope.doLogOut = function()
                {
                  localStorage.removeItem("activeuser");
                  location.href="index.html";
                }
   
});

