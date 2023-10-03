$(document).ready(function () {
    $("meta[name='viewport']").attr('content', "width=device-width, minimum-scale=1.0, maximum-scale=1");
    $("#pop").css("display", "none");
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    document.getElementById('mycanvas').width = document.documentElement.scrollWidth * 1.5;
    document.getElementById('mycanvas').height = document.documentElement.scrollHeight * 1.5;
});