// this is for the view for each book

var app = app || {};

app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: $( '#bookTemplate' ).html(),
	eduTemplate: $( '#edTemplate').html(),


	events: {
		'click .delete': 'deleteBook',
		'click .edit': 'editup',
		'click .cancel' : 'cancelEd',
		'click .save': 'saver',
		'click .edPic': 'editPic'
	},

	deleteBook: function() {
		//Delete model
		this.model.destroy();

		//Delete view
		this.remove();
	},

	render: function() {
		//tmpl is a function that takes a JSON object and returns html
  //  console.log(this.model.toJSON(), 'to change')
  // don't work  console.log(app.Library.toJSON())
  //  console.log(this.template)

  // gonna work some magic to fix on up the release date if need be
  var toren = this.model.toJSON();

//  console.log(Date.now())

  toren.releaseDate = new Date(toren.releaseDate *1).getFullYear();
  console.log(toren.keywords)




		var tmpl = _.template( this.template );

		//this.el is what we defined in tagName. use $el to get access to jQuery html() function
		this.$el.html( tmpl( toren ) );

		return this;
	},
	editup: function(){

		console.log(this.model);

		var toren = this.model.toJSON();

		toren.words = [];

		var datey = 'rar'

		toren.releaseDate = new Date(toren.releaseDate *1);
	//	console.log(toren.keywords)

	console.log(toren.releaseDate.getDate() +"/"+toren.releaseDate.getMonth() + "/" + toren.releaseDate.getFullYear());

	toren.releaseDate = toren.releaseDate.getDate() +"/"+toren.releaseDate.getMonth() + "/" + toren.releaseDate.getFullYear();

	if(toren.keywords){
	toren.keywords.forEach(function(dop, i ){
		console.log(dop, i)
		toren.words.push(dop.keyword)
	})
}
else{
	toren.words = '';
}

toren.words = toren.words.toString();

//toren.keywords = [];
console.log(toren.words)


		var templ = _.template(this.eduTemplate);

		this.$el.html(templ(toren)).css('width', "360px").css("height", "fit-content");

		$("#relDate").datepicker();


	},
// This happens when the cancel button is clicked in the edit book view
	cancelEd: function(){
		this.render();
	//	console.log(this.$el.css("width"))
		this.$el.css("width", "")

	},
	saver:function(){

		var blobber = this.model;

		var chjson = this.model.toJSON();

		console.log(chjson);

		console.log((($(this.$el.context).children('.editing')[0])) )//.children)

		$($(this.$el.context).children('.editing')[0]).children().each(function(i, el){

			console.log($(el).children('input'));

			var elid,
			dato;

			if($(el).children('input').length > 0){

			elid = $(el).children('input')[0].id;
			dato = $($(el).children('input')[0]).val();


		}
		else{
			elid = '';
		 	dato = '';

		}

			console.log(elid, dato)
				if(elid === 'tit'){

					console.log('changing title')
					chjson.title = dato;
				}
				else if(elid ==="aut"){
					if($(el).val() !== chjson.author){
						chjson.author = dato;
					}
				}
				else if(elid === "relDate"){
					if(dato !== chjson.releaseDate){

						console.log(dato, $('#relDate').datepicker('getDate').getTime())


						chjson.releaseDate = $('#relDate').datepicker('getDate').getTime();
					}
				}
				else if(elid === "key"){

					var keyos = [];
					if(dato !== chjson.keywords.toString() || $(el).val() !==''){
						  console.log($(el).val());
							var keywos = dato.split(',')
							console.log(keywos);
							_.each( keywos , function(keywor){
								keyos.push({keyword: keywor })

							} )
							chjson.keywords = keyos;
					}
					else{
						chjson.keywords = [];
					}
				}

				else if(elid === "mailo"){
					console.log(dato)
						chjson.mailer = dato;
				}


			})
// thought this automatically updates with server but now I think i have to do the Backbon.sync thing below.
			this.model.set(chjson);

			console.log(this.model)

			Backbone.sync("update", this.model);

			console.log(this.model)


			this.cancelEd();

	},

	editPic: function(){
		console.log('we need to edit the picture still. Not impletmented');
	}


}


	);
