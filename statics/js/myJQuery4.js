/**
 * Created with PyCharm.
 * User: Afshin
 * Date: 11/15/13
 * Time: 12:47 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function (){
    $('#image').click(function(){
        var temp=$(this).attr('src');
        $('#modalImage').attr('src',temp);
    });

    //for spinner
    $(function() {
        $( "#spinner" ).spinner({
            step: 1,
            numberFormat: "n"
        });
        $( "#culture" ).change(function() {
            var current = $( "#spinner" ).spinner( "value" );
        });
    });

    var ajaxData = {};
    var url = "http://webproject.roohy.me/ajax/1/92110465/category/list";
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: ajaxData,
        success: function(data, status, xhr){
            if (data.result == 0){
                alert('error');
                // Request error
            }else {
                // success
                for(var i=0;i<data.categoryList.length;i++){
                    if(typeof data.categoryList[i].parent=="undefined"){
                        // <div class="item" data-value="female">Female</div>
                        var div = document.createElement('div');
                        div.className='item';
                        div.setAttribute('data-value','a'+i);
                        div.setAttribute('style','color:blue; background-color:#eee; font-weight:bold; text-align: center;');
                        div.setAttribute('id',data.categoryList[i].id);
                        div.textContent = data.categoryList[i].name;
                        $('#test').append(div);
                    }
                }
                for(var i=0;i<data.categoryList.length;i++){
                    if(typeof data.categoryList[i].parent==="number"){
                        var div = document.createElement('div');
                        div.className='item';
                        div.setAttribute('data-value','b'+i);
                        div.setAttribute('onclick','selectCat($(this))');
                        div.setAttribute('style','text-align: center;');
                        div.setAttribute('id',data.categoryList[i].id);
                        div.textContent = data.categoryList[i].name;
                        $('#'+data.categoryList[i].parent+'').after(div);
                    }
                }
                $('.ui.selection.dropdown').dropdown() ;
            }
        }
        // ...
    });

    //ajax
    $('#addProduct').click(function(){

        $("#myForm").ajaxSubmit({
            url: "http://webproject.roohy.me/ajax/1/92110465/product/uploadimage",
            type: "POST",
            success: function(data, status, xhr){
                if (data.result == 0){
                    alert(data.error);
                    // Request error
                }else {
                    // success
                    alert('please wait...')
                    var ajaxData = {
                        "name": $('#productName').val(),
                        "description": $('#productDescription').val(),
                        "category": $('#dCat').attr('Cat'),
                        "price": $('#productPrice').val(),
                        "picId":data.picId,
                        "x": $('#x').val(),
                        "y": $('#y').val(),
                        "w": $('#w').val(),
                        "h": $('#h').val()
                    };
                    var url = "http://webproject.roohy.me/ajax/1/92110465/product/add";
                    $.ajax({
                        url: url,
                        type: 'post',
                        dataType: 'json',
                        data: ajaxData,
                        success: function(data, status, xhr){
                            if (data.result == 0){
                                alert(data.error);
                                // Request error
                            }else {
                                // success
                                alert('product added..!')
                            }
                        }
                        // ...
                    });
                }
            }
        })




    });
});
