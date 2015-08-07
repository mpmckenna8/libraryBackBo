// this is for the view for each book

var app = app || {};

app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	// this used to be how to get the book template but I made it a global variable
	//template: $( '#bookTemplate' ).html(),
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
		'click .checkOut': 'checkO',
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
	//	console.log(BookTem)
		//tmpl is a function that takes a JSON object and returns html
  //  console.log(this.model.toJSON(), 'to change')
  // don't work  console.log(app.Library.toJSON())
  //  console.log(this.template)

  // gonna work some magic to fix on up the release date if need be
  var toren = this.model.toJSON();


  toren.releaseDate = new Date(toren.releaseDate *1).getFullYear();

		var tmpl = _.template( BookTem );

		//this.el is what we defined in tagName. use $el to get access to jQuery html() function
		this.$el.html( tmpl( toren ) );

//console.log(app.octo.renBookClass('blah'));
		app.octo.renBookClass(toren, this)

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
//console.log(toren.words)


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
	// this is in the savins.js file and deals with going through all the edit jam to save whatever stuff is in the fields.
	saver:app.octo.saveBook,

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


	checkit: checkout,

	checkO:function(){
		console.log('checking out', this.model);

		console.log($('#checkE').val())

		var checker = $('#checkE').val();
		var dueday = Date.now();
		var doer = new Date();
		console.log(new Date(dueday).toDateString(), new Date(new Date().setDate(doer.getDate() + 35)).toDateString())

		var nowChecked = {
			checked:{
				available:false,
				possessed: checker,
				due: dueday
			}
		}

		this.model.set(nowChecked);


		Backbone.sync("update", this.model);

		console.log((this.$el.addClass('checkedOut')));


		this.cancelEd();


	},
	// this is where checkO ended


});




// These are just helper functions down here


function checkout(){
	console.log('ready to checkout', this)

	var toren = this.model.toJSON();


	var templ = _.template(this.checkTem);

	this.$el.html(templ(toren)).css('width', "80%").css("height", "fit-content").attr("name", toren.title)

	this.$el[0].scrollIntoView()

}
