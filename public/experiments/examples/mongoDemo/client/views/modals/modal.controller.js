(function () {

    angular
        .module('mongoApp')
        .controller('ModalController', ModalController);

    function ModalController() {
        var vm = this;

        vm.modalUsername = "#ModalUsername";
        vm.modalName = "#ModalName";
        vm.modalPassword = "#ModalPassword";

        vm.submit = submit;
        vm.submitOptions = submitOptions;

        function submitOptions(user) {
            console.log("Options: " + JSON.stringify(user));

            var options = createOptions(user.options);
            var field = {"label" : user.label, "options" : options};

            // pass on to the master method
            submit(field);
        }


        function submit(user) {
            console.log('Submitting user: ' + JSON.stringify(user));
        }


        function createOptions(options) {
            var fields = [];

            var lines = options.split("\n");
            for (var index in lines) {
                var pairs = lines[index].split(":");

                var label = pairs[0];
                var value = pairs[1];
                var option = {label: value};

                fields.push(option);
            }

            return fields;
        }

    }

}) ();