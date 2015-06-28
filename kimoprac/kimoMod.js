
var request = require("request");
//var querystring = require("querystring");
var key = require("../api/keys");

console.log('key is', key)

var url = "http://www.kimonolabs.com/api/ondemand/6uqet87k?apikey=" + key.kimono + "&kimpath3=";

//var book = process.argv[2] || "1414409093_palm_trees";

module.exports = function(book){

var useurl = url + book;
request( useurl,

function(err, response, body) {
//  console.log(response);
if (err){
  console.log(err)
}

  console.log('body')

  console.log(body)


});

}
