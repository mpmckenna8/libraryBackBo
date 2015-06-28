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
		'click #sfplURL': 'liblink'
	},
  // Right now I have the coverImage set to save to a ArrayBuffer
  //dfkd
	addBook: function( e ) {

		console.log('at least tried')

    var decollect = this.collection;

    console.log(this.collection)
		e.preventDefault();

    var fiload = false;

    var fitoload = document.getElementById("coverImage").files;


		var formData = {};

		$( '#addarea' ).children( 'input' ).each( function( i, el ) {
			console.log('get the childrens')

			if( $( el ).val() != "" )
			{
				console.log('got some val ',  $( el ).val())
				if( el.id === 'keywords' ) {
					formData[ el.id ] = [];
					_.each( $( el ).val().split( ' ' ), function( keyword ) {
						formData[ el.id ].push({ 'keyword': keyword });
					});
				} else if( el.id === 'releaseDate' ) {
					formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
				}
				else if (el.id === "mailer"){
					console.log($("#mailer"))

					formData[el.id] = $("#mailer").val()
				}

        else if (el.id === "coverImage")
        {

          if(fitoload.length > 0){
              console.log("trying to make the cover image");
              console.log(document.getElementById("coverImage").files[0])
              console.log($("#coverImage")[0].files)
              var pepy =$("#coverImage")[0].files[0];
              var reader = new FileReader();

								//would probably be ideal to use readAsArrayBuffer especially to store in mongo and transfer but whatevs for here
               reader.readAsDataURL(pepy)

               reader.onload = function(fibuf){
                 console.log(fibuf);

                 formData[el.id] = fibuf.target.result;

                 dosave(formData);

               };
         }

        }
				else if (el.id === "urlimager"){
						if($(el).val()){
							console.log($(el).val())
							formData.coverImage = $(el).val()
						}
					}
        else {

					formData[ el.id ] = $( el ).val();
				}
			console.log('going through form')

			}




		});
		if(fitoload.length === 0){
			console.log('saving here')
			dosave( formData );
		}



function dosave(doc){

  decollect.create(doc)

	$( '#addBook div' ).children( 'input' ).each( function( i, el ) {
		$(el).val('')

	})

	$("#addarea")
		.css("display", 'none');

		$("#addBook").css("width", "20%")

}

	},

	// render library by rendering each book in its collection
	render: function() {
		this.collection.each(function( item ) {
			this.renderBook( item );
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

	disAddBook: function(){

	},
	liblink:function(e){

		console.log(e)
		var linker = $('#urlLib').val();

		console.log(linker)

		$.ajax({
			url:"/api/sfpl",
			data: {'info':linker},
			type:'POST'
		}).done(function(){
			console.log('done sent somedin')
		})




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
