module.exports = function (app, formModel) {

    "use strict";

    app.get("/api/assignment/user/:userId/form", findFormByUser);                   // OK
    app.get("/api/assignment/form/:formId", findFormById);                          // OK
    app.delete("/api/assignment/form/:formId", deleteForm);                         // OK
    app.post("/api/assignment/user/:userId/form", createFormForUser);               // OK
    app.put("/api/assignment/form/:formId", updateForm);                            // OK
    app.get("/api/assignment/form", findAllForms);                                  // OK

    function findAllForms(req, res) {

        formModel
            .findAllForms()
            .then(
                function (forms) {
                    res.json(forms);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormByUser(req, res) {

        var userId = req.params.userId;
        formModel
            .findFormByUser(userId)
            .then(
                function (forms) {
                    res.json(forms);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel
            .findFormById(formId)
            .then(
                function (form) {
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteForm(req, res) {

        var formId = req.params.formId;
        formModel
            .deleteForm(formId)
            .then(
                function (forms) {
                    res.json(forms);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // TODO: revisit this bit
    function createFormForUser(req, res) {

        var userId = req.params.userId;
        var form = req.body;

        console.log("createFormForUser(): " + userId + ", " + form);

        formModel
            .createFormForUser(userId, form)
            .then(
                function (form) {
                    // req.session.currentForm = form;
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateForm(req, res) {

        var formId = req.params.formId;
        var newForm = req.body;
        formModel
            .updateForm(formId, newForm)
            .then(
                function (form) {
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};