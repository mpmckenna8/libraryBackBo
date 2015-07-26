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
		'click #retBook': 'returnB',
		'change #sorter': 'sortIt',
		'change #filt input':'filterIt',
		'change #availFil': "filAvail"


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

	sortIt: function(){
		this.collection.comparator = $("#sorter")[0].value;

		this.collection.sort();
		// the below will remove all of the view when all I want is the bookContainers.
		//this.remove();
	//	console.log((this.$el.children('.bookContainer').remove()))


		if(this.collection.comparator){

					this.clearAllBooks();
					this.render();
		}

		console.log($("#sorter")[0].value)


	},
	clearAllBooks: function(){
		this.$el.children('.bookContainer').remove()

	},
	filterIt: function(){

		console.log('filtering from event!');
		console.log($(this.$el.children("#tabs")[0]).find('#filt').children('label'));

		var arrayLabs = $(this.$el.children("#tabs")[0]).find('#filt').children('label');


		arrayLabs.each(function(i,d){
			console.log(i)
			console.log($(d).children('input'));
			var iner = $(d).children('input')[0];

			var isAvail = $("#availFil")[0].checked;



		  if(iner.value === "sfpl"){
				console.log('library books check')
				if(iner.checked){
						$('.sfplbook').css("display", "inherit");
					}
				else{
					$(".sfplbook").css("display", "none");
				}
			}
			else if(iner.value === "cof"){
				if(iner.checked){

					if(!isAvail){

					$('.checkedOut').css("display", "inherit");
					$(".available").css("display", "inherit");
				}
				else{
					$(".available").css("display", "inherit");

				}
				}
				else{
					$('.checkedOut').css("display", "none");
					$(".available").css("display", "none");
				}
			}
			else if(iner.value === "Available"){
				console.log(iner.checked);


			}


		})


	},
	filAvail: function(){
		// Need to do this one separate or I could have made sure it would be the last executed filter above
		console.log($("#availFil"))
		var isFilled = $("#availFil")[0].checked;

		if(isFilled){
			$(".checkedOut").css("display", "none")
		}
		else{
			$(".checkedOut").css("display", "inherit")
		}


	}

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
