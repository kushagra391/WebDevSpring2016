module.exports = function (app, formModel, db) {

    "use strict";

    app.get("/api/assignment/user/:userId/form", findFormByUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);
    app.get("/api/assignment/form", findAllForms);

    function findFormByUser(req, res) {

    }

    function findFormById(req, res) {

    }

    function deleteForm(req, res) {

    }

    function createFormForUser(req, res) {

    }

    function updateForm(req, res) {

    }

    function findAllForms(req, res) {

    }


}