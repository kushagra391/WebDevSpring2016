var mockForms = require('./form.mock.json');
var uuid = require('node-uuid');

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

    }

    function createFieldInForm(formId, field) {

    }

    function findAllForms() {

    }

    function findFormById(formId) {

    }

    function updateForm(formId, newForm) {

    }

    function deleteForm(formId) {

    }

    function findFormByTitle(title) {

    }

    function findFormByUser(userId) {

    }
}