(function() {

    angular
        .module('MovieApp')
        .controller('ModelController', ModelController);

    function ModelController($scope) {
        $scope.username = 'Kushagra';
    }

})();