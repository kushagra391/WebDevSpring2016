var uuid = require('node-uuid');
var mockForms = require('./form.mock.json');

module.exports = function (app) {

    "use strict";

    var api = {
        createFormForUser: createFormForUser,
        createFieldInForm: createFieldInForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormByUser: findFormByUser

    };
    return api;

    function createFormForUser(userId, form) {
        form._id = uuid.v4();
        form.userId = userId;
        mockForms.push(form);

        return mockForms;
    }

    function createFieldInForm(formId, field) {
        var form = findFormById(formId);
        field._id = uuid.v4();
        form.fields.push(field);
        return form;
    }

    function findAllForms() {
        return mockForms;
    }

    function findFormById(formId) {
        for (var index in mockForms) {
            if (mockForms[index]._id === formId) {
                return mockForms[index];
            }
        }

        return null; // if not found
    }

    function updateForm(formId, newForm) {
        for (var index in mockForms) {
            if (formId === mockForms[index]._id) {
                mockForms[index].title = newForm.title;
                mockForms[index].userId = newForm.userId;
                mockForms[index].fields = newForm.fields;
            }
        }

        return mockForms;
    }

    function deleteForm(formId) {

        for (var index in mockForms) {
            if (mockForms[index]._id === formId) {
                mockForms.splice(index, 1);
            }
        }

        return mockForms;
    }

    function findFormByTitle(title) {
        for (var index in mockForms) {
            if (mockForms[index].title === title) {
                return mockForms[index];
            }
        }

        return null;
    }

    function findFormByUser(userId) {
        for (var index in mockForms) {
            if (mockForms[index].userId === userId) {
                return mockForms[index];
            }
        }

        return null;
    }
}