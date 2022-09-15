var sceneMaxSize = $(window).width() * 1;
var selectedTranslateX, selectedTranslateY, selectedRotation, selectedTranslateZ, selectedImage, nextImage,
  prevImage;
var animationFinished = true;
var $dragging         = null;
var firstClickPositionX;
var firstClickPositionY;
var pageWrapperLastPositionX;
var pageWrapperLastPositionY;
var moveX = 0;
var moveY = 0;

var $slide        = $(".slide");
var $body         = $("body");
var $outerWrapper = $(".outer-wrapper");
var $videoPopup   = $(".video-popup");
var owl           = $(".slide");

$("[data-background]").each(function () {
  $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
});

$(".inner-wrapper .slide").each(function (e) {
  var htmlCode;
  if (e === 0) {
    htmlCode = '<div class="item"><a class="active" href="#' + $(this).attr("id") + '">' + (e + 1) +
      '<span style=""></span></a></div>';
  } else {
    htmlCode = '<div class="item"><a href="#' + $(this).attr("id") + '">' + (e + 1) +
      '<span style=""></span></a></div>';
  }
  $(".slider-pager").append(htmlCode);
});

$(".slide:not(.first)").each(function () {
  $(this).attr("data-position-x", randomNumber("position", sceneMaxSize));
  $(this).css("left", $(this).attr("data-position-x") + "px");
  $(this).attr("data-position-y", randomNumber("position", sceneMaxSize));
  $(this).css("top", $(this).attr("data-position-y") + "px");
  $(this).attr("data-position-z", randomNumber("position", 1000));
  $(this).attr("data-rotation", randomNumber("rotation", null));
  $(this).css("transform", "rotateZ(" + $(this).attr("data-rotation") + "deg) translateZ(" + $(this).attr(
    "data-position-z") + "px)");
});

$(".slider-pager a").on("click", function (e) {
  e.preventDefault();
  $(".animate").removeClass("idle");
  play($(this).attr("href"));
});

selectedImage = $(".slide.first")[0];
selectedTranslateX = 0;
selectedTranslateY = 0;

$(".next").on("click", function () {
  $(".animate").removeClass("idle");
  if ($(selectedImage).next().length) {
    nextImage = "#" + $(selectedImage).next()[0].id;
    play(nextImage);
  } else {
    nextImage = "#" + $slide.first()[0].id;
    play(nextImage);
  }
});

$(".prev").on("click", function (e) {
  $(".animate").removeClass("idle");
  e.preventDefault();
  if ($(selectedImage).prev().length) {
    prevImage = "#" + $(selectedImage).prev()[0].id;
    play(prevImage);
  } else {
    prevImage = "#" + $slide.last()[0].id;
    play(prevImage);
  }
});

$slide.on("dragstart", function (event) {
  event.preventDefault();
});

function play(_this) {
  animationFinished = false;
  $body.removeClass("zoomed-out");
  $slide.removeClass("active");
  $(".slider-pager a").removeClass("active");
  $(".slider-pager a[href='" + _this + "']").addClass("active");

  $(".slide.first .main-title").css("opacity", .5);
  $(".slide .image").each(function (e) {
    var $this = $(this);
    setTimeout(function () {
      $this.css("opacity", .5);
    }, e * 40);
  });

  selectedTranslateX = $(_this).attr("data-position-x") * -1;
  selectedTranslateY = $(_this).attr("data-position-y") * -1;
  selectedTranslateZ = $(_this).attr("data-position-z") * -1;
  selectedRotation = $(_this).attr("data-rotation") * -1;
  selectedImage = $(_this);

  $(".inner-wrapper").css({
    'transform': 'translateZ(-' + sceneMaxSize / 1.5 + 'px) translateX(' + selectedTranslateX +
      'px) translateY(' + selectedTranslateY + 'px)'
  });

  selectedImage.addClass("active");
  $(".slide:not(.active)").css("pointer-events", "none");
  $(".slide.active").css("pointer-events", "auto");

  setTimeout(function () {
    $(".slide .image").css("opacity", 0);
    selectedImage.find(".image").css("opacity", 1);
    selectedImage.find(".main-title").css("opacity", 1);
    $(".inner-wrapper").css({
      'transform': 'translateZ(' + selectedTranslateZ + 'px) translateX(' + selectedTranslateX +
        'px) translateY(' + selectedTranslateY + 'px)'
    });
    $outerWrapper.css({
      'transform': 'rotateZ(' + selectedRotation + 'deg)'
    });
  }, 1000);

  setTimeout(function () {
    $(selectedImage).find(".animate").each(function (e) {
      var $this = $(this);
      setTimeout(function () {
        $this.addClass("idle");
      }, e * 100);
    });
    animationFinished = true;
    $(".slide:not(.active) .image").css("opacity", "0");
    $(".slide:not(.active) .main-title").css("opacity", "0");
    $(".slide:not(.active)").addClass("hide-description");
  }, 1500);
}

function randomNumber(method, sceneMaxSize) {
  if (method === "position") {
    return Math.floor(Math.random() * sceneMaxSize) - (sceneMaxSize / 2);
  } else if (method === "rotation") {
    return Math.floor(Math.random() * 90) + 10;
  } else {
    return false;
  }
}

$slide.on("click", function () {
  var _this = "#" + $(this).attr("id");
  if ($body.hasClass("zoomed-out")) {
    play(_this);
  }
});

$(".zoom-out").on("click", function (e) {
  e.preventDefault();
  $(".animate").removeClass("idle");
  $(".inner-wrapper").css("transform", "translateZ(-4000px) translateX(" + selectedTranslateX +
    "px) translateY(" + selectedTranslateY + "px)");
  $outerWrapper.css("transform", "rotateZ(0deg)");
  $body.addClass("zoomed-out");
  $(".slide.first .main-title").css("opacity", .5);
  $(".slide .image").each(function (e) {
    var $this = $(this);
    setTimeout(function () {
      $this.css("opacity", .5);
    }, e * 40);
  });

  pageWrapperLastPositionX = selectedTranslateX;
  pageWrapperLastPositionY = selectedTranslateY;

});

$(document.body).on("mousemove", function (e) {
  if ($body.hasClass("zoomed-out")) {
    if ($dragging) {
      $body.addClass("dragging");
      moveX = pageWrapperLastPositionX + (e.pageX - firstClickPositionX);
      moveY = pageWrapperLastPositionY + (e.pageY - firstClickPositionY);
      $(".inner-wrapper").css("transform", "translateZ(-4000px) translateX(" + moveX + "px) translateY(" +
        moveY + "px)");
    }
  }
});

$(document.body).on("mousedown", ".outer-wrapper", function (e) {
  if ($body.hasClass("zoomed-out")) {
    setTimeout(function () {
      $dragging = $(e.target);
    }, 100);
    firstClickPositionX = e.pageX;
    firstClickPositionY = e.pageY;
    $(".inner-wrapper").css("transition", "0s");
  }
});

$(document.body).on("mouseup", function () {
  $body.removeClass("dragging");
  $dragging = null;
  pageWrapperLastPositionX = moveX;
  pageWrapperLastPositionY = moveY;
  $(".inner-wrapper").css("transition", "1s");
});

$(document.body).on("touchmove", function (e) {
  if ($body.hasClass("zoomed-out")) {
    if ($dragging) {
      $body.addClass("dragging");
      moveX = pageWrapperLastPositionX + (e.originalEvent.touches[0].pageX - firstClickPositionX);
      moveY = pageWrapperLastPositionY + (e.originalEvent.touches[0].pageY - firstClickPositionY);
      $(".inner-wrapper").css("transform", "translateZ(-4000px) translateX(" + moveX + "px) translateY(" +
        moveY + "px)");
    }
  }
});
window.onload = function () {
  var pageWrapper = document.querySelector(".page-wrapper");
  var pozx;
  var pozx1;
  var kontrol;

  pageWrapper.addEventListener("touchstart", function (e) {
    e = e || window.event;
    pozx = e.changedTouches[0].pageX;

  });

  pageWrapper.addEventListener("touchend", function (e) {
    e = e || window.event;
    pozx1 = e.changedTouches[0].pageX;
    kontrol = pozx - pozx1;
    // console.log(kontrol);

    if (kontrol > 50) {
      $(".animate").removeClass("idle");
      if ($(selectedImage).next().length) {
        nextImage = "#" + $(selectedImage).next()[0].id;
        play(nextImage);
      } else {
        nextImage = "#" + $slide.first()[0].id;
        play(nextImage);
      }
    }
    if (kontrol < -50) {
      $(".animate").removeClass("idle");
      e.preventDefault();
      if ($(selectedImage).prev().length) {
        prevImage = "#" + $(selectedImage).prev()[0].id;
        play(prevImage);
      } else {
        prevImage = "#" + $slide.last()[0].id;
        play(prevImage);
      }
    };

  });
}

$(document.body).on("touchstart", ".outer-wrapper", function (e) {
  if ($body.hasClass("zoomed-out")) {
    setTimeout(function () {
      $dragging = $(e.target);
    }, 100);
    firstClickPositionX = e.originalEvent.touches[0].pageX;
    firstClickPositionY = e.originalEvent.touches[0].pageY;
    $(".inner-wrapper").css("transition", "0s");
  }
});

$(document.body).on("touchend", function () {
  $body.removeClass("dragging");
  $dragging = null;
  pageWrapperLastPositionX = moveX;
  pageWrapperLastPositionY = moveY;
  $(".inner-wrapper").css("transition", "1s");
});

setInterval(function () {
  $('.next').click()
}, 30000);