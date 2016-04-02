(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($scope, $location, FormService, UserService) {

        function init() {

            $scope.$location = $location;

            $scope.selectedFormId = null;
            $scope.error = null;
            $scope.forms = FormService.findAllForms();

            $scope.addForm = addForm;
            $scope.updateForm = updateForm;
            $scope.deleteForm = deleteForm;
            $scope.selectForm = selectForm;

            $scope.redirectToField = redirectToField;

            $scope.currentUser = UserService.getCurrentUser();
            FormService
                .findAllForms()
                .then(function (res) {
                    $scope.forms = res.data; // TODO: .data
                });
        }

        init();

        function redirectToField(form) {
            $scope.selectedFormId = form._id;
            $scope.form = form;

            FormService.setCurrentForm(form);

            console.log('redirecting to profile');
            $location.url('/admin');
            $scope.$location = $location;
        }


        function addForm(form) {
            if (!form.title) {
                $scope.error = "Please provide a form name.";
                return;
            }
            if ($scope.currentUser == null) {
                $scope.error = "Please login.";
                return;
            }

            FormService
                .createFormForUser($scope.currentUser._id, form)
                .then(addFormSuccess, addFormFailure);

            function addFormSuccess(response) {
                console.log('addForm: Inside promise success');

                $scope.forms = response.data;
                var formsCount = $scope.forms.length;
                FormService.setCurrentForm($scope.forms[formsCount - 1]);
                form.title = ''; // TODO: clear header fields
            }

            function addFormFailure() {
                $scope.error = 'Failed: Form not created';
            }
        }

        function updateForm(form) {
            if ($scope.selectedFormId == null) {
                $scope.error = "Please select a form.";
                return;
            }

            if (form.userId == null) {
                form.userId = $scope.currentUser._id;
            }

            FormService
                .updateFormById($scope.selectedFormId, form)
                .then(updateSuccess, updateError);

            $scope.selectedFormId = null;   // TODO: required ?

            function updateSuccess(response) {
                $scope.forms = response.data;
                $scope.message = 'Success: Forms updated';

                form.title = '';
            }

            function updateError(response) {
                $scope.error = 'Failure: form not updated';
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
                $scope.forms = response.data;
                $scope.message = 'Success: form deleted';
            }

            function deleteError(response){
                $scope.error = 'Failure: form not deleted';
            }
        }

        function selectForm(form) {
            $scope.selectedFormId = form._id;
            $scope.form = form;

            FormService.setCurrentForm(form);
            console.log('Current Form: ' + FormService.getCurrentForm()._id + ': ' + FormService.getCurrentForm().title);
        }
    }

})();