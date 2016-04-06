console.log('Hello');

var optionsText = "l-1:v-1\n" +
    "label2:value2\n" +
    "labe3:value3";

var options = createOptions(optionsText);
console.log(JSON.stringify(options));

function createOptions(options) {
    var fields = [];

    var lines = options.split("\n");
    for (var index in lines) {
        var pairs = lines[index].split(":");

        var label = pairs[0];
        var value = pairs[1];
        var option = {label: value};

        fields.push(option);
    }

    return fields;
}





