(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FormService, FieldService) {
        
        var vm = this;
        
        var currentForm = FormService.getCurrentForm();
        console.log('Current Form: ' + JSON.stringify(currentForm));

        function init() {
            vm.addField = addField;
            vm.removeField = removeField;
            vm.updateField = updateField;
            vm.swapFields = swapFields;
            vm.initNewField = initNewField;
            vm.setNewField = setNewField;

            vm.message = null;
            vm.error = null;

            // show the current fields
            FieldService
                .getFieldsForForm(currentForm._id)
                .then(function (response) {
                    if (response.data) {
                        vm.fields = response.data;
                        console.log('optionString: ' + getOptionStrings());
                    }
                });
        }

        init();

        // Scope methods
        function setNewField(field) {

            var newFieldId = vm.newFieldID;
            var newfieldType = vm.newFieldType;

            var newField = {};
            newField._id = newFieldId;
            newField.type = newfieldType;

            switch(newfieldType) {
                case "TEXT":
                case "TEXTAREA":
                    newField.label = field.label;
                    newField.placeholder= field.placeholder;
                    break;

                case "DATE":
                    newField.label = field.label;
                    break;

                case "OPTIONS":
                case "CHECKBOXES":
                case "RADIOS":
                    newField.label = field.label;
                    newField.options = createOptions(field.options);
                    break;

                default:
                    console.log('ERROR: bad field type encountered');
                    break;
            }

            console.log('setting new field values' + JSON.stringify(newField));
            FieldService
                .updateFieldInForm(currentForm._id, newFieldId, newField)
                .then(fieldSuccess, fieldError);

            function fieldSuccess(response) {
                // vm.fields = response.data.fields;
                vm.fields = response.data;
                vm.message = 'Success: fields updated';
                console.log(currentForm._id + ' ' + newFieldId);
                console.log("Updated FieldS: " + JSON.stringify(vm.fields));
                console.log(response.data);

                currentForm.fields = vm.fields;
            }

            function fieldError(response) {
                vm.message = 'Failure: during updateField';
            }
        }

        function initNewField(index, fieldType) {

            // Lookup purposes
            vm.newFieldID = vm.fields[index]._id;
            vm.newFieldType = fieldType;

            console.log("NewfieldID: " + vm.newFieldID);
            console.log("fieldType: " + vm.newFieldType);
        }

        function addField(fieldType) {
            if (!currentForm) {
                vm.error = "Add or select a form first.";
                return;
            }

            console.log("current form: " + currentForm._id + "-" + currentForm.title + ", fieldType" + fieldType);

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

                console.log('fieldSuccess' + JSON.stringify(response.data));

                vm.fields = response.data.fields;
                FormService.setCurrentForm(response.data);
                vm.message = "Success: addField" + fieldType;
            }

            function fieldError(response) {
                console.log('fieldError' + response.data);

                vm.message = "Failure: addField" + fieldType;
            }
        }

        function removeField(field) {
            FieldService
                .deleteFieldFromForm(currentForm._id, field._id)
                .then(fieldSuccess, fieldError);

            function fieldSuccess(response) {
                vm.fields = response.data.fields;
                vm.message = 'Remove field successfully';
            }

            function fieldError(response) {
                vm.message = 'Failure: during removeField';
            }

            refreshFields();
        }

        function updateField(field) {
            console.log('in updateField');
            if (field.options) {
                console.log(vm.userOptions.text);
            }

            FieldService
                .updateFieldInForm(currentForm._id, field._id, field)
                .then(fieldSuccess, fieldError);

            function fieldSuccess(response) {
                vm.fields = response.data.fields;
                vm.message = 'Success: fields updated';
                console.log(currentForm._id + ' ' + field._id);
            }

            function fieldError(response) {
                vm.message = 'Failure: during updateField';
            }
        }

        // Helper methods
        // helper method to parse options into label:value pairs
        function createOptions(options) {
            var fields = [];

            var lines = options.split("\n");
            for (var index in lines) {

                var pairs = lines[index].split(":");

                var label = pairs[0];
                var value = pairs[1];
                var option = {label: pairs[0], value: pairs[1]};

                fields.push(option);
            }

            console.log("parsed fields: " + JSON.stringify(fields));
            return fields;
        }

        function refreshFields() {
            // show the current fields
            FieldService
                .getFieldsForForm(currentForm._id)
                .then(function (response) {
                    if (response.data) {
                        vm.fields = response.data;
                    }
                });
        }

        function getOptionStrings() {
            var str = '';
            var fields = vm.fields;

            for (var index in fields) {
                var options = fields[index].options;
                for (var optionIndex in options) {
                    str = str + options[optionIndex].label + ':' + options[optionIndex].value + '\n';
                }
            }

            return str;
        }

        function swapFields (start, end) {
            var temp = vm.fields[start];
            vm.fields[start] = vm.fields[end];
            vm.fields[end] = temp;

            console.log('FieldsController: fields swapped');

            console.log('Server side work: sending updated fields');
            FieldService.updateFieldsForForm(currentForm._id, vm.fields);
        }

        // Global constants
        vm.options = [
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
    }
})();
