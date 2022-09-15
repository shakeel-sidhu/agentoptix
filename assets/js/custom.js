$(document).ready(function() {




    $('.price-services a[href^="#"]').click(function(e) {

        $('html,body').animate({
            scrollTop: jQuery(this.hash).offset().top - 90
        }, 1000);

        return false;

        e.preventDefault();

    });


    $(".header-right nav ul > li a").filter(function() {
        return this.href == location.href.replace(/#.*/, "");
    }).addClass("active");




    $(function() {
        var filterList = {
            init: function() {
                $('#latest-endeavors').mixItUp({
                    selectors: {
                        target: '.endeavors',
                        filter: '.filter'
                    },
                    load: {
                        filter: '.websites'
                    }
                });

            }

        };
        filterList.init();
    });




    // submenu arrow js
    var wid = $(window).width();
    if (wid <= 767) {
        $("nav ul > li").each(function(index) {
            if ($(this).has("ul").length) {
                $(this).find('ul').addClass('drop');
                $(this).find('> a').after('<span class="menu-arrow"></span>');
                $(this).find('> .drop').css('display', 'none');
            }
        });
    }


    $('.menu-arrow').click(function() {
        var catSubUl = $(this).parent().find('.drop');
        if (catSubUl.is(':hidden')) {
            $("nav ul .drop").slideUp();
            catSubUl.slideDown();
            $('.menu-arrow').removeClass('active');
            $(this).addClass('active');
        } else {
            catSubUl.slideUp();
            $(this).removeClass('active');
        }
    });
    // submenu arrow js end

    /*
    $('.m-list li#media-list:odd,.m-list li.media-list-tour:odd').each(function() {
        $(this).find('.company-info').hide();
        var gethtml = $(this).find('.company-info').html();
        $(this).append('<div class="company-info">' + gethtml + '</div>');
    });
    */

    $('.m-list li#media-list:odd,.m-list li.media-list-tour:odd').each(function() {
        $(this).addClass('set-left');
    });

    // media page list image link

    $('.m-list li').each(function() {
        var tour_list = $(this).find('.tour-list > a').attr('href');
        if (tour_list) {
            $(this).find('.link-tour').attr('href', tour_list);
        }
    });


    $('.m-list li').each(function() {
        var floor_list = $(this).find('.2d-floor-list > a').attr('href');
        if (floor_list) {
            $(this).find('.link-floorplan').attr('href', floor_list);
        }
    });


    $('.m-list li').each(function() {
        var aerial_photo = $(this).find('.aerial-photo-list > a').attr('href');
        if (aerial_photo) {
            $(this).find('.link-photo-aerial').attr('href', aerial_photo);
        }
    });
    $('.m-list li').each(function() {
        var photo_list = $(this).find('.photo-list > a').attr('href');
        if (photo_list) {
            $(this).find('.link-photo-list').attr('href', photo_list);
        }
    });
    $('.m-list li').each(function() {
        var tour_arial_list = $(this).find('.tour-arial-list > a').attr('href');
        if (tour_arial_list) {
            $(this).find('.link-tour-list').attr('href', tour_arial_list);
        }
    });
    $('.m-list li').each(function() {
        var hd_video_list = $(this).find('.hd-video-list > a').attr('href');
        if (hd_video_list) {
            $(this).find('.link-hdvideo-list').attr('href', hd_video_list);
        }
    });

    $('.m-list li').each(function() {
        var aerial_video_list = $(this).find('.aerial-video-list > a').attr('href');
        if (aerial_video_list) {
            $(this).find('.link-arialvideo-list').attr('href', aerial_video_list);
        }
    });




    $('#lightgallery').lightGallery({
        thumbnail: true,
        animateThumb: true,
        showThumbByDefault: true
    });

    //blog start
    $('.bloglist-item:first-child').addClass('unwrap-class');
    $('.unwrap-class').unwrap();
    $('.blog-detail-content').unwrap();

    function cutString(s, n) {
        var cut = s.indexOf(' ', n);
        if (cut == -1) return s;
        return s.substring(0, cut)
    }

    $('.blog-list .bloglist-item').each(function() {
        var des = $(this).find('.discriptionfull').html();
        var s = des;
        var st = cutString(s, 300);
        $(this).find('.discription').append(st + '...');
    });
    // $(".common-blog .bloglist-item:nth-child(3n)").after('<div class="clearfix"></div>');
    var divs = $(".bloglist-item");
    for (var i = 0; i < divs.length; i += 3) {
        divs.slice(i, i + 3).wrapAll("<div class='row'></div>");
    }
    //blog end

    var owl = $("#site-design-slider");
    owl.owlCarousel({
        navigation: false, // Show next and prev buttons
        items: 3, //10 items above 1000px browser width
        loop: true,
        slideSpeed: 4000,
        responsiveClass:true,
        autoplay: 4000,
        autoplayTimeout: 4000,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            767:{
                items:1,
                nav:false
            },
            1000:{
                items:1,
                nav:true,
                loop:true
            }
        }
    });


    $('.cs-page-slider').owlCarousel({
        center: true,
        items: 3,
        loop: true,
        margin: 10,

    });


    $('.digital-strategy-list li a.heading').click(function() {
        $('.digital-strategy-list li.current').removeClass('current');
        $(this).closest('li').addClass('current');
    });


   $(".mobi-menu").click(function() {
        $("header .header-right").addClass("open");
		$("body").addClass("noscroll");
    });

    $("header .header-right a.exit").click(function() {
        $("header .header-right").removeClass("open");
		$("body").removeClass("noscroll");
    });


    $(".hd-video-btn").click(function() {
        $(".hd-video-container").addClass("active");
        $(this).addClass("active");

        $(".hd-photography-btn").removeClass("active");
        $(".hd-photography-container").removeClass("active");
    });

    $(".hd-photography-btn").click(function() {
        $(".hd-photography-container").addClass("active");
        $(this).addClass("active");

        $(".hd-video-btn").removeClass("active");
        $(".hd-video-container").removeClass("active");
    });




    // Block animation
    AOS.init({
        easing: 'ease-in-out-sine',
        disable: 'mobile'
    });


    $(window).scroll(function() {
        AOS.refreshHard();
    });



    /*-- back to top -- */

    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function() {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration);
    });

    $('.down-arrow-cls > a').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
        return false;
    })




    var wid = $(window).width();
    if (wid <= 767) {
      $('.client-logos').owlCarousel({
          dots: false,
          autoplay: true,
          autoplayTimeout: 5000,
          slideSpeed: 300,
          paginationSpeed: 400,
          items:2,
          lazyLoad: true,
          loop: true,
          margin:15,

      });

    }


    // Client Logo
    $('.client-logos').owlCarousel({
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 7,
        lazyLoad: true,
        loop: true,
        margin: 50,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 4
            },
            1000: {
                items: 6
            },
            1600: {
                items: 7
            }
        }
    })









    // Happy Clients
    $('.testimonial').owlCarousel({
        navigation: false, // Show next and prev buttons
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 1,
        lazyLoad: true,
        loop: true,
        margin: 0,
    })


    // Counters
    $('.num-counters').counterUp({
        delay: 20,
        time: 2500
    });




    $('.getinfo-m').click(function() {
        $('#matthew').slideDown();
        $('#paul').slideUp();

    });
    $('.getinfo-p').click(function() {
        $('#matthew').slideUp();
        $('#paul').slideDown();
    });



    $(".strategy-list li a").click(function(e) {
        e.preventDefault();
        if ($(this).find('.more-content').is(":visible")) {
            $(this).find('.more-content').slideUp();
            $(this).find('span.more').text("read more");
        } else {
            $('span.more').text("read more");
            $('.more-content').slideUp();
            $(this).find('.more-content').slideDown();
            $(this).find('span.more').text("show less");
        }
    });




});




/*-- Preloader -- */
$(window).load(function() {
    preloaderFadeOutTime = 200;

    function hidePreloader() {
        var preloader = $('.spinner-wrapper');
        preloader.fadeOut(preloaderFadeOutTime);
    }
    hidePreloader();


	
    var owl = $("#mb-slider");

    owl.owlCarousel({
        navigation: false, // Show next and prev button
        items: 1, //10 items above 1000px browser width
        loop: true,
        slideSpeed: 4000,
        autoplay: 4000,
        autoplayTimeout: 4000,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true,
            },
            767:{
                items:1,
                nav:false,
            },
            1000:{
                items:1,
                nav:true,
                loop:true,
            }
        }
    });

});



(function() {
    var rotate, timeline;

    rotate = function() {
        return $('.card:first-child').fadeOut(100, 'swing', function() {
            return $('.card:first-child').appendTo('.site-page-slide').hide();
        }).fadeIn(100, 'swing');
    };

    timeline = setInterval(rotate, 2400);

    $('body').hover(function() {
        return clearInterval(timeline);
    });

    $('.card').click(function() {
        return rotate();
    });

}).call(this);
$(window).load(function() {
    $('.home-slider').owlCarousel({
        navigation: false, // Show next and prev buttons
        dots: false,
        autoplay: true,
        autoplayTimeout: 40000,
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 1,
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsMobile: false,
        lazyLoad: true
    })
    $('#footer-ig-stream').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1

    });


});
$(window).on('shown.bs.modal', function() {
   setTimeout(function() {$('#thank-you').modal('hide');}, 12000);
});

 $('ul.m-list li#media-list:odd').addClass('odd');
 $('ul.m-list li#media-list:even').addClass('even');


  //--======== portfolio.html/javascript ========-->



  //--======== Main Slider ========-->

$('.owl-carousel.banner-text-owl').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplay:false,

    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:3
        }
    }
})

  //--======== Related-Project-owl ========-->

  $('.owl-carousel.related-project-owl').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
 

    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:4
        }
    }
})

  //--======== porfolio-banner-fancybox ========-->

  $('[data-fancybox]').fancybox({
	buttons: [
        "zoom",
        // "share",
        "slideShow",
        "fullScreen",
        // "download",
        "thumbs",
        "close"
      ],
});