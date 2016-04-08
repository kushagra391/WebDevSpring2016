(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($location, FormService, UserService) {

        var vm = this;

        function init() {

            vm.$location = $location;

            vm.selectedFormId = null;
            vm.error = null;
            vm.forms = FormService.findAllForms();

            vm.addForm = addForm;
            vm.updateForm = updateForm;
            vm.deleteForm = deleteForm;
            vm.selectForm = selectForm;

            vm.redirectToField = redirectToField;

            vm.currentUser = UserService.getCurrentUser();
            FormService
                .findAllForms()
                .then(function (res) {
                    vm.forms = res.data; // TODO: .data
                });
        }

        init();

        function redirectToField(form) {
            vm.selectedFormId = form._id;
            vm.form = form;

            FormService.setCurrentForm(form);

            var formId = form._id;
            var fieldUrl = '/form/' + formId + '/fields';

            console.log('redirecting to fields: ' + fieldUrl);
            // $location.url('/admin');
            $location.url(fieldUrl);
            vm.$location = $location;
        }


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
                .then(addFormSuccess, addFormFailure);

            FormService
                .findAllForms()
                .then(function (res) {
                    vm.forms = res.data; // TODO: .data
                });

            function addFormSuccess(response) {
                console.log('addForm: Inside promise success');

                vm.forms = response.data;

                console.log('All forms: ' + JSON.stringify(vm.forms));

                var formsCount = vm.forms.length;
                FormService.setCurrentForm(vm.forms[formsCount - 1]);
                form.title = ''; // TODO: clear header fields
            }

            function addFormFailure() {
                vm.error = 'Failed: Form not created';
            }
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
                .then(updateSuccess, updateError);

            vm.selectedFormId = null;   // TODO: required ?

            function updateSuccess(response) {
                vm.forms = response.data;
                vm.message = 'Success: Forms updated';

                form.title = '';
            }

            function updateError(response) {
                vm.error = 'Failure: form not updated';
            }
        }

        function deleteForm(form) {
            console.log('Attempting to delete form: ' + JSON.stringify(form));
            var formId = form._id;

            console.log('FormID: ' + formId);

            FormService
                .deleteFormById(formId)
                .then(deleteSuccess, deleteError);

            function deleteSuccess(response) {
                vm.forms = response.data;
                vm.message = 'Success: form deleted';
            }

            function deleteError(response){
                vm.error = 'Failure: form not deleted';
            }
        }

        function selectForm(form) {
            vm.selectedFormId = form._id;
            vm.form = form;

            FormService.setCurrentForm(form);
            console.log('Current Form: ' + FormService.getCurrentForm()._id + ': ' + FormService.getCurrentForm().title);
        }
    }

})();