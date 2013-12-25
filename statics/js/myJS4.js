/**
 * Created with PyCharm.
 * User: Afshin
 * Date: 11/14/13
 * Time: 7:39 PM
 * To change this template use File | Settings | File Templates.
 */
function cropImage(){
    var inp = document.querySelector("#inputImage");
    var img = document.querySelector("#photo");
    inp.onchange = function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(ev) {
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    };
}

function preview(img, selection) {
    if (!selection.width || !selection.height)
        return;
    $('#x').val(selection.x1);
    $('#y').val(selection.y1);
    $('#w').val(selection.width);
    $('#h').val(selection.height);
}
$(function () {
    $('#photo').imgAreaSelect({ aspectRatio: '16:10', handles: true,
        fadeSpeed: 200, onSelectChange: preview });
});

function selectCat(e){
    var fff=e.attr('id');
    document.getElementById('dCat').setAttribute("Cat",fff);
}