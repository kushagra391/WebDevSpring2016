/**
 * Created by Kushagra on 2/20/2016.
 */

console.log("From Scripts.js");
var app = angular.module('myApp', []);
app.controller('mycontroller', function ($scope) {
    $scope.firstName = "Kushagra";
    $scope.lastName = "Verma";
})