/**
  {
    "api":1,
    "name":"JWT Decode",
    "description":"Converts JWTs to JSON",
    "author":"Nils Sonemann",
    "icon":"identification",
    "tags":"decode,jwt,token"
  }
**/


const { decode } = require('js-base64').Base64

const main = function(input){
    var t = input.text;
    var jwtParts = t.split(".");
    if (jwtParts.length != 3) {
        input.postError("Invalid Token");
        return;
    }

    var header = decode(jwtParts[0]);
    var payload = decode(jwtParts[1]);
    var signature = jwtParts[2];

    try {
        var fullJson = {
            "header": JSON.parse(header),
            "payload": JSON.parse(payload),
            "signature": signature
        };

        // Prettyprint the JSOM
        return input.text = JSON.stringify(fullJson, null, 2);
    } catch(err) {
        input.postError("Error while parsing JSON");
    }
}

module.exports ={
	main
}