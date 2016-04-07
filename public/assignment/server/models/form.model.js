var q = require('q');

module.exports = function (dp, mongoose) {

    "use strict";

    var FormSchema = require('./form.schema.server')(mongoose);
    var FormModel = mongoose.model('FormModel', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        createFieldInForm: createFieldInForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormByUser: findFormByUser,

        // Field
        // createFieldInForm: createFieldInForm,
        deleteFieldInForm: deleteFieldInForm,
        updateFieldInForm: updateFieldInForm,
        findFieldsByFormId: findFieldsByFormId

    };
    return api;

    // TODO: check behaviour, revisit
    function createFormForUser(userId, form) {
        // set userId for form
        form.userId = userId;

        var deferred = q.defer();

        FormModel.create(form,
            function (err, form) {
                if (!err) {
                    deferred.resolve(form);
                } else {
                    deferred.reject(err);
                }

            });

        return deferred.promise;
    }


    // TODO: revisit if required
    function createFieldInForm(formId, field) {
        // var form = findFormById(formId);
        // field._id = uuid.v4();
        // form.fields.push(field);
        // return form;
    }


    function findAllForms() {
        var deferred = q.defer();

        FormModel.find(function (err, forms) {
            if (!err) {
                deferred.resolve(forms);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function findFormById(formId) {

        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, form) {
                if (!err) {
                    deferred.resolve(form);
                } else {
                    deferred.reject(err);
                }
            });

        return deferred.promise;
    }

    function updateForm(formId, newForm) {

        var deferred = q.defer();

        FormModel.update({_id: formId}, {$set: newForm},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });

        return deferred.promise;
    }

    function deleteForm(formId) {

        var deferred = q.defer();

        FormModel.remove({_id: formId},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });

        return deferred.promise;
    }

    function findFormByTitle(title) {

        var deferred = q.defer();

        FormModel.find({title: title},
            function (err, forms) {
                if (!err) {
                    deferred.resolve(forms);
                } else {
                    deferred.reject(err);
                }
            });

        return deferred.promise;
    }

    function findFormByUser(userId) {

        var deferred = q.defer();

        FormModel.find({userId: userId},
            function (err, forms) {
                if (!err) {
                    deferred.resolve(forms);
                } else {
                    deferred.reject(err);
                }
            });

        return deferred.promise;
    }

    // Field Model functions

    /*** Deprecated ***/
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

        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            }
            else {
                console.log("## Form Obtained: " + form);
                console.log("## Fields Obtained: " + form.fields);

                for (var i = 0; i < form.fields.length; i++) {
                    if (form.fields[i]._id == fieldId) {
                        newField["_id"] = fieldId;
                        form.fields[i] = newField;

                        form.save(function (err, form) {
                            deferred.resolve(form.fields);
                        });
                    }
                }
            }
        });

        return deferred.promise;
    }

    function findFieldsByFormId(formId) {
        var deferred = q.defer();

        FormModel.findOne({"_id": formId}, function (err, form) {
            if (err) {
                console.log("form.model.js: findFieldsByFormId: error");
                deferred.reject(err);
            }
            else {
                console.log("form.model.js: findFieldsByFormId: success, form: " + form);
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise;
    }


};