(function () {

    angular
        .module('mongoApp')
        .controller('ModalController', ModalController);

    function ModalController() {
        var vm = this;

        vm.modalUsername = "#ModalUsername";
        vm.modalName = "#ModalName";
        vm.modalPassword = "#ModalPassword";
        
        
    }

}) ();