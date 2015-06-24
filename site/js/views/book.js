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
		'click .save': 'saver'
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

		this.$el.html(templ(toren)).css('width', "85%").css("height", "fit-content");

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

	//	console.log((this.$el.context.children[0]).children()) //.children)

		this.$el.children('span').each(function(i,pl){

		//	console.log(i, pl)


		})


		$(this.$el.context.children[0]).children('input').each(function(i, el){
			/*
			defaults: {
	        coverImage: '',// 'img/placeholder.png',
	        title: 'No title',
	        author: 'Unknown',
	        releaseDate: 'Unknown',
	        keywords: [],
	        mailer:'unknown',
	        checked:{
	          available:true,
	          possessed:'CoF'
	        }
					*/

			console.log(el);

			var dato = $(el).val();
			console.log(el.id, dato)
			if(el.id === 'tit'){

				console.log('changing title')
				chjson.title = $(el).val();
			}
			else if(el.id ==="aut"){
				if($(el).val() !== chjson.author){
					chjson.author = dato;
				}
			}
			else if(el.id === "relDate"){
				if($(el).val() !== chjson.releaseDate){

					console.log(dato, $(el).datepicker('getDate').getTime())


					chjson.releaseDate = $(el).datepicker('getDate').getTime();
				}
			}
			else if(el.id === "key"){

				var keyos = [];
				if($(el).val() !== chjson.keywords.toString() || $(el).val() !=='/'){
					  console.log($(el).val());
						var keywos = $(el).val().split(',')
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

			})
// thought this automatically updates with server
			this.model.set(chjson);

			console.log(this.model)

			Backbone.sync("update", this.model);

			this.cancelEd();



	}

});
