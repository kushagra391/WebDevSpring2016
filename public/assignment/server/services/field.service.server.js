/*
 TODO:
 1. findFieldInForm
 2. deleteFieldFromForm
 3. More revisit and test carefully
 */

module.exports = function (app, formModel) {

    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);                          // OK
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldInForm);                    // OK
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldFromForm);             // OK
    app.post('/api/assignment/form/:formId/field', createFieldInForm);                          // OK
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldInForm);                  // Wrong Behaviour
    app.put('/api/assignment/form/:formId/field', updateFieldsForForm);

    function findFieldsByFormId(req, res) {

        console.log("Listening in findFieldsByFormId()");

        var formId = req.params.formId;

        formModel.findFieldsByFormId(formId)
            .then(
                function (fields) {
                    console.log("Result: " + JSON.stringify(fields));
                    res.json(fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        console.log("FormID: " + formId);
        console.log("FieldID: " + fieldId);

        formModel
            .findFormById(formId)
            .then(
                function (form) {
                    var fields = form.fields;
                    for (var index in fields) {
                        console.log("CurrentFieldID: " + fields[index]._id +
                            " : " + (fields[index]._id == fieldId));
                        if (fields[index]._id == fieldId) {
                            console.log("Matching fields found !");
                            res.json(fields[index]);
                        }
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // TODO: revisit
    function deleteFieldFromForm(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        formModel.deleteFieldInForm(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFieldInForm(req, res) {

        var formId = req.params.formId;
        var newField = req.body;

        formModel.createFieldInForm(formId, newField)
            .then(
                function (form) {
                    //console.log(form);
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // TODO: Refactor
    function updateFieldInForm(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;

        console.log("updateFieldInForm(): \n" + "formId: " + formId + " \n" +
            "fieldId: " + fieldId + "\n" +
            "newField:" + JSON.stringify(newField));

        formModel.updateFieldInForm(formId, fieldId, newField)
            .then(
                function (fields) {
                    res.json(fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    // used by sortable directive
    function _updateFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = req.body;

        console.log('updateFieldsForForm' + JSON.stringify(formId));
        console.log(fields);

        var form = formModel.findFormById(formId);
        console.log('Form: ' + JSON.stringify(form));

        form.fields = fields;

        res.json(form);
    }

    function updateFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = req.body;

        console.log('updateFieldsForForm' + JSON.stringify(formId));
        console.log(fields);

        formModel.updateAllFieldsForForm(formId, fields)
            .then(
                function (form) {
                    res.json(form)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

};