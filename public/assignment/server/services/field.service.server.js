module.exports = function (app, formModel, db) {

    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findFieldInForm);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldFromForm);
    app.post('/api/assignment/form/:formId/field', createFieldInForm);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateFieldInForm);
    app.put('/api/assignment/form/:formId/field', updateFieldsForForm);

    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findFormById(formId).fields;

        res.json(fields);
    }

    function findFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        var fields = form.fields;

        for (var index in fields) {
            if (fields[index]._id === fieldId) {
                res.json(fields[index]);
            }
        }
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = formModel.findFormById(formId);
        var fields = form.fields;

        for (var index in fields) {
            if (fields[index]._id === fieldId) {
                fields.splice(index, 1);
            }
        }
        res.json(form);
    }

    function createFieldInForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var form = formModel.createFieldInForm(formId, field);

        res.json(form);
    }
    
    // TODO: Refactor...
    function updateFieldInForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;

        var form = formModel.findFormById(formId);
        var fields = form.fields;

        if (!fields.options) {
            for (var index in fields) {
                if (fields[index]._id === fieldId) {
                    fields[index].label = newField.label;
                    fields[index].placeholder = newField.placeholder;
                }
            }

            res.json(form);
        }
        else {
            for (var index in fields) {
                fields[index].options = newField.options;
            }

            res.json(form);
        }
    }

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