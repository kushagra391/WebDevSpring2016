(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController(FormService, UserService) {
        var vm = this;
        
        vm.selectedFormId = null;
        vm.error = null;
        vm.forms = FormService.findAllForms();

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        vm.currentUser = UserService.getCurrentUser();
        FormService
            .findAllForms()
            .then(function (res) {
                vm.forms = res.data; // TODO: .data
            });


        function addForm(form) {
            if (!form.title) {
                vm.error = "Please provide a form name.";
                return;
            }
            if (vm.currentUser == null) {
                vm.error = "Please login.";
                return;
            }

            FormService
                .createFormForUser(vm.currentUser._id, form)
                .then(function (response) {
                    if (response.data) {  // if, response not null
                        vm.forms = response.data;
                        var formsCount = vm.forms.length;

                        FormService.setCurrentForm(vm.forms[formsCount - 1]);

                        form.title = ''; // TODO: clear header fields
                    } else {
                        vm.error = 'Failed: Form not created';
                    }
                });
        }

        function updateForm(form) {
            if (vm.selectedFormId == null) {
                vm.error = "Please select a form.";
                return;
            }

            if (form.userId == null) {
                form.userId = vm.currentUser._id;
            }


            FormService
                .updateFormById(vm.selectedFormId, form)
                .then(function (response) {
                    if (response.data) {
                        vm.forms = response.data;
                        vm.message = 'Success: Forms updated';

                        form.title = '';
                    } else {
                        vm.error = 'Failure: form not updated';
                    }
                });

            vm.selectedFormId = null;   // TODO: required ?
        }

        function deleteForm(form) {
            console.log('Attempting to delete form: ' + JSON.stringify(form));
            var formId = form._id;

            console.log('FormID: ' + formId);

            FormService
                .deleteFormById(formId)
                .then(function (response) {
                    if (response.data) {
                        vm.forms = response.data;
                        vm.message = 'Success: form deleted';
                    } else {
                        vm.error = 'Failure: form not deleted';
                    }
                });
        }

        function selectForm(form) {
            vm.selectedFormId = form._id;
            vm.form = form;

            FormService.setCurrentForm(form);
            console.log('Current Form: ' + FormService.getCurrentForm()._id + ': ' + FormService.getCurrentForm().title);
        }
    }

})();