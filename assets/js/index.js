import '../scss/index.scss';
import 'bootstrap';
import $ from 'jquery';
import lightGallery from 'lightgallery';
import selectric from 'selectric';
require('./products');
require('./tips');
require('./file-uploader');
require('jquery-mask-plugin').default;
import { CountUp } from 'countup.js';
import Swiper from 'swiper';

$(function() {

	$('.c-breadcrumbs__list').scrollLeft(1000);

	var totalPrices = [];
	var CountUpOptions = {
		separator: ' ',
		duration: 0
	};

	 // $('.c-table_basket .c-product-card').each(function(index, item){
	 // 	var elName = "product-card-total-" + (index + 1);
	 // 	var elNameMobile = "product-card-total-mobile-" + (index + 1);
	 // 	new CountUp(elName, 0, {duration: 0});
	 // 	new CountUp(elNameMobile, 0, {duration: 0});
	 // })


	var mainTotalPrice = new CountUp('main-total-price', 0,0,0,0, CountUpOptions);
	var mainTotalPriceNew = new CountUp('main-total-price-new', 0,0,0,0, CountUpOptions);
	var mainTotalPriceFixed = new CountUp('main-total-price-fixed', 0,0,0,0, CountUpOptions);
	var mainTotalPriceFixedNew = new CountUp('main-total-price-fixed-new', 0,0,0,0, CountUpOptions);



	$(".c-number-counter__field").on('input', function(e){
		if(!$(this).val()) {
			$(this).val(0);
			return;
		}else if(+$(this).val() > 99){
			$(this).val(99);
			return;
		}
	})

	$('.c-number-counter__field').each(function(index, item){
		if($(item).val()){
			var parent = $(this).parents('.c-product-card');
			var field = $(this);
			var discountPercents = $('.js-basket-discount').attr('data-discount-percent');
			var price = +parent.find('.c-product-card__cost').eq(0).text();
			parent.find('.c-product-card__total').attr('data-total', +field.val() * price);
			new CountUp(parent.find('.c-product-card__total:visible').attr('id').replace('#', ''), +field.val() * price, {duration: 0, separator: ' '}).start();
	 		new CountUp(parent.find('.c-product-card__total:visible').attr('id').replace('#', '') + '-mobile', +field.val() * price, {duration: 0, separator: ' '}).start();
			// totalPrices[parent.find('.c-product-card__total:visible').attr('id').replace('#', '')].update(+field.val() * price);
			var totalPrice = 0;
			$('.c-table_basket .c-product-card').each(function(index, item){
				item = $(item).find('.c-product-card__total').eq(0);
				if(!$(item).attr('data-total')) return;
				totalPrice += +$(item).attr('data-total');
			});
			new CountUp('main-total-price', totalPrice, {duration: 0, separator: ' '}).start();
			new CountUp('main-total-price-new', totalPrice - ((totalPrice * discountPercents) / 100), {duration: 0, separator: ' '}).start();

		}
	})

	$('.c-number-counter__field').change(function(){
		var parent = $(this).parents('.c-product-card');
		var field = $(this);
		var discountPercents = $('.js-basket-discount').attr('data-discount-percent');
		var price = +parent.find('.c-product-card__cost').eq(0).text();
		parent.find('.c-product-card__total').attr('data-total', +field.val() * price);
		// totalPrices[parent.find('.c-product-card__total:visible').attr('id').replace('#', '')].update(+field.val() * price);
		new CountUp(parent.find('.c-product-card__total:visible').attr('id').replace('#', ''), +field.val() * price, {separator: ' '}).start();
		new CountUp(parent.find('.c-product-card__total:visible').attr('id').replace('#', '') + '-mobile', +field.val() * price, {separator: ' '}).start();
		var totalPrice = 0;
		$('.c-table_basket .c-product-card').each(function(index, item){
			item = $(item).find('.c-product-card__total').eq(0);
			if(!$(item).attr('data-total')) return;
			totalPrice += +$(item).attr('data-total');
		});
		new CountUp('main-total-price', totalPrice, {separator: ' '}).start();
		new CountUp('main-total-price-new', totalPrice - ((totalPrice * discountPercents) / 100), {separator: ' '}).start();
	});


	$(".c-number-counter__action_down").click(function(){
		var field = $(this).parent().find('.c-number-counter__field');
		if(+field.val() <= 0) return;
		field.val(+field.val() - 1);
		var parent = $(this).parents('.c-product-card');
		var discountPercents = $('.js-basket-discount').attr('data-discount-percent');
		var price = +parent.find('.c-product-card__cost').eq(0).text();
		parent.find('.c-product-card__total').attr('data-total', +field.val() * price);
		new CountUp(parent.find('.c-product-card__total:visible').attr('id').replace('#', ''), +field.val() * price, {separator: ' '}).start();
		new CountUp(parent.find('.c-product-card__total:visible').attr('id').replace('#', '') + '-mobile', +field.val() * price, {separator: ' '}).start();
		var totalPrice = 0;
		$('.c-table_basket .c-product-card').each(function(index, item){
			item = $(item).find('.c-product-card__total').eq(0);
			if(!$(item).attr('data-total')) return;
			totalPrice += +$(item).attr('data-total');
		})
		new CountUp('main-total-price', totalPrice, {separator: ' '}).start();
		new CountUp('main-total-price-new', totalPrice - ((totalPrice * discountPercents) / 100), {separator: ' '}).start();
	})

	$(".c-number-counter__action_up").click(function(){
		var field = $(this).parent().find('.c-number-counter__field');

		field.val(+field.val() + 1);
		var parent = $(this).parents('.c-product-card');
		var discountPercents = $('.js-basket-discount').attr('data-discount-percent');
		var price = parseInt(parent.find('.c-product-card__cost').eq(0).text());
		parent.find('.c-product-card__total').attr('data-total', +field.val() * price);

		new CountUp(parent.find('.c-product-card__total:visible').attr('id').replace('#', ''), +field.val() * price, {separator: ' '}).start();
		new CountUp(parent.find('.c-product-card__total:visible').attr('id').replace('#', '') + '-mobile', +field.val() * price, {separator: ' '}).start();

		var totalPrice = 0;
		$('.c-table_basket .c-product-card').each(function(index, item){
			item = $(item).find('.c-product-card__total').eq(0);
			if(!$(item).attr('data-total')) return;
			totalPrice += +$(item).attr('data-total');
		});

		new CountUp('main-total-price', totalPrice, {separator: ' '}).start();
		new CountUp('main-total-price-new', totalPrice - ((totalPrice * discountPercents) / 100), { separator: ' '}).start();
	})

	$('.js-order-checkout-expand-close').click(function(e){
		e.preventDefault();
		$('.js-product-order-checkout-static .c-product__order-checkout-top').collapse({
		  toggle: false
		})
	})

	$('.js-dropdown-filters').click(function(){
		$(this).parent().find('.c-dropdown__menu').show();
	})

	$('.js-dropdown-filters-close').click(function(){
		$(this).parent().hide();
	})

	/* Breadcrumbs dropdown */
	$(function(){
		var dropdownToggled = false;
		$('.js-breadcrumb-dropdown').click(function(e){
			e.preventDefault()
			var parent = $(this).parents('.c-breadcrumbs');
			var dropdownId = $(this).attr("href");
			var dropdownMenu = parent.find('#' + dropdownId);
			if(dropdownToggled){
				dropdownToggled = false;
				dropdownMenu.removeClass('show');
				return true;
			}
			dropdownMenu.addClass('show');
			dropdownToggled = true;
			var leftPos = $(this).position().left;
			dropdownMenu.css({'left': leftPos + "px"});
		})
	})


	$('.js-navbar-product-remove').click(function(){
		$(this).parents('.c-navbar-product').remove();
	})

	$('.js-navbar-btn').hover(function(){
		$(this).dropdown('toggle');
	}, function(){
		$(this).dropdown('toggle');
	})


	 $(window).scroll(function() {
	 	if($('.s-basket__total-info_static').length && $(window).scrollTop() > ($('.s-basket__total-info_static').height() + $('.s-basket__total-info_static').offset().top)){
	 		$('.s-basket__total-info_fixed').show();
	 	}else{
	 		$('.s-basket__total-info_fixed').hide();
	 	}
	 	if($(window).scrollTop() > $('.c-navbar-unscrolled').height()){
	 		if(!$('.c-navbar-scrolled').show()) $('.c-navbar-scrolled').show(); 
	 	}else{
	 		$('.c-navbar-scrolled').hide(); 
	 	}
	 	
	 })

	$('.c-load-more').on('click', function(e){
		e.preventDefault();
		$(this).addClass('is-loading');
	})
	
	$(".js-show-filtered-products").click(function(e){
		e.preventDefault();
        if (!$('.c-tip_filter').is(':hidden')) {
            $('.c-tip_filter').hide();
        }
		$('.c-filtered-products__body .row').html('');
		var products = '';
		var product = $('<div>').addClass('col-6 col-lg-4');
		product.html(`<div class="c-filtered-product"><div class="c-filtered-product__image"><img src="img/content/filtered-product.jpg" alt="">
              <div class="c-filtered-product__label"><span class="c-filtered-product__label-txt">5 вариантов модели</span></div>
            </div>
            <div class="c-filtered-product__body">
              <div class="d-block text-center pr-3 pl-3 mb-3"><a class="c-filtered-product__link" href="#">ванна акриловая riho Line ADIGE ADI -LVM25-CRM</a></div>
              <div class="d-flex justify-content-between mb-2">
                <div class="c-filtered-product__availability c-filtered-product__availability_true d-flex align-items-center"><img src="img/icons/check-success.png" alt=""><span>В наличии</span></div>
                <div class="c-filtered-product__price">13 400</div>
              </div>
              <div class="c-filtered-product__code mb-2">Код товара: 1234566JL</div>
              <div class="d-flex flex-column align-items-center">
                <div class="mb-2">Размер: 1500х700</div>
                <div class="d-flex align-items-center mb-2">Цвет профиля:
                  <div class="d-inline d-lg-none ml-2">черный, серый</div>
                  <div class="d-none d-lg-block dropdown c-dropdown c-dropdown_link c-filtered-product__dropdown">
                    <div class="dropdown-toggle c-dropdown-toggle" data-toggle="dropdown" data-flip="false">
                      <div class="c-dropdown-toggle__link">2 варианта</div>
                    </div>
                    <div class="dropdown-menu c-dropdown__menu">
                      <ul>
                        <li> <a href="#">Серый </a></li>
                        <li> <a href="#">Розовый</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center mb-2">Цвет стекла:
                  <div class="d-inline d-lg-none ml-2">черный, серый</div>
                  <div class="d-none d-lg-block dropdown c-dropdown c-dropdown_link c-filtered-product__dropdown">
                    <div class="dropdown-toggle c-dropdown-toggle" data-toggle="dropdown" data-flip="false">
                      <div class="c-dropdown-toggle__link">3 варианта</div>
                    </div>
                    <div class="dropdown-menu c-dropdown__menu">
                      <ul>
                        <li> <a href="#">Серый </a></li>
                        <li> <a href="#">Розовый</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="d-block">
                  <div class="d-inline-block">Бренд:<a class="ml-1" href="#">Grohe</a></div>
                  <div class="d-inline-block">Страна: Германия</div>
                </div>
              </div>
            </div></div>`);
		for (var i = 0; i < 10; i++) {
			var productNode = product.clone();
			$('.c-filtered-products__body .row').append(productNode);
			(function(i) {
			setTimeout(function(){
				$('.c-filtered-products__body .row').children().eq(i).find('.c-filtered-product').addClass('is-active');
			}, 180 * i);
			 }(i));
		}
	})

	// $('.c-filters .js-price-field, .c-filters input').on('change', function(e){
	// 	// $.ajax({
	// 	// 	url: '',
	// 	// 	data: ''
	// 	// })
	// 	$('.c-filter.is-current').removeClass('is-current');
	// 	var container = $(this).parents('.c-filter');
	// 	container.addClass('is-current');
 //        var bottomPos = $(window).scrollTop() + $(window).height();
 //       $('.c-tip_filter').css({
 //            'top': ((container.offset().top - $(window).scrollTop()) + (container.outerHeight() / 2) - ($('.c-tip_filter').outerHeight() / 2) ) + 'px',
 //            'left': (container.offset().left + $('.c-tip_filter').width() * 1.3) + 'px'
 //        })
 //        if ($('.c-tip_filter').is(':hidden')) {
 //            $('.c-tip_filter').show();
 //        }
        
	// })
	// $(window).scroll(function() {
	// 	var container = $('.c-filter.is-current');
	// 	var bottomPos = $(window).scrollTop() + $(window).height();
 //    	$('.c-tip_filter').css({
 //            'top': ((container.offset().top - $(window).scrollTop()) + (container.outerHeight() / 2) - ($('.c-tip_filter').outerHeight() / 2)) + 'px',
 //            'left': (container.offset().left + $('.c-tip_filter').width() * 1.3) + 'px'
 //        })
	// })

	$('select').selectric();
	$('.c-price-field__inner').click(function(){
		$(this).find('.js-price-field').focus();
	})
	$('.js-price-field').mask("# ##0 000", {reverse: true})
	$('.js-date-field').mask("00.00.0000")
	$('.js-phone-field').mask("+7 (000) 000-00-00", {placeholder: "+7", dataMask: true, watchInputs: true, watchDataMask: true});

	$('.js-price-field').on('input', function(e){
		var number = $(e.target).text();
		if(!number.length){
			$(e.target).text('0');
		}
	})

    var previewThumbnails = new Swiper($('.js-product-preview-page .js-product-preview-thumbnails'), {
        slidesPerView: 4,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        spaceBetween: 1,
        shortSwipes: false,
        longSwipes: false,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.js-product-preview-page .c-product-preview__thumbnails .swiper-button-next'
        }
    });

     var previewMainMobile = new Swiper('.js-product-preview-mobile .swiper-container', {
        pagination: {
            clickable: true,
            el: '.js-product-preview-mobile .swiper-pagination'
        }
    });

    var previewMain = new Swiper('.js-product-preview-page .js-product-preview-main', {
        simulateTouch: false,
        thumbs: {
            swiper: previewThumbnails,
        },
    });


    var previewThumbnailsModal = new Swiper('.js-product-preview-modal .js-product-preview-thumbnails', {
        slidesPerView: 3,
        spaceBetween: 15,
        shortSwipes: false,
        longSwipes: false,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.js-product-preview-page .c-product-preview__thumbnails .swiper-button-next'
        }
    });

    var previewMainModal = new Swiper('.js-product-preview-modal .js-product-preview-main', {
        simulateTouch: false,
        thumbs: {
            swiper: previewThumbnailsModal,
        },
    });

    var watchEarlierSlider = new Swiper('.js-watch-earlier-slider', {
        slidesPerView: 4,
        spaceBetween: 25,
        slidesPerGroup: 4,
        breakpoints: {
        	992:{
        		slidesPerView: 3
        	},
        	450:{
        		slidesPerView: 2,
        		slidesPerGroup: 2
        	}
        },
        navigation: {
            nextEl: '.js-watch-earlier .swiper-button-next',
            prevEl: '.js-watch-earlier .swiper-button-prev'
        },
        pagination: {
            clickable: true,
            el: '.js-watch-earlier-slider .swiper-pagination'
        }
    });

    var saleDaySlider = new Swiper('.js-sale-day-slider', {
        slidesPerView: 6,
        spaceBetween: 15,
        breakpoints: {
        	992:{
        		slidesPerView: 3
        	},
        	450:{
        		slidesPerView: 2
        	}
        },
        pagination: {
            clickable: true,
            el: '.c-sale-day .swiper-pagination'
        },
        navigation: {
            nextEl: '.c-sale-day .swiper-button-next',
            prevEl: '.c-sale-day .swiper-button-prev'
        },
    });

    var ourBrandsSlider = new Swiper('.js-our-brands', {
        slidesPerView: 6,
        spaceBetween: 15,
        breakpoints: {
        	992:{
        		slidesPerView: 3
        	},
        	450:{
        		slidesPerView: 2
        	}
        },
        pagination: {
            clickable: true,
            el: '.c-our-brands .swiper-pagination'
        },
        navigation: {
            nextEl: '.c-our-brands .swiper-button-next',
            prevEl: '.c-our-brands .swiper-button-prev'
        },
    });


    var topProductSlider = new Swiper('.js-top-product-slider', {
        slidesPerView: 6,
        spaceBetween: 15,
        breakpoints: {
        	992:{
        		slidesPerView: 3
        	},
        	450:{
        		slidesPerView: 2
        	}
        },
        pagination: {
            clickable: true,
            el: '.c-top-product .swiper-pagination'
        },
        navigation: {
            nextEl: '.c-top-product .swiper-button-next',
            prevEl: '.c-top-product .swiper-button-prev'
        },
    });

    var checkoutProductsStatic = new Swiper('.js-checkout-products-static', {
        slidesPerView: 5,
        spaceBetween: 20,
        breakpoints: {
        	992:{
        		slidesPerView: 3
        	},
        	450:{
        		slidesPerView: 2
        	}
        },
        navigation: {
            nextEl: '.c-checkout-products .swiper-button-next',
            prevEl: '.c-checkout-products .swiper-button-prev'
        },
        scrollbar: {
            el: '.js-checkout-products-static .swiper-scrollbar'
        }
    });

    var checkoutProductsFixed = new Swiper('.js-checkout-products-fixed', {
        slidesPerView: 5,
        spaceBetween: 20,
        breakpoints: {
        	992:{
        		slidesPerView: 3
        	},
        	450:{
        		slidesPerView: 2
        	}
        },
        navigation: {
            nextEl: '.c-checkout-products .swiper-button-next',
            prevEl: '.c-checkout-products .swiper-button-prev'
        },
        scrollbar: {
            el: '.js-checkout-products-fixed .swiper-scrollbar'
        }
    });


    var mainBanner = new Swiper('.js-main-banner-slider', {
        pagination: {
            clickable: true,
            el: '.js-main-banner-slider .swiper-pagination'
        }
    });

    $('.c-product-card .c-product-card__title, .c-product-card .c-product-card__show-description').click(function(e){
    	e.preventDefault();
    	$('#preview-product-modal').modal('show');
    })
    $('#preview-product-modal').on('shown.bs.modal', function(){
    	previewThumbnailsModal.update();
    	previewMainModal.update();
    })


    $('#order-checkout-products, #order-checkout-products-chosen, #order-checkout-products-chosen-mobile').on('shown.bs.collapse', function() {
    	$('.js-checkout-products-static').each(function(index, item){
	        	setTimeout(function(){
	        		item.swiper.updateSlides();
	        	}, 1000)
	        })
	        
    })

     $('#order-checkout-products-fixed').on('shown.bs.collapse', function() {
     	$('.js-checkout-products-fixed').each(function(index, item){
	        	item.swiper.update();
	        })
    })

    $('.js-product-preview-page #js-product-preview-main').lightGallery({
        selector: '.js-product-preview-item'
    })

    $('.js-product-preview-page .js-product-preview-btn').on('click', function() {
        $('.js-product-preview-page .js-product-preview-item').trigger('click');
    })

    $('.js-product-preview-modal #js-product-preview-main').lightGallery({
        selector: '.js-product-preview-item'
    })

    $('.js-product-preview-modal .js-product-preview-btn').on('click', function() {
        $('.js-product-preview-modal .js-product-preview-item').trigger('click');
    })


    function orderCheckoutInfo() {
        var orderInfo =$('.c-product__order-info_desktop');
        if(!orderInfo.length) return true;
        var productCheckoutStatic = $('.js-product-order-checkout-static');
        var productCheckoutFixed = $('.js-product-order-checkout-fixed');
        productCheckoutFixed.css({
            'left': orderInfo.offset().left + 'px',
            'width': orderInfo.outerWidth() + 'px'
        })

        function checkPosAndHide() {
            if ($(window).scrollTop() > (productCheckoutStatic.offset().top + productCheckoutStatic.height())) {
                productCheckoutFixed.css({
                	display: 'flex'
                });
            } else {
                productCheckoutFixed.hide();
            }
        }

        checkPosAndHide();

        $(window).scroll(function() {
            checkPosAndHide();

        })
    }
    orderCheckoutInfo();

    function floatBtnPos() {
        var page = $('.js-page');

        $('.c-float-btn_options').css({
            'position': 'fixed',
            'left': page.offset().left + page.width() + 10 + "px"
        })
    }
    floatBtnPos();
    $(window).scroll(function(){
    	if($(window).scrollTop() + $(window).height() > $('.js-table_options').offset().top + ($('.js-table_options').height() / 2)) {
    		$('.c-float-btn_options').hide();
    	}else {
    		$('.c-float-btn_options').show();
    	}
    });

    $(window).resize(function() {
    	orderCheckoutInfo();
        floatBtnPos();
    })

    $('.js-float-btn-options, .js-scroll-to-options').click(function(e){
    	e.preventDefault();
    	$('body,html').animate({
    		scrollTop: $('.js-options').offset().top
    	})
    })

    $('.js-scroll-to-map').click(function(e){
    	e.preventDefault();
    	$('body,html').animate({
    		scrollTop: $('#map').offset().top
    	})
    })

    $('.js-scroll-to-schema').click(function(e){
    	e.preventDefault();
    	$('body,html').animate({
    		scrollTop: $('#scheme').offset().top
    	})
    })

    $('.js-read-more-btn').click(function(e){
    	e.preventDefault();
    	if($(this).parent().parent().find('.js-read-more-container').hasClass('is-active')){
    		$(this).text('Развернуть');
    		$(this).parent().parent().find('.js-read-more-container').removeClass('is-active')
    	}else{
    		$(this).text('Свернуть');
    		$(this).parent().parent().find('.js-read-more-container').addClass('is-active')
    	}
    })

    $('#product-info-body').on('hide.bs.collapse', function () {
		$('.js-product-info-collapse-toggle a').text('показать все характеристики');
	})
	$('#product-info-body').on('show.bs.collapse', function () {
		$('.js-product-info-collapse-toggle a').text('Свернуть характеристики');
	})


	$('.js-showroom').click(function(e){
		e.preventDefault();
		if($(e.target).hasClass('c-showroom__close') || $(e.target).hasClass('js-showroom')){
			$(this).toggleClass('is-active');
		}
	})

	$('.c-product__order-info .c-product__code').hover(function(){
		$('.c-tip_code').css('opacity', 1);
	}, function(){
		$('.c-tip_code').css('opacity', 0);
	})


	var mainSharesSlider = new Swiper('.js-main-shares-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
        	992:{
        		slidesPerView: 2
        	},
        },
        navigation: {
            nextEl: '.c-main-shares .swiper-button-next',
            prevEl: '.c-main-shares .swiper-button-prev'
        },
    });

 var ourShowroomThumbnails = new Swiper('.js-our-showroom-thumbnails', {
        slidesPerView: 8,
        spaceBetween: 5,
        shortSwipes: false,
        longSwipes: false,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
        	992: {
        		slidesPerView: 8
        	},
        	450: {
        		slidesPerView: 3
        	}
        }
    });


    var ourShowroomGallery = new Swiper('.js-our-showroom-gallery', {
        simulateTouch: false,
        thumbs: {
            swiper: ourShowroomThumbnails,
        },
        navigation: {
            nextEl: '.c-our-showroom-slider__main .swiper-button-next',
            prevEl: '.c-our-showroom-slider__main .swiper-button-prev'
        }
    });


});