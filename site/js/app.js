var app = app || {};

$(function() {

  $("#tabs").tabs();


    $( '#releaseDate' ).datepicker();

    new app.LibraryView();

    Backbone.emulateHTTP = false;

    $("#relDate").datepicker();

    $("#tabs-2").css("display", "none")

    $("#oubook").click(function(){
      console.log('thinger goy clicked')

      $("#tabs-2").css("display", "inherit");

    })
});

console.log($("#addarea").css("display"))

/*

$("#abook").click(function(){
  console.log('add bokk got clicked yo')

  console.log($("#addarea").css("display"));

  if( $("#addarea").css("display") == "none"){


  //$("#addarea").css("display", 'inline');

  //  $("#addBook").css("width", "100%")
  }


  */






function bleep(){
  console.log('button got clicked')
}
