/**
 * Created with PyCharm.
 * User: Afshin
 * Date: 11/14/13
 * Time: 7:39 PM
 * To change this template use File | Settings | File Templates.
 */
function changeImage(index){
    var brs=document.getElementsByClassName('borderR');
    var i=document.getElementById('image');
    var t= i.src;
    i.src=brs[index].src;
    brs[index].src= t;
}

$(document).ready(function (){
    $('#image').click(function(){
        var temp=$(this).attr('src');
        $('#modalImage').attr('src',temp);
    });
    $('.ui.modal').modal('attach events', '#image', 'show');

    $('.ui.star.rating')
        .rating('enable')
    ;



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
    $('.ui.checkbox').checkbox();
});


function addComment(){
    var c=document.getElementById('addCommentBox');
    var ca=document.getElementById('commentAuthor');

    var f1=document.createElement('div');
    f1.setAttribute("class","comment ui stacked segment");
    var f2=document.createElement('a');
    f2.setAttribute("class","avatar");
    f2.setAttribute("style","float: right; margin-top: 10px");
    var f3=document.createElement('img');
    f3.setAttribute("src","Images/comment1.JPG");
    f2.appendChild(f3);
    f1.appendChild(f2);
    var f4=document.createElement('div');
    f4.setAttribute("class","content");
    var f5=document.createElement('a');
    f5.setAttribute("class","author");
    var f6=document.createElement('h4');
    if(ca.value)f6.innerHTML=ca.value;
    else f6.innerHTML='ناشناس';
    f5.appendChild(f6);
    f4.appendChild(f5);
    var f7=document.createElement('div');
    f7.setAttribute("class","metadata");
    var f8=document.createElement('span');
    f8.setAttribute("class","date");
    f8.innerHTML='now';
    f7.appendChild(f8);
    f4.appendChild(f7);
    var f9=document.createElement('div');
    f9.setAttribute("class","text");
    f9.innerHTML= c.value;
    f4.appendChild(f9);
    var f10=document.createElement('div');
    f10.setAttribute("class","actions");
    var f11=document.createElement('a');
    f11.setAttribute("class","reply");
    f11.innerHTML='پاسخ';
    f10.appendChild(f11);
    f4.appendChild(f10);
    f1.appendChild(f4);

    var ff=document.getElementById('commentBox');
    var fd=document.getElementById('addBox');
    ff.insertBefore(f1,fd);
    c.value='';
    ca.value='';
}
