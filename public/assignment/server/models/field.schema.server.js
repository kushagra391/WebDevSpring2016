module.exports = function (mongoose) {

    var FieldSchema = mongoose.Schema({

        label: {
            type: String,
            default: "New Field Label"
        },
        type: {
            type: String,
            default: "TEXT",
            enum: ["TEXT", "EMAIL", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES", "TEXTAREA"]
        },
        placeholder: {
            type: String,
            default: "New Field Placeholder"
        },
        options: [{
            label: String,
            value: String
        }]
    });

    return FieldSchema;

};