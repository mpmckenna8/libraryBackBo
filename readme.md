# Conservatory of Flowers Volunteer library base code


This is mostly based off some code from exercise 2 in a book on backbone.js stuff:
http://addyosmani.github.io/backbone-fundamentals/#todo-collection



Gotta fricking work on my markdown skills and describe this projecton.


The basic schema for adding stuff to mongo is

var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: String,
  coverImage: String,
	mailer:String,

	keywords: [ Keywords ]
});

With mailer being the email address of the person who added the book and the coverImage being either a data url or a string hotlinked to another picture on the web. Which I should recommend because I means less storage of pictures for the database.


I think I have a very bug prone way of saving the data to the collection but it kind of works so whateves.


If people or a bot tries to spam add stuff it would probably be good to verify e-mail addresses rather than just request them.

Don't think it will be much of a problem here though.
