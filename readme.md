# Conservatory of Flowers Volunteer library base code


This is mostly based off some code from exercise 2 in a book on backbone.js stuff:
http://addyosmani.github.io/backbone-fundamentals/#todo-collection



Gotta fricking work on my markdown skills and describe this projecton.


The basic schema for adding stuff to mongo is but I need to also have either a new object for checkoutbooks or just add an attribute and update the given item each time.

		var Book = new mongoose.Schema({
			title: String,
			author: String,
			releaseDate: String,
	  	coverImage: String,
			mailer:String,
			keywords: [ Keywords ]
		});

With mailer being the email address of the person who added the book and the coverImage being either a data url or a string hotlinked to another picture on the web (goodreads seems to be nice about hotlinking to images). Which I should recommend because I means less storage of pictures for the database.


I think I have a very bug prone way of saving the data to the collection but it kind of works except when editing the picture of a given book.


If people or a bot tries to spam add stuff it would probably be good to verify e-mail addresses rather than just request them.

Don't think it will be much of a problem here though.

Want to use Kimono for making an api for the sites that don't give me one.




Mongo query to return all the books that are currently checked out:

	db.books.find({$where:"obj.checked.available == false"}, {title:1, checked:1});

then to set all the not available ones to having the same email so as to do a mass return of books:

	db.books.update( {$where:"obj.checked.available == false"}, {$set:{checked:{possessed:"CoF", available:true} } }, {multi:true} )

gotsta make it so the due date gets set on checkout
