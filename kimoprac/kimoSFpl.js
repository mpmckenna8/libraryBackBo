var request = require("request");
var querystring = require("querystring")

var key = require("../api/keys").kimono;

// I think I just want to implement the on demand api and
// It works good with this just appending the kimpath3


request( "http://www.kimonolabs.com/api/ondemand/6uqet87k?apikey=" + key + "&kimpath3=1414409093_palm_trees",

function(err, response, body) {
//  console.log(response);

  console.log('body')

  console.log(body)

});



var querson = { apikey: key, urls: 'https://sfpl.bibliocommons.com/item/show/1690981093_the_plantfinders_guide_to_cacti_amp_other_succulents' }

var urler = "https://www.kimonolabs.com/api/6uqet87k/";

var querier = querystring.stringify({ apikey: 'JyxZ3UzzakC3NUIuP88Gfo1TJVDtvfMl', urls: ['https://sfpl.bibliocommons.com/item/show/1690981093_the_plantfinders_guide_to_cacti_amp_other_succulents', 'https://sfpl.bibliocommons.com/item/show/2764509093_flowers'] });

console.log('qs is ', querier);
var goer = urler// + querier;

console.log('')
console.log('now ', goer)

'https://sfpl.bibliocommons.com/item/show/1414409093_palm_trees';

var urlob = {
  url:"https://www.kimonolabs.com/api/6uqet87k/update?apikey=JyxZ3UzzakC3NUIuP88Gfo1TJVDtvfMl&targeturl=https://sfpl.bibliocommons.com/item/show/2764509093_flowers",
  params: {
    apikey:key,
    targeturl: 'https://sfpl.bibliocommons.com/item/show/2764509093_flowers'}
}

/*
was trying to set a thing to make a manual crawl list but the above on demand thing work ok
request.post(urlob.url, function(err, res, body){
  if(err){

    console.error('ducked up posting shiszam')

    throw err;

  }
  console.log(body, 'shouldnt exist');

  console.log(Object.keys(res));



})


POST -H 'Content-Type: application/json' kimonoapis/6uqet87k/update -d { apikey: "JyxZ3UzzakC3NUIuP88Gfo1TJVDtvfMl", targeturl: "https://sfpl.bibliocommons.com/item/show/2764509093_flowers" }

EXAMPLE {DATA}

{ apikey: "JyxZ3UzzakC3NUIuP88Gfo1TJVDtvfMl", targeturl: "https://sfpl.bibliocommons.com/item/show/2764509093_flowers" }


GET kimonoapis/6uqet87k?apikey=JyxZ3UzzakC3NUIuP88Gfo1TJVDtvfMl

*/
