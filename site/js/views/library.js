// this is where the view for the library will go.
var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: $( '#books' ),

	initialize: function() {
		this.collection = new app.Library();
		this.collection.fetch({reset:true});
		this.render();

		this.listenTo( this.collection, 'add', this.renderBook );
		this.listenTo( this.collection, 'reset', this.render );

	},

	events: {
		'click #add': 'addBook',
		'click #sfplURL': 'liblink',
		'click #retBook': 'returnB'

	},
  // Right now I have the coverImage set to save to a urlDatq
  //dfkd
	//
	addBook: app.octo.newbook,

	// render library by rendering each book in its collection
	render: function() {
		this.collection.each(function( item ) {
			this.renderBook( item );

		//	console.log(item)
		}, this );
	},

	// render a book by creating a BookView and appending the
	// element it renders to the library's element
	renderBook: function( item ) {
		var bookView = new app.BookView({
			model: item
		});
		this.$el.append( bookView.render().el );
	},

	liblink:function(e){

		console.log(e)
		var linker = $('#urlLib').val();

		console.log(linker)
// Just doing a simple ajax post to send a book to the server to process through my kimono thing
		$.ajax({
			url:"/api/sfpl",
			data: {'info':linker},
			type:'POST'
		}).done(function(){
			console.log('done sent somedin')
		})

	},
	returnB: app.octo.bookRet,

	});

	


$( document ).ajaxComplete(function() {
  console.log('ajaxy thing is done')
	$( ".log" ).text( "Triggered ajaxComplete handler." );


});

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.

  console.log('we can filesystem')
} else {
  alert('The File APIs are not fully supported in this browser.');
}
