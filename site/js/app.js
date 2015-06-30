var app = app || {};

$(function() {

  $("#tabs").tabs();


    $( '#releaseDate' ).datepicker();

    new app.LibraryView();

    Backbone.emulateHTTP = false;

    $("#relDate").datepicker();

    $("#tabs-1").css("display", "none")

    $("#adder").click(function(){
      console.log('thinger goy clicked')

      $("#tabs-1").css("display", "block");
      console.log('clicking on thing')

    })
});

//console.log($("#addarea").css("display"))

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
