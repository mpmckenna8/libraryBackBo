// this is for the view for each book

var app = app || {};

app.BookView = Backbone.View.extend({
	tagName: 'div',
	className: 'bookContainer',
	template: $( '#bookTemplate' ).html(),

	events: {
		'click .delete': 'deleteBook'
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

  console.log(Date.now())

  toren.releaseDate = new Date(toren.releaseDate *1).getFullYear();
//  console.log(toren)


		var tmpl = _.template( this.template );

		//this.el is what we defined in tagName. use $el to get access to jQuery html() function
		this.$el.html( tmpl( toren ) );

		return this;
	}
});
