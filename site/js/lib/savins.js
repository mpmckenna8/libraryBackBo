var app = app || {};


app.octo = {
  saveBook: function(){

  },
  readit:function(fi, mod){

    console.log('filin', fi, mod)

    var reader = new FileReader();

    var filo = $(fi)[0].files[0];

    reader.readAsDataURL(filo);

    reader.onload = function(fiU){

      console.log('the dataURL should be fiU', fiU)



      fiU;

    }







  }
}
