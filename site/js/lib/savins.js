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







  },

  bookRet: function(){
    console.log('books betting returned')
    console.log(this.$el.children('#tabs')[0]);
    console.log($(this.$el.children('#tabs')[0]).children('#tabs-3')[0]);




    console.log( this.collection.toJSON())

    var inies = $($(this.$el.children('#tabs')[0]).children('#tabs-3')[0]).children('input');

    var rorer;
    console.log(inies)
    inies.each(function(i,dat){
      console.log(i, dat)
      if($(dat).val()){
        console.log($(dat).val())
        rorer = $(dat).val()
      }
    })

    var mods = this.collection.toJSON();



    var uls = _.filter(mods, function(d){

      //{"checked" : { "available" : false, "possessed" : "mpmckenna8@me.com" } }
      console.log(d.checked.possessed == rorer)
    return  d.checked.possessed == rorer;

    })

    console.log(uls)

    function retbook(book){
      console.log(this)    }


      var returner;


    for (var i = 0; i < uls.length; i ++){
      console.log(this.collection.where(uls[i]))
      returner = this.collection.where(uls[i])[0];
      console.log(returner)

      returner.set({"checked":{available:true,
      "possessed": "CoF"}});

      Backbone.sync("update", returner);




    }


  }
}
