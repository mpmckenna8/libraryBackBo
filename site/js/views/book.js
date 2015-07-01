// this is for the view for each book

var app = app || {};

app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: $( '#bookTemplate' ).html(),
	eduTemplate: $( '#edTemplate').html(),
	edPicTem: $('#edPic').html(),
	checkTem: $("#checker").html(),



	events: {
		'click .delete': 'deleteBook',
		'click .edit': 'editup',
		'click .cancel' : 'cancelEd',
		'click .save': 'saver',
		'click .edPic': 'editPic',
		'click .saveP': 'savePic',
		'click .checkout': 'checkit',
		'click .checkOut': 'checkO'
	},
	booksie: function(){

	 return	this.model.toJSON()
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

		if(toren.checked.possessed !== 'CoF'){
			this.$el.addClass('checkedOut')
		}
		else{


			this.$el.addClass('checkout')
			console.log($($(this.$el.context.children).filter('a')).addClass('checkout'))
		}

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

		var booksi = this.model.toJSON();

		var templ = _.template( this.edPicTem);

		this.$el.html(templ(booksi))

	},
	savePic: function(){


		console.log(this.booksie());
		var fitoload = document.getElementById("coverImage").files;


		var blap = $(this.el).children('ul')[0] //.context //.forEach(function(d,i){
		//	console.log(d)
	//	});

		//console.log($(blap).children('input'));

		var innies = $(blap).children('input');

		console.log(innies)

		// want to change this when I need to wait for a fileupload
		var simpl = true;

		var pici = {};

		// still need to take care of the image upload in hopper
		innies.each(hopper)



	if(simpl){

		this.model.set(pici);

		Backbone.sync("update", this.model);

		this.cancelEd();


	}

	else{

		app.octo.readit(pici, this);
	}


function hopper(i, d){
	console.log(d)

	var $d = $(d);

	var valno = $d.val();
	console.log(valno)
	this.readit = this.readit

	if(d.id =='picLink'){
		if(valno){
			console.log('almost changed the image')
			pici = {coverImage: valno};

// no access to the this.model from this function unless i when to the parent scope somehows.
	//	this.model.set(covim);

		}

	}
	else if (d.id =="filerP"){
		console.log('in the file thing',  typeof valno)
		if(valno){

			console.log('a file was found')
			simpl = false;

			console.log(this)

			pici = this;

		}
	}

}
function bopper(dah, mod){

console.log('for some reason bopper called')
	//app.octo.readit(da,mod);
}


	},

	readit:function(blr){

		console.log('gotta do a filereader w/ ', blr);

	},


	checkit:checkout,

	checkO:function(){
		console.log('checking out', this.model);

		console.log($('#checkE').val())

		var checker = $('#checkE').val();

		var nowChecked = {
			checked:{
				available:false,
				possessed: checker
			}
		}

		this.model.set(nowChecked);


		Backbone.sync("update", this.model);

		console.log((this.$el.addClass('checkedOut')));



		this.cancelEd();



	}
	// this is where checkO ended



}


);





function checkout(){
	console.log('ready to checkout', this)

	var toren = this.model.toJSON();



	var templ = _.template(this.checkTem);

	this.$el.html(templ(toren)).css('width', "80%").css("height", "fit-content");





}
