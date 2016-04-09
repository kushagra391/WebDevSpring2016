var q = require("q");

module.exports = function (db, mongoose, formModel) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('FieldModel', FieldSchema);

    var FormModel = formModel.getFormModel();

    var api = {
        createField: createField,
        createFieldInForm: createFieldInForm,
        findAllFileds: findAllFileds,
        findFieldById: findFieldById,
        updateField: updateField,
        deleteFieldInForm: deleteFieldInForm,
        updateFieldInForm: updateFieldInForm
    };
    return api;

    function createField(field) {
        var deferred = q.defer();
        FieldModel.create(field,
            function (err, user) {
                if (!err) {
                    deferred.resolve(user);
                } else {
                    deferred.reject(err);
                }

            });
        return deferred.promise;
    }

    function createFieldInForm(formId, newField) {
        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, form) {
                if (!err) {

                    var fieldId = mongoose.Types.ObjectId();
                    newField["_id"] = fieldId;

                    form.fields.push(newField);
                    form.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    deferred.reject(err);
                }
            }
        );

        return deferred.promise;

    }

    function findAllFileds() {
        var deferred = q.defer();
        FieldModel.find(function (err, fields) {
            if (!err) {
                deferred.resolve(fields);
            } else {
                deferred.reject(err);
            }
        });
        return deferred.promise;
    }

    function findFieldById(fieldId) {
        var deferred = q.defer();
        FieldModel.findById(fieldId,
            function (err, field) {
                if (!err) {
                    deferred.resolve(field);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function updateField(fieldId, newField) {
        var deferred = q.defer();
        FieldModel.update({_id: fieldId}, {$set: newField},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function deleteFieldInForm(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, form) {
                if (!err) {

                    for (var i = 0; i < form.fields.length; i++) {
                        if (form.fields[i]._id == fieldId) {
                            form.fields.splice(i, 1);

                            form.save(function (err, form) {
                                deferred.resolve(form.fields);
                            });
                        }
                    }
                } else {
                    deferred.reject(err);
                }
            }
        );

        return deferred.promise;
    }

    // TODO: not saving to form
    function updateFieldInForm(formId, fieldId, newField) {

        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, form) {
                if (!err) {

                    for (var i = 0; i < form.fields.length; i++) {
                        if (form.fields[i]._id == fieldId) {

                            newField["_id"] = fieldId;
                            form.fields[i] = newField;

                            form.save(function (err, doc) {
                                if (doc) {
                                    console.log("Save Succesful: " + JSON.stringify(doc));
                                    deferred.resolve(doc.fields);
                                } else {
                                    console.log("ERROR: " + err);
                                    deferred.reject(err);
                                }
                            });
                        }
                    }
                } else {
                    deferred.reject(err);
                }
            }
        );

        return deferred.promise;
    }

};