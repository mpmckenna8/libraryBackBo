var app = app || {};

$(function() {

    $( '#releaseDate' ).datepicker();

    new app.LibraryView();

    Backbone.emulateHTTP = false;
});

console.log($("#addarea").css("display"))


$("#abook").click(function(){
  console.log('add bokk got clicked yo')

  console.log($("#addarea").css("display"));

  if( $("#addarea").css("display") == "none"){



  $("#addarea")
    .css("display", 'inline');
  }
    





})
