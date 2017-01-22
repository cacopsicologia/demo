/* Theme Name: The Project - Responsive Website Template
 * Author:HtmlCoder
 * Author URI:http://www.htmlcoder.me
 * Author e-mail:htmlcoder.me@gmail.com
 * Version:1.2.0
 * Created:March 2015
 * License URI:http://support.wrapbootstrap.com/
 * File Description: Initializations of plugins
 */

(function($){
	$(document).ready(function(){

		if ($('.boxed .fullscreen-bg').length>0) {
			$("body").addClass("transparent-page-wrapper");
		};

		$(window).load(function() {
			$("body").removeClass("no-trans");
		});
		// Enable Smooth Scroll only on Chrome and only on Win and Linux Systems
		var platform = navigator.platform.toLowerCase();
		if ((platform.indexOf('win') == 0 || platform.indexOf('linux') == 0) && !Modernizr.touch) {
			if ($.browser.webkit) {
				$.webkitSmoothScroll();
				console.log("hello webkit");
			}
		};
		//Show dropdown on hover only for desktop devices
		//-----------------------------------------------
		var delay=0, setTimeoutConst;
		if ((Modernizr.mq('only all and (min-width: 768px)') && !Modernizr.touch) || $("html.ie8").length>0) {
			$('.main-navigation:not(.onclick) .navbar-nav>li.dropdown, .main-navigation:not(.onclick) li.dropdown>ul>li.dropdown').hover(
			function(){
				var $this = $(this);
				setTimeoutConst = setTimeout(function(){
					$this.addClass('open').slideDown();
					$this.find('.dropdown-toggle').addClass('disabled');
				}, delay);

			},	function(){
				clearTimeout(setTimeoutConst );
				$(this).removeClass('open');
				$(this).find('.dropdown-toggle').removeClass('disabled');
			});
		};

		//Show dropdown on click only for mobile devices
		//-----------------------------------------------
		if (Modernizr.mq('only all and (max-width: 767px)') || Modernizr.touch || $(".main-navigation.onclick").length>0 ) {
			$('.main-navigation [data-toggle=dropdown], .header-top [data-toggle=dropdown]').on('click', function(event) {
			// Avoid following the href location when clicking
			event.preventDefault();
			// Avoid having the menu to close when clicking
			event.stopPropagation();
			// close all the siblings
			$(this).parent().siblings().removeClass('open');
			// close all the submenus of siblings
			$(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
			// opening the one you clicked on
			$(this).parent().toggleClass('open');
			});
		};

		//Transparent Header Calculations
		var timer_tr;
		if ($(".transparent-header").length>0) {
			$(window).load(function() {
				trHeaderHeight = $("header.header").outerHeight();
				$(".transparent-header .tp-bannertimer").css("marginTop", (trHeaderHeight)+"px");
			});
			$(window).resize(function() {
				if ($(this).scrollTop()  < headerTopHeight + headerHeight -5) {
					trHeaderHeight = $("header.header").outerHeight();
					$(".transparent-header .tp-bannertimer").css("marginTop", (trHeaderHeight)+"px");
				}
			});
			$(window).scroll(function() {
				if ($(this).scrollTop() == 0 ) {
					if(timer_tr) {
						window.clearTimeout(timer_tr);
					};
					timer_tr = window.setTimeout(function() {
						trHeaderHeight = $("header.header").outerHeight();
						$(".transparent-header .tp-bannertimer").css("marginTop", (trHeaderHeight)+"px");
					}, 300);
				};
			});
		}

		//Full Page
		if ($(".fullpage-site").length>0) {
			$('.fullpage-site').fullpage({
				anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage'],
				navigation: true,
				navigationPosition: 'right',
				navigationTooltips: ['Intro', 'About', 'Portfolio', 'Clients', 'Contact Us'],
				fixedElements: '.header-container, .subfooter',
				responsiveWidth: 992,
				responsiveHeight: 600,
			});
		};

		// Fixed header
		//-----------------------------------------------
		headerTopHeight = $(".header-top").outerHeight(),
		headerHeight = $("header.header.fixed").outerHeight();
		$(window).resize(function() {
			if(($(this).scrollTop() < headerTopHeight + headerHeight -5 ) && ($(window).width() > 767)) {
				headerTopHeight = $(".header-top").outerHeight(),
				headerHeight = $("header.header.fixed").outerHeight();
			}
		});

		$(window).scroll(function() {
			if (($(".header.fixed:not(.fixed-before)").length > 0)  && !($(".transparent-header .slideshow").length>0)) {
				if (($(this).scrollTop() > headerTopHeight + headerHeight) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
					$(".header.fixed:not(.fixed-before)").addClass('animated object-visible fadeInDown');
					$(".header-container").css("paddingBottom", (headerHeight)+"px");
				} else {
					$("body").removeClass("fixed-header-on");
					$(".header-container").css("paddingBottom", (0)+"px");
					$(".header.fixed:not(.fixed-before)").removeClass('animated object-visible fadeInDown');
				}
			} else if ($(".header.fixed:not(.fixed-before)").length > 0) {
				if (($(this).scrollTop() > headerTopHeight + headerHeight) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
					$(".header.fixed:not(.fixed-before)").addClass('animated object-visible fadeInDown');
				} else {
					$("body").removeClass("fixed-header-on");
					$(".header.fixed:not(.fixed-before)").removeClass('animated object-visible fadeInDown');
				}
			};
		});

		$(window).scroll(function() {
			if (($(".header.fixed.fixed-before").length > 0)  && !($(".transparent-header .slideshow").length>0)) {
				if (($(this).scrollTop() > headerTopHeight) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
					$(".header.fixed.fixed-before").addClass('object-visible');
					$(".header-container").css("paddingBottom", (headerHeight)+"px");
				} else {
					$("body").removeClass("fixed-header-on");
					$(".header-container").css("paddingBottom", (0)+"px");
					$(".header.fixed.fixed-before").removeClass('object-visible');
				}
			} else if ($(".header.fixed.fixed-before").length > 0) {
				if (($(this).scrollTop() > headerTopHeight) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
					$(".header.fixed.fixed-before").addClass('object-visible');
				} else {
					$("body").removeClass("fixed-header-on");
					$(".header.fixed.fixed-before").removeClass('object-visible');
				}
			};
		});

		// Affix Menu
		//-----------------------------------------------
		if ($(".affix-menu").length>0) {
			setTimeout(function () {
				var $sideBar = $('.sidebar')

				$sideBar.affix({
					offset: {
						top: function () {
							var offsetTop = $sideBar.offset().top
							return (this.top = offsetTop - 65)
						},
						bottom: function () {
							var affixBottom = $(".footer").outerHeight(true) + $(".subfooter").outerHeight(true)
							if ($(".footer-top").length>0) {
								affixBottom = affixBottom + $(".footer-top").outerHeight(true)
							}
							return (this.bottom = affixBottom+50)
						}
					}
				})
			}, 100)
		}

		//Scroll Spy
		//-----------------------------------------------
		if($(".scrollspy").length>0) {
			$("body").addClass("scroll-spy");
			if($(".fixed.header").length>0) {
				$('body').scrollspy({
					target: '.scrollspy',
					offset: 85
				});
			} else {
				$('body').scrollspy({
					target: '.scrollspy',
					offset: 20
				});
			}
		}

		//Smooth Scroll
		//-----------------------------------------------
		if ($(".smooth-scroll").length>0) {
			if(($(".header.fixed").length>0) && (Modernizr.mq('only all and (min-width: 768px)'))) {
				$('.smooth-scroll a, a.smooth-scroll').click(function() {
					if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
						if (target.length) {
							$('html,body').animate({
								scrollTop: target.offset().top-63
							}, 0);
							return false;
						}
					}
				});
			} else {
				$('.smooth-scroll a, a.smooth-scroll').click(function() {
					if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
						var target = $(this.hash);
						target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
						if (target.length) {
							$('html,body').animate({
								scrollTop: target.offset().top
							}, 1000);
							return false;
						}
					}
				});
			}
		}

		// Offcanvas side navbar
		//-----------------------------------------------
		if ($("#offcanvas").length>0) {
			$('#offcanvas').offcanvas({
				canvas: "body",
				disableScrolling: false,
				toggle: false
			});
		};

		if ($("#offcanvas").length>0) {
			$('#offcanvas [data-toggle=dropdown]').on('click', function(event) {
			// Avoid following the href location when clicking
			event.preventDefault();
			// Avoid having the menu to close when clicking
			event.stopPropagation();
			// close all the siblings
			$(this).parent().siblings().removeClass('open');
			// close all the submenus of siblings
			$(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
			// opening the one you clicked on
			$(this).parent().toggleClass('open');
			});
		};

		//This will prevent the event from bubbling up and close the dropdown when you type/click on text boxes (Header Top).
		//-----------------------------------------------
		$('.header-top .dropdown-menu input').click(function(e) {
			e.stopPropagation();
		});

	}); // End document ready

})(this.jQuery);

if (jQuery(".btn-print").length>0) {
	function print_window() {
		var mywindow = window;
		mywindow.document.close();
		mywindow.focus();
		mywindow.print();
		mywindow.close();
	}
}