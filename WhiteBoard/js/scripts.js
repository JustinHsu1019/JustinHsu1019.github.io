$(function () {
    var colors =
        "white;black;red;orange;yellow;green;blue;indigo;purple".split(';');
    var sb = [];
    $.each(colors, function (i, v) {
        sb.push("<div class='option' style='background-color:" + v + "'></div>");
    });
    $("#dPallete").html(sb.join("\n"));

    sb = [];
    for (var i = 10; i <= 15; i += 1)
        sb.push("<div class='option lw'>" +
            "<div style='margin-top:#px;margin-left:#px;width:%px;height:%px'></div></div>"
                .replace(/%/g, i).replace(/#/g, 10 - i / 2));
    $("#dLine").html(sb.join('\n'));
    var $clrs = $("#dPallete .option");
    var $lws = $("#dLine .option");

    $clrs.click(function () {
        $clrs.removeClass("active");
        $(this).addClass("active");
        p_color = this.style.backgroundColor;
        $lws.children("div").css("background-color", p_color);
    }).first().click();

    $lws.click(function () {
        $lws.removeClass("active");
        $(this).addClass("active");
        if ($(this).children("div").css("width").replace("px", "") == 10) {
            p_width = 3;
        }
        else if ($(this).children("div").css("width").replace("px", "") == 11) {
            p_width = 7;
        }
        else if ($(this).children("div").css("width").replace("px", "") == 12) {
            p_width = 17;
        }
        else if ($(this).children("div").css("width").replace("px", "") == 13) {
            p_width = 27;
        }
        else if ($(this).children("div").css("width").replace("px", "") == 14) {
            p_width = 37;
        }
        else if ($(this).children("div").css("width").replace("px", "") == 15) {
            p_width = 100;
        }

    }).eq(0).click();
});
function saveCanvasState() {
    localStorage.clear();
    page_value[count_page] = mycanvas.toDataURL("image/jpg");
    localStorage.setItem("canvasState", JSON.stringify(page_value));
    localStorage.setItem("currentPage", count_page.toString());
}
function mouseDown(e) {
    this.draw = true;
    this.ctx = this.getContext("2d");
    this.ctx.beginPath();
    if (era == false) {
        this.ctx.strokeStyle = document.rossi.pc.value;
        this.ctx.lineWidth = document.rossi.pw.value;
    }
    else {
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 100;
    }

    var o = this;
    this.offsetX = this.offsetLeft;
    this.offsetY = this.offsetTop;

    while (o.offsetParent) {
        o = o.offsetParent;
        this.offsetX += o.offsetLeft;
        this.offsetY += o.offsetTop;
    }
    this.ctx.moveTo(e.pageX - this.offsetX, e.pageY - this.offsetY - window.scrollY);
}
function mouseMove(e) {
    if (this.draw) {
        this.ctx.lineTo(e.pageX - this.offsetX, e.pageY - this.offsetY - window.scrollY);
        this.ctx.stroke();
    }
}
function mouseUp(e) {
    this.draw = false;
    saveCanvasState();
}
function touchStart(e) {
    this.draw = true;
    this.ctx = this.getContext("2d");
    this.touch = e.targetTouches[0];
    this.ctx.beginPath();
    if (era == false) {
        this.ctx.strokeStyle = document.rossi.pc.value;
        this.ctx.lineWidth = document.rossi.pw.value;
    }
    else {
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 100;
    }

    var o = this;
    this.offsetX = this.offsetLeft;
    this.offsetY = this.offsetTop;

    while (o.offsetParent) {
        o = o.offsetParent;
        this.offsetX += o.offsetLeft;
        this.offsetY += o.offsetTop;
    }
    this.ctx.moveTo(this.touch.pageX - this.offsetX, this.touch.pageY - this.offsetY - window.scrollY);
    e.preventDefault();
}
function touchMove(e) {
    this.touch = e.targetTouches[0];
    if (this.draw) {
        this.ctx.lineTo(this.touch.pageX - this.offsetX, this.touch.pageY - this.offsetY - window.scrollY);
        this.ctx.stroke();
    }
    e.preventDefault();
}
function touchEnd(e) {
    this.ctx.stroke();
    this.draw = false;
    e.preventDefault();
    saveCanvasState();
}
function clearPad() {
    var canvas = $('#mycanvas');
    var ctx = canvas[0].getContext("2d");
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    ctx.lineCap = "round";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width(), canvas.height());
    saveCanvasState();
}
var era = false;
function eraserPad() {
    era = true;
}
function penPad() {
    era = false;
}
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}
document.getElementById("fullScreenButton").addEventListener("click", function () {
    toggleFullScreen();
});
window.addEventListener('load', function () {
    if (localStorage.getItem("canvasState")) {
        page_value = JSON.parse(localStorage.getItem("canvasState"));
        count_page = parseInt(localStorage.getItem("currentPage"), 10);
        var canvas = $('#mycanvas');
        var ctx = canvas[0].getContext("2d");
        var imgObject = new Image();
        imgObject.src = page_value[count_page];
        imgObject.addEventListener('load', function () {
            ctx.drawImage(imgObject, 0, 0);
        });
        show_out = count_page + 1;
        document.getElementById("menu_0").innerHTML = show_out.toString() + "/200";
        console.log(count_page + 1);
    }
    var canvas = $('#mycanvas');
    var ctx = canvas[0].getContext("2d");
    ctx.lineCap = "round";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width(), canvas.height());

    canvas[0].addEventListener('mousedown', mouseDown);
    canvas[0].addEventListener('mousemove', mouseMove);
    canvas[0].addEventListener('mouseup', mouseUp);

    canvas[0].addEventListener('touchstart', touchStart);
    canvas[0].addEventListener('touchmove', touchMove);
    canvas[0].addEventListener('touchend', touchEnd);

});
var count_page = 0;
var page_value = [];
for (var pagd = 0; pagd < 200; pagd++) {
    page_value.push('0');
}
var show_out = count_page + 1;
document.getElementById("menu_0").innerHTML = show_out.toString() + "/200";
console.log(count_page + 1);
page_up = function () {
    page_value[count_page] = mycanvas.toDataURL("image/jpg");
    if (count_page != 0) {
        count_page -= 1;
        var canvas = $('#mycanvas');
        var ctx = canvas[0].getContext("2d");
        var imgObject = new Image();
        imgObject.src = page_value[count_page];
        imgObject.addEventListener('load', function () {
            ctx.drawImage(imgObject, 0, 0);
        })
        show_out = count_page + 1;
        document.getElementById("menu_0").innerHTML = show_out.toString() + "/200";
        console.log(count_page + 1);
    }
};
page_down = function () {
    page_value[count_page] = mycanvas.toDataURL("image/jpg");
    if (count_page != 199) {
        count_page += 1;
        if (page_value[count_page] != '0') {
            var canvas = $('#mycanvas');
            var ctx = canvas[0].getContext("2d");
            var imgObject = new Image();
            imgObject.src = page_value[count_page];
            imgObject.addEventListener('load', function () {
                ctx.drawImage(imgObject, 0, 0);
            })
        }
        else {
            var canvas = $('#mycanvas');
            var ctx = canvas[0].getContext("2d");
            ctx.clearRect(0, 0, canvas.width(), canvas.height());
            ctx.lineCap = "round";
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width(), canvas.height());
        }
        show_out = count_page + 1;
        document.getElementById("menu_0").innerHTML = show_out.toString() + "/200";
        console.log(count_page + 1);
    }
};
