(function () {
    angular
        .module('FormBuilderApp')
        .factory('FormService', FormService);

    function FormService() {
        var model = {
            forms: [
                {
                    "_id": "000",
                    "title": "Contacts",
                    "userId": 123
                },
                {
                    "_id": "010",
                    "title": "TODO",
                    "userId": 195
                },
                {
                    "_id": "020",
                    "title": "MP3s",
                    "userId": 234
                }
            ],
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findAllForms : findAllForms
        };

        return model;

        function findAllForms() {
            console.log("finding all forms.. ");
            return model.forms;
        }

        function createFormForUser(userId, form) {
            var form = {
                _id: (new Date).getTime(),
                title: form.title,
                userId: userId
            };
            model.forms.push(form);
            return form;
        }

        function findAllFormsForUser(userId) {
            for (var i in model.forms) {
                if (model.forms[i].userId === userId) {
                    return model.forms[i];
                }
            }
            return null;
        }

        function deleteFormById(formId) {
            for (var i in model.forms) {
                if (model.forms[i]._id === formId) {
                    model.forms.splice(i, 1);
                }
            }
            return model.forms;
        }

        function updateFormById(formId, newForm) {
            for (var i in model.forms) {
                if (model.forms[i]._id === formId) {
                    model.forms[i].title = newForm.title;
                    model.forms[i].userId = newForm.userId;
                    return model.forms[i];
                }
            }
            return null;
        }
    }
})();