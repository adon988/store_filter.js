(function ( $ ) {
	$.fn.store_drop_down = function(elem,callback){

		var tg = $(this);

		//country bind change event
		tg.find(elem.country).bind('change',function(){

			tg.country_change();

		});


		//country change
		tg.country_change = function(){

			var a = tg.find(elem.country);
			
			/*create county_group*/
			var b = elem.county_group[a.val()];

			if(typeof(b)!=='undefined' && b.length>0){

				var txt = '';

				for(var i in b){

					txt += "<option value='"+b[i][0]+"'>"+b[i][1]+"</option>";
					
				}

				var k = tg.find(elem.county);

				/*insert all county option */
				k.html(txt);

				/*get first county option text*/
				var j = k.find('option').eq(0).text();

				/*insert first county option text to uniform span*/
				tg.find(elem.uniform_county).find('span').eq(0).text(j);

				tg.get_store();

			}

		}//end country_change


		//country bind change event
		tg.find(elem.county).bind('change',function(){

			tg.get_store();

		});


		//get county from ajax
		tg.get_store = function(){

			var c = tg.find(elem.country);

			var d = tg.find(elem.county);

			var f = '';
			
			if(typeof(c)!='undefined' && typeof(d)!='undefined'){

				$.ajax({
				  url: elem.http_url+c.val()+'/'+d.val(),
				  dataType: 'json'
				})
				  .done(function( data ) {

				  	
				  	if(data!=''){
				  		$.each(data, function(i, item) {
				  			f+='<li><h3 class="title-article">'+data[i].
				  			store_name+'</h3><div class="store-address">'+data[i].
				  			store_addr+'</div><div class="stroe-tel">'+data[i].
				  			store_phone+'</div><div class="stroe-time"><h4 class="title-store-time">營業時間</h4><div class="stroe-time-detail">'+data[i].
				  			store_time+'</div><div class="stroe-time-detail">'+data[i].
				  			store_time2+'</div></div></li>';
				  		})
				  	}
				  	/*Add data to store content*/
				  	$(elem.store_content).html(f);
				  
				  });
			}

		}//end get_store

	    //--------------------------------------------------------------------
	    //return
	    return {
	        country_change : function() { tg.country_change(); }
	    }

	}
}( jQuery ));
// end store_filter.min.js