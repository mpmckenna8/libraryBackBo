var app = app || {};

var modeler;

var that;

app.octo = {
  saveBook: function(){

  },
  readit:function(fi, mod){

    console.log('filin', fi, mod)
    var imfi;
    modeler = mod.model;

    that = mod;

    var reader = new FileReader();

    var filo = $(fi)[0].files[0];

    reader.readAsDataURL(filo);

    reader.onload = function(fiU){

      console.log('the dataURL should be fiU but')


// need to do to fiU whatever i did in the library view for the file loader thing.
      imfi = {coverImage:fiU.target.result};

      saver(imfi);

    }


    function saver(covIm){

      console.log(that)
      that.model.set(imfi);

      that.cancelEd();

    }







  }
}
