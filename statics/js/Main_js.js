$(document).ready(function(){
	
	var url = "http://webproject.roohy.me/ajax/1/89103798/category/list";
	var ajaxData = {
	  
	}
	$.ajax({
		url: url,
		type: 'post',
		dataType: 'json',
		data:ajaxData,
		
		beforeSend : function(){
			var div = document.createElement('div');
			div.className = "ui active inverted dimmer";
			div.id = "loading";
			
			var div2 = document.createElement('div');
			div2.className = "ui text loader";
			div2.textContent = "Loading";
			
			div.appendChild(div2);
		
			var body = document.getElementById('body');
			body.appendChild(div);
		},
		
		
		success: function(data, status, xhr){
		    if (data.result == 0){
		       // Request error
		    }else {
					var loading = document.getElementById('loading');
					loading.remove();
					
				  //alert(data.categoryList[0].parent);
				  //alert(data.categoryList.length);
				  var accord = document.createElement('div');
				  accord.className = 'ui accordion';
				  //alert(data.categoryList.length);
				  for(var j=0;j<data.categoryList.length;j++){
					  
					 if(typeof data.categoryList[j].parent === "undefined"){
						  //alert("undef" + data.categoryList[j].name);
						  var div = document.createElement('div');
						  div.className = 'title';
						  var itag = document.createElement('i');
						  itag.className = 'dropdown icon';
						  div.textContent = data.categoryList[j].name;  
						  div.appendChild(itag);
						  accord.appendChild(div);
						  var div2= document.createElement('div');
						  div2.className = 'content';
						  accord.appendChild(div2);
						  doit(j);
					  }
					  
				  }
				  function doit(j){
					  for(var z=0;z<data.categoryList.length;z++){	 
						   		if(typeof data.categoryList[z].parent === "number" && data.categoryList[z].parent == data.categoryList[j].id){
									pClicks(z,data.categoryList[z].id);
									
								}
						   }
				  }
				  
				  function pClicks(z,tabid){
						var tdiv= document.createElement('div');
						var p = document.createElement('p');
						p.textContent = data.categoryList[z].name;
						p.className = 'myMenu';
						tdiv.appendChild(p);
						
						tdiv.onclick = function(){
							document.location = 'base_product_list.html#tabs-' + tabid;
						 };
						
						div2.appendChild(tdiv);	  
				  }
				  
				var asidee = document.createElement('aside');
				asidee.appendChild(accord);
				var body = document.getElementById('body');
				body.appendChild(asidee);
				$('.ui.accordion').accordion();
				
			}
		},
		// ...
	});
	
	$('#mysearch').bind('input',function(e) {
		var ajaxData = {
		  search: $(this).val(),
		  page: 1	
		}
	
		var url = "http://webproject.roohy.me/ajax/1/me/product/list";
	
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'json',
			data: ajaxData,
			success: function(data, status, xhr){
				if (data.result == 0){
				   // Request error
				}else {
					
				   // success
				}
			}
			// ...
		});
    });
	
});