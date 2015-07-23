'use strict';

// Module dependencies.
var application_root = __dirname,
	express = require( 'express' ), //Web framework
	path = require( 'path' ), //Utilities for dealing with file paths
	mongoose = require( 'mongoose' ); //MongoDB integration

	var url = require('url'); // to parse the url for sfpl books


var kimolib = require('./kimoprac/kimoMod.js')
//Create server
var app = express();



//Connect to database
mongoose.connect(
	//"mongodb://heroku_1rgxp88l:hu9f39deakldabb0cn7s4e3r25@ds037387.mongolab.com:37387/heroku_1rgxp88l")
	'mongodb://localhost/library_database' ); mongodb://heroku_1rgxp88l:hu9f39deakldabb0cn7s4e3r25@ds037387.mongolab.com:37387/heroku_1rgxp88l

//Schemas
var Keywords = new mongoose.Schema({
	keyword: String
});

// everything is as it started except for I added a coverImage which is a string data.URL which kindof works for now.
var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: String,
  coverImage: String,
	mailer:String,

	keywords: [ Keywords ],
	checked:{
		available:Boolean,
		possessed:String,
		due:String
	}

});



//Models
var BookModel = mongoose.model( 'Book', Book );

// Configure server
app.configure( function() {
	//parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );

	//perform route lookup based on url and HTTP method
	app.use( app.router );

	//Where to serve static content
	app.use( express.static( path.join( application_root, 'site') ) );

	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});



// Routes
app.get( '/api', function( request, response ) {
	response.send( 'Library API is running' );
});

//Get a list of all books
app.get( '/api/books', function( request, response ) {
	return BookModel.find( function( err, books ) {
		if( !err ) {
			return response.send( books );
		} else {
			return console.log( err );
		}
	});
});

//Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
	return BookModel.findById( request.params.id, function( err, book ) {
		if( !err ) {
			return response.send( book );
		} else {
			return console.log( err );
		}
	});
});

//Insert a new book
app.post( '/api/books', function( request, response ) {

  console.log(Object.keys(request.body));
  console.log(((request.body.keywords) ));

	var book = new BookModel({
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate,
		keywords: request.body.keywords,
    coverImage: request.body.coverImage,
		mailer: request.body.mailer,
		checked: request.body.checked,

	});

	book.checked.date = new Date().getTime();

	console.log(typeof(book.checked.date))

	book.save( function( err ) {
		if( !err ) {
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
		return response.send( book );
	});

response.send('hogwash')

});

app.post( '/api/sfpl', function( request, response ) {

	console.log(Object.keys(request));

	console.log(request.body)

	var bookU = request.body.info;

	var urlp = url.parse(request.body.info)
	console.log(urlp)

	var pops = urlp.pathname.split('/');

	var tobo = pops[pops.length - 1];

	console.log('and to query', tobo)



	kimolib(tobo, bookU, addSFbook, response)

	response.send('Kimono was given an address to look for that jam and on refresh you should see a new book as long as it finds your link successfully!!')


});


//Update a book
app.put( '/api/books/:id', function( request, response ) {
	console.log( 'Updating book ' + request.body.checked );
	console.log(request.params.id)


	return BookModel.findById( request.params.id, function( err, book ) {
		book.title = request.body.title;
		book.author = request.body.author;
		book.releaseDate = request.body.releaseDate;
		console.log(request.body.keywords)
		book.keywords = request.body.keywords; //request.body.keywords
	//	request.body.keywords.each(function(i,cat){console.log(cat)		});
    book.coverImage = request.body.coverImage;
		book.mailer = request.body.mailer;
		book.checked = request.body.checked;



		return book.save( function( err ) {
			if( !err ) {
				console.log( 'book updated' );
			} else {
				console.error('there been a error saving')
				console.log( err );
			}
			return response.send( book );
		});
	});
});


//Delete a book
app.delete( '/api/books/:id', function( request, response ) {
	console.log( 'Deleting book with id: ' + request.params.id );
	return BookModel.findById( request.params.id, function( err, book ) {
		return book.remove( function( err ) {
			if( !err ) {
				console.log( 'Book removed' );
				return response.send( '' );
			} else {
				console.log( err );
			}
		});
	});
});


function addSFbook(sfbook, link, response){
	console.log('made it to sfbook', typeof sfbook);


		var bookob = JSON.parse(sfbook).results.collection1[0];
		console.log(bookob)

	var tobook = {};

	tobook.title = bookob.title;

	//
	if(link){
	tobook.checked = {
		available:true,
		possessed: link
	};
	}
	else{
		tobook.checked = {
		available:true,
		possessed:"http://sfpl.org/"
	}
	}

	tobook.releaseDate = '';
	tobook.author = '';

	if(bookob.pic.src){
		tobook.coverImage = bookob.pic.src;
	}
	else{
	tobook.coverImage = '';
	}


	var sfbook = new BookModel({

		title: 	bookob.title,
		author: tobook.author,
		releaseDate: tobook.releaseDate,
		keywords: [],
		coverImage: tobook.coverImage,
		mailer: '',
		checked: {
			available:false,
			possessed:link,
			due: ''
		}

	});



	sfbook.save(function(err){
		if(err){
			console.log('something went wrong with the sfpl save')
		}
		else{
			console.log('saved a new book')
		}

		console.log(sfbook)

	})

}


//Start server
var port = 4711;
app.listen( process.env.PORT || port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
