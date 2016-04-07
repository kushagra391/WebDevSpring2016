/*
 TODO:
 1. findFieldInForm
 2. deleteFieldFromForm
 3. More revisit and test carefully
 */

module.exports = function (app, formModel, fieldModel) {

    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);                          // OK
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldInForm);                    // OK
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldFromForm);             // OK
    app.post('/api/assignment/form/:formId/field', createFieldInForm);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldInForm);
    app.put('/api/assignment/form/:formId/field', updateFieldsForForm);

    function findFieldsByFormId(req, res) {

        var formId = req.params.formId;

        formModel.findFormById(formId)
            .then(
                function (form) {
                    console.log(form.fields);
                    res.json(form.fields);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        // var formId = req.params.formId;
        // var fields = formModel.findFormById(formId).fields;
        //
        // res.json(fields);
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

        // var form = formModel.findFormById(formId);      //TODO: revisit !
        // var fields = form.fields;
        //
        // for (var index in fields) {
        //     if (fields[index]._id === fieldId) {
        //         res.json(fields[index]);
        //     }
        // }
    }

    // TODO: revisit
    function deleteFieldFromForm(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.deleteFieldInForm(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        // var formId = req.params.formId;
        // var fieldId = req.params.fieldId;
        // var form = formModel.findFormById(formId);
        // var fields = form.fields;
        //
        // for (var index in fields) {
        //     if (fields[index]._id === fieldId) {
        //         fields.splice(index, 1);
        //     }
        // }
        // res.json(form);
    }

    function createFieldInForm(req, res) {

        var formId = req.params.formId;
        // var fieldType = req.query.fieldType;
        var fieldType = req.body.type;

        var newField = req.body;

        console.log(">> createFieldInForm(): " + formId + ", " + fieldType);
        console.log("FIELD_MODEL" + fieldModel);
        // fieldModel.createFieldInForm(formId, fieldType)
        fieldModel.createFieldInForm(formId, newField)
            .then(
                function (form) {
                    //console.log(form);
                    res.json(form);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


        // var formId = req.params.formId;
        // var field = req.body;
        // var form = formModel.createFieldInForm(formId, field);
        //
        // res.json(form);
    }

    // TODO: Refactor
    function updateFieldInForm(req, res) {

        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;

        fieldModel.updateFieldInForm(formId, fieldId, newField)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        // var formId = req.params.formId;
        // var fieldId = req.params.fieldId;
        // var newField = req.body;
        //
        // var form = formModel.findFormById(formId);
        // var fields = form.fields;
        //
        // console.log("FieldOption Boolean: " + !fields.options);
        //
        // for (var index in fields) {
        //     if (fields[index]._id == fieldId) {
        //         if (!fields[index].options) {
        //             console.log("Options not found");
        //             fields[index].label = newField.label;
        //             fields[index].placeholder = newField.placeholder;
        //         }
        //         else {
        //             console.log("Options found");
        //             fields[index].label = newField.label;
        //             fields[index].options = newField.options;
        //         }
        //     }
        // }
        //
        // res.json(form);
    }


    // used by sortable directive
    function updateFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = req.body;

        console.log('updateFieldsForForm' + JSON.stringify(formId));
        console.log(fields);

        var form = formModel.findFormById(formId);
        console.log('Form: ' + JSON.stringify(form));

        form.fields = fields;

        res.json(form);
    }

};