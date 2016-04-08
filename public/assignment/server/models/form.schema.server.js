module.exports = function (mongoose) {

    // Embedded Schema
    var FieldSchema = require('./field.schema.server.js')(mongoose);

    var FormSchema = mongoose.Schema({
            title: String,
            fields: [FieldSchema],
            userId: String,
            created: Date,
            updated: Date
        }, {collection: 'form'}
    );

    return FormSchema;

};