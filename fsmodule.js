const fs = require('fs');

// json data
var jsonData = {"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]};

// parse json
var jsonObj = JSON.stringify(jsonData);
console.log(jsonObj);

// // stringify JSON Object
var jsonContent = JSON.parse(jsonObj);
console.log(jsonContent);


var jsonObj2 = JSON.stringify(jsonContent);

fs.writeFile("output.json", jsonObj2, 'utf8', function (err) {
    if (err) {
		console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});
