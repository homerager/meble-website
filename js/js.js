
$(document).ready(function () {
    $(".scroll-btn").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1200);
    });
	var scroll_start = 0;
	var startchange = $('#startchange');
	var offset = startchange.offset();
	if (startchange.length){
		$(document).scroll(function() { 
			scroll_start = $(this).scrollTop();
			if(scroll_start > offset.top) {
				  $("header").addClass('header-fixed');
			} else {
				 $("header").removeClass('header-fixed');
			}
		});
    }
    $("#home-slider").owlCarousel({
        autoPlay: false,
        items: 1,
        navigation: true,
        navigationText: ["<i class='fa fa-chevron-left' aria-hidden='true'></i>", "<i class='fa fa-chevron-right' aria-hidden='true'></i>"],
        pagination: true,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        transitionStyle: "fadeUp",
        itemsCustom: [[0, 1], [510, 1], [750, 1], [970, 1], [1170, 1]],
    });
    
	$("#our-partners").owlCarousel({
        autoPlay: true,
        items: 6,
        navigation: false,
        navigationText: ["", ""],
        pagination: true,
        itemsDesktop: [1199, 6],
        itemsDesktopSmall: [979, 6],
        transitionStyle: "fadeUp",
        itemsCustom: [[0, 1], [510, 1], [750, 1], [970, 6], [1170, 6]],
    });
	
    var sync1 = $("#main-team-slider");
    var sync2 = $("#sub-team-slider");

    sync1.owlCarousel({
        singleItem: true,
        slideSpeed: 1000,
        navigationText: ["", ""],
        navigation: true,
        pagination: false,
        transitionStyle: "fadeUp",
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
    });

    sync2.owlCarousel({
        items: 6,
        itemsDesktop: [1199, 6],
        itemsCustom: [[0, 1], [510, 2], [750, 3], [970, 5], [1170, 6]],
        itemsDesktopSmall: [979, 10],
        itemsTablet: [768, 8],
        itemsMobile: [479, 4],
        pagination: false,
        responsiveRefreshRate: 100,
        afterInit: function (el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#sub-team-slider")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
        if ($("#sub-team-slider").data("owlCarousel") !== undefined) {
            center(current)
        }
    }

    $("#sub-team-slider").on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo", number);
    });

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                var found = true;
            }
        }

        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }
    }

    $('select').select2();
    $('select').select2({
        minimumResultsForSearch: -1
    });
});