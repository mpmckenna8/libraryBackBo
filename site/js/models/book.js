
var app = app || {};

app.Book = Backbone.Model.extend({
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
    },
    parse: function( response ) {
    response.id = response._id;

    return response;
  },
  keyvals: function(){
    return _(this.keywords);
  },
  dater:function(){

    console.log('getting a date from ', this)
    return 'doing dating';


  }
});
