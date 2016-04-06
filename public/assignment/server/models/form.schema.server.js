module.exports = function (mongoose) {

    // Embedded Schema
    var FieldSchema = require('./field.schema.server.js');

    var FormSchema = mongoose.Schema({
            title: String,
            fields: [],
            userId: String,
            created: Date,
            updated: Date
        }, {collection: 'form'}
    );

    return FormSchema;

};