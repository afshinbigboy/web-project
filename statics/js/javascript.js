$(document).ready(function(){
	
    // fix the classes
    $( ".tabs-bottom .ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *" )
      .removeClass( "ui-corner-all ui-corner-top" )
      .addClass( "ui-corner-bottom" );
    // move the nav to the bottom
    $( ".tabs-bottom .ui-tabs-nav" ).appendTo( ".tabs-bottom" );
	var ajaxData1 = {};
	var url1 = "http://webproject.roohy.me/ajax/1/92110465/category/list";
	$.ajax({
		url: url1,
		type: 'post',
		dataType: 'json',
		data: ajaxData1,

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


				for(var i=0;i<data.categoryList.length;i++){
					if(typeof data.categoryList[i].parent === "number"){
						var num = data.categoryList[i].id;
						var li = document.createElement('li');
						var a = document.createElement('a');
						a.className = 'item';
						a.setAttribute('href',"#tabs-" + num);
						a.textContent = data.categoryList[i].name;
						li.appendChild(a);
						document.getElementById('productsNav').appendChild(li);
						var div = document.createElement('div');
						div.id = "tabs-" + num;
						div.style = "padding-left : 100px";
						document.getElementById('navtabs').appendChild(div);

   					}

				}
				$( ".tabs" ).tabs({
				  collapsible: true
				});

                $('#ui-id-5').click();
				for(var i=0;i<data.categoryList.length;i++){
				    if(typeof data.categoryList[i].parent === "number"){
						createItem(data.categoryList[i].id,data,1);
					}
				}				
				function createItem(id,data,page){
					var ajaxData = {
						 "category":id,
						  "search": "",
						  "page": page,
						  "pageSize": 10
					}
					var url = "http://webproject.roohy.me/ajax/1/92110465/product/list";
						$.ajax({
							url: url,
							type: 'post',
							dataType: 'json',
							data: ajaxData,
							success: function(data, status, xhr){
								if (data.result == 0){
								   alert('error');
								}else {
									itemsdiv = document.createElement('div');
									itemsdiv.className = "ui items";
									itemsdiv.id = "uiitems";
									itemsdiv.style.paddingleft = "100px";
									div.appendChild(itemsdiv);
									
								for(var j=0;j<data.productList.length;j++){
									var temp = data.productList[j];
									var divitem = document.createElement('a');
									divitem.className = "item";										
									var divimage = document.createElement('div');
									divimage.className = 'image';										
									var image =  document.createElement('img');
									image.src = temp.picUrl;										
									var aimage = document.createElement('a');
									aimage.className = 'like ui corner label';
									var i = document.createElement('i');
									i.className = 'like icon';										
									aimage.appendChild(i);
									divimage.appendChild(image);
									divimage.appendChild(aimage);										//
									var content = document.createElement('div');
									content.className = 'content';										
									var divname = document.createElement('div');
									divname.className = 'name';
									divname.textContent= temp.name;										
									var divprice = document.createElement('div');
									divprice.className = 'name';
									divprice.textContent= "قیمت : " + temp.price;
									var acontent = document.createElement('a');
									acontent.className = 'ui blue button';
									acontent.textContent = 'اضافه به سبد';
							/**/		acontent.setAttribute("id","pDoc"+j+id);
							/**/		acontent.setAttribute("pid",temp.id);
								//		acontent.setAttribute("onclick","addCartList($(this))");
									content.appendChild(divname);
									content.appendChild(divprice);
									content.appendChild(acontent);
									divitem.appendChild(divimage);
									divitem.appendChild(content);										
									itemsdiv.appendChild(divitem);
									var x = "tabs-" + id; 
									document.getElementById(x).appendChild(itemsdiv);
								}
								
								for(var i=0;i<data.productList.length;i++){
                        			$('#pDoc'+i+id+'').click(function(){
                            			addCartList($(this))
                        			})
                    			}
                    			                        		/**/
								createPagination(id,data);
							}
						}							
					});
					
					function addCartList(e){
				        var ajaxData = {
				            "productId": e.attr('pid')
				        };
				        var url1 = "http://webproject.roohy.me/ajax/1/92110465/cart/add";
				        $.ajax({
				            url: url1,
				            type: 'post',
				            dataType: 'json',
				            data: ajaxData,
				            success: function(data, status, xhr){
				                if (data.result == 0){
				                    alert('error add cart');
				                    // Request error
				                }else {
				                    // success
				                    alert('added...');
				                    getCartList();
				                }
				            }
				        })
    				}


					function createPagination(id,data){
						var div = document.createElement('div');
						div.className = "pagination";
						div.id = "p" + id;
						var ul = document.createElement('ul');
						for(var i=0;i<data.pageSize;i++){
							doFunc(i,ul);								  
						}							  
						div.appendChild(ul);							  
						var s = "tabs-" + id; 
						document.getElementById(s).appendChild(div);
					}						  
					function doFunc(i,ul){
						var li = document.createElement('li');								  
						var a = document.createElement('a');
						a.className = 'pages';
						var x = i+1;
						a.setAttribute('href','#' + x);
						a.textContent = x;
						function func(){
							goPage(x);
						}
						a.addEventListener('click', func,false);
						li.appendChild(a);
						ul.appendChild(li);
					}						  
					function goPage(x){
						$('#tabs-' + id + '.ui.items').remove();
						$('#p' + id).remove();
						createItem(id,data,x);

					}					
				}
		    }
		}
		// ...
	});

    function getCartList(){
        var ajaxData = {
        };
        var url1 = "http://webproject.roohy.me/ajax/1/92110465/cart/list";
        $.ajax({
            url: url1,
            type: 'post',
            dataType: 'json',
            data: ajaxData,

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
                    alert('error fetch cartList');
                    // Request error
                }else {
                     var loading = document.getElementById('loading');
				loading.remove();
                    // success
                    var dd=document.getElementById('buyCart');
                    while(dd.firstChild.nextSibling)
                        dd.removeChild(dd.firstChild);

                    var d0=document.createElement('div');
                    d0.setAttribute("class","ui segment");
                    d0.setAttribute("style","margin-top:3%; padding: 0px;");

                    var d1=document.createElement('p');
                    d1.setAttribute("style","text-align: center; font-size: 120%;");
                    d1.innerHTML='سبد خرید';
                    d0.appendChild(d1);
                    dd.insertBefore(d0,dd.lastChild);

                    for(var i=0; i<data.cart.length;i++){
                        var f1=document.createElement('div');
                        f1.setAttribute("class","comment ui stacked segment");
                        f1.setAttribute("style","margin: 5px 0");
                        var f30=document.createElement('div');
                        f30.setAttribute("style","float:right; width:60%;");
                        f1.appendChild(f30);
                        var f2=document.createElement('a');
                        f2.setAttribute("class","avatar");
                        f2.setAttribute("href","#");
                        f2.setAttribute("style","margin: 0px; width:30px; text-decoration: none; color:#5a5");
                        var f3=document.createElement('img');
                        f3.setAttribute("src",data.cart[i].picUrl);
                        f3.setAttribute("style"," width:50px; float:right; height:60px;");
                        f2.appendChild(f3);
                        f30.appendChild(f2);
                        var f4=document.createElement('div');
                        f4.setAttribute("class","content");
                        var f6=document.createElement('h4');
                        f6.setAttribute("style","margin:0px 5px; float: right;");
                        f6.innerHTML=data.cart[i].name;
                        f2.appendChild(f6);
                        var f7=document.createElement('div');
                        f7.setAttribute("class","metadata");
                        var f8=document.createElement('span');
                        f8.setAttribute("class","date");
                        f8.innerHTML='';
                        f7.appendChild(f8);
                        f4.appendChild(f7);
                        var f9=document.createElement('div');
                        f9.setAttribute("class","text");
                        f9.innerHTML='قیمت: '+data.cart[i].price;
                        f4.appendChild(f9);
                        var f10=document.createElement('div');
                        f10.setAttribute("class","actions");
                        var f11=document.createElement('button');
                        f11.setAttribute("class","ui red button");
                        f11.setAttribute("style","font-size:50%");
                        f11.setAttribute("id",'product'+i);
                        f11.setAttribute("pid",data.cart[i].id);
                        f11.innerHTML='حذف از سبد';
                        f10.appendChild(f11);
                        f4.appendChild(f10);

                        var f90=document.createElement('div');
                        f90.setAttribute("style","clear:both;");
                        f4.appendChild(f90);

                        f1.appendChild(f4);
                        var ff=document.getElementById('buyCart');
                        ff.insertBefore(f1,dd.lastChild);
                    }

                    for(var i=0;i<data.cart.length;i++){
                        $('#product'+i+'').click(function(){
                            delFromCart($(this))
                        })
                    }
                     setNum();
                }

            }
        })

    }
    getCartList();

    function delFromCart(e){
        var ajaxData = {
            "productId": e.attr('pid')
        };
        var url1 = "http://webproject.roohy.me/ajax/1/92110465/cart/remove";
        $.ajax({
            url: url1,
            type: 'post',
            dataType: 'json',
            data: ajaxData,

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
                    alert('error delete cart');
                    // Request error
                }else {
                    // success
                     var loading = document.getElementById('loading');
				loading.remove();
                    alert('deleted..!');
                    getCartList();
                }
            }
        })
    }


     function setNum(){
        var ajaxData = {
        };
        var url = "http://webproject.roohy.me/ajax/1/92110465/cart/list";
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: ajaxData,

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
                    alert('error fetch cartList');
                    // Request error
                }else {
                     var loading = document.getElementById('loading');
				loading.remove();
                    var numbers = data.cart.length;
                    str = "تعداد :";
                    $('#numBuy').text(str + numbers);
                    $('#productsNav').css('font-family','B roya');

                }
            }

        });
     }


       $('#mysearch').bind('input',function(e) {
           var value = $(this).val();
		var ajaxData = {
          "category":"",
		  search: $(this).val(),
          "page": "",
          "pageSize": ""
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
                    if(value != ""){
                        console.log(data.productList[0]);
                        $('.ui.items').hide();
                        $('.pagination').hide();
                        $('#productsNav').hide();
                        var x= $('#uiitemsSearch');
                        if(typeof x !== 'undefined')
                            $('#uiitemsSearch').remove();
                        itemsdiv = document.createElement('div');
                        itemsdiv.className = "ui items";
                        itemsdiv.id = "uiitemsSearch";
                        itemsdiv.style.paddingleft = "100px";
                        document.getElementById('navtabs').appendChild(itemsdiv);

                        var temp = data.productList[0];
                        var divitem = document.createElement('a');
                        divitem.className = "item";
                        var divimage = document.createElement('div');
                        divimage.className = 'image';
                        var image =  document.createElement('img');
                        image.src = temp.picUrl;
                        var aimage = document.createElement('a');
                        aimage.className = 'like ui corner label';
                        var i = document.createElement('i');
                        i.className = 'like icon';
                        aimage.appendChild(i);
                        divimage.appendChild(image);
                        divimage.appendChild(aimage);										//
                        var content = document.createElement('div');
                        content.className = 'content';
                        var divname = document.createElement('div');
                        divname.className = 'name';
                        divname.textContent= temp.name;
                        var divprice = document.createElement('div');
                        divprice.className = 'name';
                        divprice.textContent= "قیمت : " + temp.price;
                        var acontent = document.createElement('a');
                        acontent.className = 'ui blue button';
                        acontent.textContent = 'اضافه به سبد';
                        acontent.setAttribute("pid",temp.id);
                        content.appendChild(divname);
                        content.appendChild(divprice);
                        content.appendChild(acontent);
                        divitem.appendChild(divimage);
                        divitem.appendChild(content);
                        itemsdiv.appendChild(divitem);
                        document.getElementById('navtabs').appendChild(itemsdiv);

                        $('.ui.blue.button').click(function(){
                            var t = $(this).attr('pid');
                            addCartList(t);
                        });
                    }else{
                        $('.ui.items').show();
                        $('.pagination').show();
                        $('#productsNav').show();
                         var x= $('#uiitemsSearch');
                        if(typeof x !== 'undefined')
                            $('#uiitemsSearch').remove();
                    }
                    function addCartList(e){
				        var ajaxData = {
				            "productId": e
				        };
				        var url1 = "http://webproject.roohy.me/ajax/1/92110465/cart/add";
				        $.ajax({
				            url: url1,
				            type: 'post',
				            dataType: 'json',
				            data: ajaxData,
				            success: function(data, status, xhr){
				                if (data.result == 0){
				                    alert('error add cart');
				                    // Request error
				                }else {
				                    // success
				                    alert('added...');
				                    getCartList();
				                }
				            }
				        })
    				}

                    }
				}

			// ...
		});
    });



/*
    $('#addButton').click(function(){
        addCartList();
    });
*/
});



