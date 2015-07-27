var app = app || {};

var modeler;

var that;

app.octo = {

  // This one is called from the saver in view/book.js
  saveBook: function(){
    var blobber = this.model;

		var chjson = this.model.toJSON();

		console.log(chjson);

		console.log((($(this.$el.context).children('.editing')[0])) )//.children)

		$($(this.$el.context).children('.editing')[0]).children().each(function(i, el){

			console.log($(el).children('input'));

			var elid,
			dato;

		if($(el).children('input').length > 0){

			elid = $(el).children('input')[0].id;
			dato = $($(el).children('input')[0]).val();

  		}

  	else{
  			elid = '';
  		 	dato = '';

  		}

			console.log(elid, dato)
				if(elid === 'tit'){

					console.log('changing title')
					chjson.title = dato;
				}
				else if(elid ==="aut"){
					if($(el).val() !== chjson.author){
						chjson.author = dato;
					}
				}
				else if(elid === "relDate"){
					if(dato !== chjson.releaseDate){

						console.log(dato, $('#relDate').datepicker('getDate').getTime())


						chjson.releaseDate = $('#relDate').datepicker('getDate').getTime();
					}
				}
				else if(elid === "key"){

					var keyos = [];
					if(dato !== chjson.keywords.toString() || $(el).val() !==''){
						  console.log($(el).val());
							var keywos = dato.split(',')
							console.log(keywos);
							_.each( keywos , function(keywor){
								keyos.push({keyword: keywor })

							} )
							chjson.keywords = keyos;
					}
					else{
						chjson.keywords = [];
					}
				}

				else if(elid === "mailo"){
					console.log(dato)
						chjson.mailer = dato;
				}


			})
// thought this automatically updates with server but now I think i have to do the Backbon.sync thing below.
			this.model.set(chjson);

			console.log(this.model)

			Backbone.sync("update", this.model);

			console.log(this.model)


			this.cancelEd();


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

      Backbone.sync("update", that.model);

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

    var returner;


    for (var i = 0; i < uls.length; i ++){
      console.log(this.collection.where(uls[i]))
      returner = this.collection.where(uls[i])[0];
      console.log(returner)

      returner.set({"checked":{available:true,
      "possessed": "CoF"}});

      Backbone.sync("update", returner);


    }


  },
  newbook:   function( e ) {

		console.log('at least tried')

    var decollect = this.collection;

    console.log(this.collection)
		e.preventDefault();

    var fiload = false;

    var fitoload = document.getElementById("coverImage").files;


		var formData = {};

	//	console.log($("#tabs-1").children())

		$( '#tabs-1' ).children( 'div' ).each( function( i, el ) {
			console.log('get the childrens', $($(el).context).children('input'))

			var govner = $($(el).context).children('input');
			if (govner.length > 0){
			govner.each(function(i, el){


			if( $( el ).val() != "" )
			{
				console.log('got some val ',  $( el ).val())
				if( el.id === 'keywords' ) {
					formData[ el.id ] = [];
					_.each( $( el ).val().split( ' ' ), function( keyword ) {
						formData[ el.id ].push({ 'keyword': keyword });
					});
				} else if( el.id === 'releaseDate' ) {
					formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
				}
				else if (el.id === "mailer"){
					console.log($("#mailer"))

					formData[el.id] = $("#mailer").val()
				}

        else if (el.id === "coverImage")
        {

          if(fitoload.length > 0){
              console.log("trying to make the cover image");
              console.log(document.getElementById("coverImage").files[0])
              console.log($("#coverImage")[0].files)
              var pepy =$("#coverImage")[0].files[0];
              var reader = new FileReader();

								//would probably be ideal to use readAsArrayBuffer especially to store in mongo and transfer but whatevs for here
               reader.readAsDataURL(pepy)

               reader.onload = function(fibuf){
                 console.log(fibuf);

                 formData[el.id] = fibuf.target.result;

                 dosave(formData);

               };
         }

        }
				else if (el.id === "urlimager"){
						if($(el).val()){
							console.log($(el).val())
							formData.coverImage = $(el).val()
						}
					}
        else {

					formData[ el.id ] = $( el ).val();
				}
			console.log('going through form')

			}


		});
	}

		})

		if(fitoload.length === 0){
			console.log('saving here')
			dosave( formData );
		}


    function dosave(doc){

      decollect.create(doc)

    	$( '#addBook div' ).children( 'input' ).each( function( i, el ) {
    		$(el).val('')

    	})

    	$("#tabs-1")
    		.css("display", 'none');

    		$("#addBook").css("width", "20%")

    }

	},
  //where nowbook ends
  renBookClass:function(toren, that){
//    console.log('wha', that);
    var toren = toren;


//    console.log(toren)
//    console.log(toren.checked.possessed.substr(0,12))

    		if(toren.checked.possessed.substr(0,12) === 'https://sfpl'){
    			that.$el.addClass('sfplbook')
    		}
    		else if ( toren.checked.possessed !== 'CoF'){
    			// this one wasn't much helpful

    			that.$el.addClass('checkedOut')

    		}
    		else{

    			that.$el.addClass('available')

    			$($(that.$el.context.children).filter('a')).addClass('checkout')
    		}

  },



}
