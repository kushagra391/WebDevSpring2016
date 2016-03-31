(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope, FormService, FieldService) {

        var currentForm = FormService.getCurrentForm();
        console.log('Current Form: ' + JSON.stringify(currentForm));

        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.updateField = updateField;

        $scope.message = null;
        $scope.error = null;

        $scope.dynamicPopover = {
            templateUrl: 'fieldPopover'
        };

        // show the current fields
        FieldService
            .getFieldsForForm(currentForm._id)
            .then(function (response) {
                if (response.data) {
                    $scope.fields = response.data;
                    console.log('optionString: ' + getOptionStrings());
                }
            });


        function getOptionStrings() {
            var str = '';
            var fields = $scope.fields;
            for (var index in fields) {
                var options = fields[index].options;
                for (var optionIndex in options) {
                    str = str + options[optionIndex].label + ':' + options[optionIndex].value + '\n';
                }
            }

            return str;
        }


        $scope.options = [
            "Single Line Text Field",
            "Multi Line Text Field",
            "Date Field",
            "Dropdown Field",
            "Checkboxes Field",
            "Radio Buttons Field"
        ];

        var singleLineTextField = {
            "_id": null,
            "label": "New Text Field",
            "type": "TEXT",
            "placeholder": "New Field"
        };

        var multiLineTextField = {
            "_id": null,
            "label": "New Text Field",
            "type": "TEXTAREA",
            "placeholder": "New Field"
        };

        var dateField = {"_id": null, "label": "New Date Field", "type": "DATE"};

        var dropdownField = {
            "_id": null, "label": "New Dropdown", "type": "OPTIONS",
            "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]
        };

        var checkboxesField = {
            "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
            "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]
        };

        var radioButtonsField = {
            "_id": null, "label": "New Radio Buttons", "type": "RADIOS",
            "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]
        };

        function addField(fieldType) {
            if (!currentForm) {
                $scope.error = "Add or select a form first.";
                return;
            }

            console.log("current form: " + currentForm._id + "-" + currentForm.title);

            switch (fieldType) {
                case "Single Line Text Field":
                    FieldService
                        .createFieldForForm(currentForm._id, singleLineTextField)
                        .then(fieldSuccess, fieldError);
                    break;

                case "Multi Line Text Field":
                    FieldService
                        .createFieldForForm(currentForm._id, multiLineTextField)
                        .then(fieldSuccess, fieldError);

                    break;
                case "Date Field":
                    FieldService
                        .createFieldForForm(currentForm._id, dateField)
                        .then(fieldSuccess, fieldError);

                    break;
                case "Dropdown Field":
                    FieldService
                        .createFieldForForm(currentForm._id, dropdownField)
                        .then(fieldSuccess, fieldError);

                    break;
                case "Checkboxes Field":
                    FieldService
                        .createFieldForForm(currentForm._id, checkboxesField)
                        .then(fieldSuccess, fieldError);
                    break;
                case "Radio Buttons Field":
                    FieldService
                        .createFieldForForm(currentForm._id, radioButtonsField)
                        .then(fieldSuccess, fieldError);

                    break;
            }

            function fieldSuccess(response) {
                $scope.fields = response.data.fields;
                FormService.setCurrentForm(response.data);
                $scope.message = "Success: addField" + fieldType;
            }

            function fieldError(response) {
                $scope.message = "Failure: addField" + fieldType;
            }
        }

        function removeField(field) {
            FieldService
                .deleteFieldFromForm(currentForm._id, field._id)
                .then(fieldSuccess, fieldError);

            function fieldSuccess(response) {
                $scope.fields = response.data.fields;
                $scope.message = 'Remove field successfully';
            }

            function fieldError(response) {
                $scope.message = 'Failure: during removeField';
            }
        }

        function updateField(field) {
            if (field.options) {
                console.log($scope.userOptions.text);
            }

            FieldService
                .updateFieldInForm(currentForm._id, field._id, field)
                .then(fieldSuccess, fieldError);

            function fieldSuccess(response) {
                $scope.fields = response.data.fields;
                $scope.message = 'Success: fields updated';

                console.log(currentForm._id + ' ' + field._id);
            }

            function fieldError(response) {
                $scope.message = 'Failure: during updateField';
            }
        }


    }
})();
