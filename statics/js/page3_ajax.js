/*
 <div class="comment ui stacked segment">
 <a class="avatar" style="float: right; margin-top: 10px">
 <img src="Images/comment1.JPG">
 </a>
 <div class="content">
 <a class="author"><h4>احسان چیزی</h4></a>
 <div class="metadata">
 <span class="date">2 days ago</span>
 </div>
 <div class="text">
 با تقدیم سلام به همه.من به این گوشی علاقه دارم.چون امکاناتی نظیر دوربین 20.7 مگاپیکسلی،صفحه نمایش بزرگ هست.به نظرم باید خوش دست باشه.به نظر شما دوستان این گوشی بهتره یا نوت 2؟کسانی که با این 2 گوشی کار کردن جواب بدن حتما.
 </div>
 <div class="actions">
 <a class="reply">پاسخ</a>
 </div>
 </div>
 </div>
 */

$(document).ready(function () {

    $("#image").click(function () {
        $('#modalImage').attr('src', $(this).attr('src'))
    });
    function getCartList() {
        var ajaxData = {
        };
        var url1 = "http://webproject.roohy.me/ajax/1/92110465/cart/list";
        $.ajax({
            url: url1,
            type: 'post',
            dataType: 'json',
            data: ajaxData,
            success: function (data, status, xhr) {
                if (data.result == 0) {
                    alert('error fetch cartList');
                    // Request error
                } else {
                    // success
                    /*
                     <div class="ui segment" style="margin-top:3%; padding: 0px;">
                     <p style="text-align: center; font-size: 120%;">لیست سبد</p>
                     </div>
                     */

                    var dd = document.getElementById('buyCart');
                    while (dd.firstChild.nextSibling)
                        dd.removeChild(dd.firstChild);

                    var d0 = document.createElement('div');
                    d0.setAttribute("class", "ui segment");
                    d0.setAttribute("style", "margin-top:3%; padding: 0px;");

                    var d1 = document.createElement('p');
                    d1.setAttribute("style", "text-align: center; font-size: 120%;");
                    d1.innerHTML = 'سبد خرید';
                    d0.appendChild(d1);
                    dd.insertBefore(d0, dd.lastChild);

                    for (var i = 0; i < data.cart.length; i++) {
                        var f1 = document.createElement('div');
                        f1.setAttribute("class", "comment ui stacked segment");
                        f1.setAttribute("style", "margin: 5px 0");
                        var f30 = document.createElement('div');
                        f30.setAttribute("style", "float:right; width:60%;");
                        f1.appendChild(f30);
                        var f2 = document.createElement('a');
                        f2.setAttribute("class", "avatar");
                        f2.setAttribute("href", "#");
                        f2.setAttribute("style", "margin: 0px; width:30px; text-decoration: none; color:#5a5");
                        var f3 = document.createElement('img');
                        f3.setAttribute("src", data.cart[i].picUrl);
                        f3.setAttribute("style", " width:50px; float:right; height:60px;");
                        f2.appendChild(f3);
                        f30.appendChild(f2);
                        var f4 = document.createElement('div');
                        f4.setAttribute("class", "content");
                        var f6 = document.createElement('h4');
                        f6.setAttribute("style", "margin:0px 5px; float: right;");
                        f6.innerHTML = data.cart[i].name;
                        f2.appendChild(f6);
                        var f7 = document.createElement('div');
                        f7.setAttribute("class", "metadata");
                        var f8 = document.createElement('span');
                        f8.setAttribute("class", "date");
                        f8.innerHTML = '';
                        f7.appendChild(f8);
                        f4.appendChild(f7);
                        var f9 = document.createElement('div');
                        f9.setAttribute("class", "text");
                        f9.innerHTML = 'قیمت: ' + data.cart[i].price;
                        f4.appendChild(f9);
                        var f10 = document.createElement('div');
                        f10.setAttribute("class", "actions");
                        var f11 = document.createElement('button');
                        f11.setAttribute("class", "ui red button");
                        f11.setAttribute("style", "font-size:50%");
                        f11.setAttribute("id", 'product' + i);
                        f11.setAttribute("pid", data.cart[i].id);
                        f11.innerHTML = 'حذف از سبد';
                        f10.appendChild(f11);
                        f4.appendChild(f10);

                        var f90 = document.createElement('div');
                        f90.setAttribute("style", "clear:both;");
                        f4.appendChild(f90);

                        f1.appendChild(f4);
                        var ff = document.getElementById('buyCart');
                        ff.insertBefore(f1, dd.lastChild);
                    }

                    for (var i = 0; i < data.cart.length; i++) {
                        $('#product' + i + '').click(function () {
                            delFromCart($(this))
                        })
                    }
                    $('.item').click(function () {
                        document.location = "page.html";
                    })
                }
            }
        })

    }

    getCartList();

    function delFromCart(e) {
        var ajaxData = {
            "productId": e.attr('pid')
        };
        var url1 = "http://webproject.roohy.me/ajax/1/92110465/cart/remove";
        $.ajax({
            url: url1,
            type: 'post',
            dataType: 'json',
            data: ajaxData,
            success: function (data, status, xhr) {
                if (data.result == 0) {
                    alert('error delete cart');
                    // Request error
                } else {
                    // success
                    alert('deleted..!');
                    getCartList();

                }
            }
        })
    }

    function addCartList() {
        var ajaxData = {
            "productId": 5
        };
        var url1 = "http://webproject.roohy.me/ajax/1/92110465/cart/add";
        $.ajax({
            url: url1,
            type: 'post',
            dataType: 'json',
            data: ajaxData,
            success: function (data, status, xhr) {
                if (data.result == 0) {
                    alert('error add cart');
                    // Request error
                } else {
                    // success
                    alert('added');
                    getCartList();
                }
            }
        })
    }

    $('#addButton').click(function () {
        addCartList()
    });

    var ajaxData = {
    };
    var url = "http://webproject.roohy.me/ajax/1/92110465/comment/list";
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: ajaxData,
        success: function (data, status, xhr) {
            if (data.result == 0) {
                alert('error fetch comment');
                // Request error
            } else {
                // success
                for (var i = 0; i < data.commentList.length; i++) {

                    var f1 = document.createElement('div');
                    f1.setAttribute("class", "comment ui stacked segment");
                    var f2 = document.createElement('a');
                    f2.setAttribute("class", "avatar");
                    f2.setAttribute("style", "float: right; margin-top: 10px");
                    var f3 = document.createElement('img');
                    f3.setAttribute("src", "Images/comment1.JPG");
                    f2.appendChild(f3);
                    f1.appendChild(f2);
                    var f4 = document.createElement('div');
                    f4.setAttribute("class", "content");
                    var f5 = document.createElement('a');
                    f5.setAttribute("class", "author");
                    var f6 = document.createElement('h4');
                    f6.innerHTML = data.commentList[i].name;
                    f5.appendChild(f6);
                    f4.appendChild(f5);
                    var f7 = document.createElement('div');
                    f7.setAttribute("class", "metadata");
                    var f8 = document.createElement('span');
                    f8.setAttribute("class", "date");
                    f8.innerHTML = 'now';
                    f7.appendChild(f8);
                    f4.appendChild(f7);
                    var f9 = document.createElement('div');
                    f9.setAttribute("class", "text");
                    f9.innerHTML = data.commentList[i].message;
                    f4.appendChild(f9);
                    var f10 = document.createElement('div');
                    f10.setAttribute("class", "actions");
                    var f11 = document.createElement('a');
                    f11.setAttribute("class", "reply");
                    f11.innerHTML = 'پاسخ';
                    f10.appendChild(f11);
                    f4.appendChild(f10);
                    f1.appendChild(f4);

                    var ff = document.getElementById('commentBox');
                    var fd = document.getElementById('addBox');
                    ff.insertBefore(f1, fd);
                }
            }
        }
        // ...
    });
});


