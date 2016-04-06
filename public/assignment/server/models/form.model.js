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
        getFormModel: getFormModel
    };
    return api;

    function getFormModel() {
        return FormModel;
    }


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
        // form._id = uuid.v4();
        // form.userId = userId;
        // form.fields = [];
        // mockForms.push(form);
        //
        // return mockForms;
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
        // return mockForms;
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
        // for (var index in mockForms) {
        //     if (mockForms[index]._id === formId) {
        //         return mockForms[index];
        //     }
        // }
        //
        // return null; // if not found
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
        // for (var index in mockForms) {
        //     if (formId === mockForms[index]._id) {
        //         mockForms[index].title = newForm.title;
        //         mockForms[index].userId = newForm.userId;
        //         mockForms[index].fields = newForm.fields;
        //     }
        // }
        //
        // return mockForms;
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
        // for (var index in mockForms) {
        //     if (mockForms[index]._id === formId) {
        //         mockForms.splice(index, 1);
        //     }
        // }
        //
        // return mockForms;
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
        // for (var index in mockForms) {
        //     if (mockForms[index].title === title) {
        //         return mockForms[index];
        //     }
        // }
        //
        // return null;
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

        // for (var index in mockForms) {
        //     if (mockForms[index].userId === userId) {
        //         return mockForms[index];
        //     }
        // }
        //
        // return null;
    }
};