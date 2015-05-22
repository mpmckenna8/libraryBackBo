var app = app || {};

$(function() {

    $( '#releaseDate' ).datepicker();

    new app.LibraryView();

    Backbone.emulateHTTP = false;
});
