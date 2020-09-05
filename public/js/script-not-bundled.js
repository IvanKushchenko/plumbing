// import 'bootstrap';
// import $ from 'jquery';
// import lightGallery from 'lightgallery';
// import selectric from 'selectric';
// require('./products');
// require('./tips');
// require('./file-uploader');
// require('jquery-mask-plugin').default;
// import { CountUp } from 'countup.js';
// import Swiper from 'swiper';
$(function() {
	CountUp = countUp.CountUp;
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

	// Работа с корзиной:begin
    $(".s-basket .c-product-card_basket").each(function() {
        $(this).find(".c-product-card__remove-btn").click(function() {
            var id = $(this).data("delete-item-id");
            console.log("delete: " + id);

            $.ajax({
                method: "POST",
                //url: next_page,
                data: { BASKET_ACTION: "RemoveItemByID", BASKET_ITEM_ID: id },
                success: function (data) {
                    console.log("delete ok...");
                    var totalPrice = 0;
                    $('.c-table_basket .c-product-card__total_main').each(function (index, item) {
                        if (!$(item).attr('data-total')) return;
                        totalPrice += Number($(item).attr('data-total'));
                    });

                    var totalDiscount = 0;
                    $('.c-table_basket .c-product-card .c-discounts__price').each(function (index, item) {
                        if (!$(item).attr('data-discount')) return;
                        totalDiscount += Number($(item).attr('data-discount'));
                    });

                    mainTotalPrice.update(totalDiscount);
                    mainTotalPriceNew.update(totalPrice);
                    mainTotalPriceFixed.update(totalDiscount);
                    mainTotalPriceFixedNew.update(totalPrice);
                }
            });
        });
    });

    function UpdateQuantityItemById(id, quantity) {
        console.log(id);
        console.log(quantity);
        $.ajax({
            method: "POST",
            //url: next_page,
            data: { BASKET_ACTION: "UpdateQuantityItemByID", BASKET_ITEM_ID: id, QUANTITY_ITEM: quantity },
            success: function (data) {
                console.log("update ok...");
                console.log("...");
            }
        });
    }

    // переписать связь с аналитикой (оставил пока наследие)
    $(".order-btn").each(function() {
       $(this).click(function() {
            var m = $("#ORDER_FORM"); 
            var fio = m.find('input[name="ORDER_PROP_19"]').val(); 
            var phone = m.find('input[name="ORDER_PROP_17"]').val(); 
            var mail = m.find('input[name="ORDER_PROP_6"]').val(); 
            var ct_site_id = '562';
            var sub = 'Заказ';
            var ct_data = {             
                fio: fio,
                phoneNumber: phone,
                email: mail,
                subject: sub,
                sessionId: window.call_value 
            };
            if (!!phone && !!fio && !!mail) {
                jQuery.ajax({  
                    url: 'https://api-node1.calltouch.ru/calls-service/RestAPI/'+ct_site_id+'/requests/orders/register/',
                    dataType: 'json', 
                    type: 'POST', 
                    data: ct_data, 
                    async: false
                }); 
            }

            $("#ORDER_FORM").submit();
       });
    });
    // Работа с корзиной:end

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
	
	// $(".js-show-filtered-products").click(function(e){
	// 	e.preventDefault();
 //        if (!$('.c-tip_filter').is(':hidden')) {
 //            $('.c-tip_filter').hide();
 //        }
	// 	$('.c-filtered-products__body .row').html('');
	// 	var products = '';
	// 	var product = $('<div>').addClass('col-6 col-lg-4');
	// 	product.html(`<div class="c-filtered-product"><div class="c-filtered-product__image"><img src="img/content/filtered-product.jpg" alt="">
 //              <div class="c-filtered-product__label"><span class="c-filtered-product__label-txt">5 вариантов модели</span></div>
 //            </div>
 //            <div class="c-filtered-product__body">
 //              <div class="d-block text-center pr-3 pl-3 mb-3"><a class="c-filtered-product__link" href="#">ванна акриловая riho Line ADIGE ADI -LVM25-CRM</a></div>
 //              <div class="d-flex justify-content-between mb-2">
 //                <div class="c-filtered-product__availability c-filtered-product__availability_true d-flex align-items-center"><img src="img/icons/check-success.png" alt=""><span>В наличии</span></div>
 //                <div class="c-filtered-product__price">13 400</div>
 //              </div>
 //              <div class="c-filtered-product__code mb-2">Код товара: 1234566JL</div>
 //              <div class="d-flex flex-column align-items-center">
 //                <div class="mb-2">Размер: 1500х700</div>
 //                <div class="d-flex align-items-center mb-2">Цвет профиля:
 //                  <div class="d-inline d-lg-none ml-2">черный, серый</div>
 //                  <div class="d-none d-lg-block dropdown c-dropdown c-dropdown_link c-filtered-product__dropdown">
 //                    <div class="dropdown-toggle c-dropdown-toggle" data-toggle="dropdown" data-flip="false">
 //                      <div class="c-dropdown-toggle__link">2 варианта</div>
 //                    </div>
 //                    <div class="dropdown-menu c-dropdown__menu">
 //                      <ul>
 //                        <li> <a href="#">Серый </a></li>
 //                        <li> <a href="#">Розовый</a></li>
 //                      </ul>
 //                    </div>
 //                  </div>
 //                </div>
 //                <div class="d-flex align-items-center mb-2">Цвет стекла:
 //                  <div class="d-inline d-lg-none ml-2">черный, серый</div>
 //                  <div class="d-none d-lg-block dropdown c-dropdown c-dropdown_link c-filtered-product__dropdown">
 //                    <div class="dropdown-toggle c-dropdown-toggle" data-toggle="dropdown" data-flip="false">
 //                      <div class="c-dropdown-toggle__link">3 варианта</div>
 //                    </div>
 //                    <div class="dropdown-menu c-dropdown__menu">
 //                      <ul>
 //                        <li> <a href="#">Серый </a></li>
 //                        <li> <a href="#">Розовый</a></li>
 //                      </ul>
 //                    </div>
 //                  </div>
 //                </div>
 //                <div class="d-block">
 //                  <div class="d-inline-block">Бренд:<a class="ml-1" href="#">Grohe</a></div>
 //                  <div class="d-inline-block">Страна: Германия</div>
 //                </div>
 //              </div>
 //            </div></div>`);
	// 	for (var i = 0; i < 10; i++) {
	// 		var productNode = product.clone();
	// 		$('.c-filtered-products__body .row').append(productNode);
	// 		(function(i) {
	// 		setTimeout(function(){
	// 			$('.c-filtered-products__body .row').children().eq(i).find('.c-filtered-product').addClass('is-active');
	// 		}, 180 * i);
	// 		 }(i));
	// 	}
	// })

	$('.o-page__sidebar .c-filters .js-price-field, .o-page__sidebar .c-filters input').on('change', function (e) {
        // $.ajax({
        // 	url: '',
        // 	data: ''
        // })
        $('.o-page__sidebar .c-filter.is-current').removeClass('is-current');
        //console.log($(this).offset().top);
        var container = $(this).parents('.c-filter');
        container.addClass('is-current');
        var bottomPos = $(window).scrollTop() + $(window).height();
        $('.o-page__sidebar .c-tip_filter').css({
            //'top': ((container.offset().top - $(window).scrollTop()) + (container.outerHeight() / 2) - ($('.o-page__sidebar .c-tip_filter').outerHeight() / 2)) + 'px',
            'top': (($(this).offset().top - $(window).scrollTop()) + ($(this).outerHeight() / 2) - ($('.o-page__sidebar .c-tip_filter').outerHeight() / 2)) + 'px',
            'left': (container.offset().left + $('.o-page__sidebar .c-tip_filter').width() * 1.3) + 'px'
        })
        if ($('.o-page__sidebar .c-tip_filter').is(':hidden')) {
            $('.o-page__sidebar .c-tip_filter').show();
        }

    })

    $('.c-filters-mobile .c-filters .js-price-field, .c-filters-mobile .c-filters input').on('change', function (e) {
        // $.ajax({
        // 	url: '',
        // 	data: ''
        // })
        $('.c-filters-mobile .c-filter.is-current').removeClass('is-current');
        var container = $(this).parents('.c-filter');
        container.addClass('is-current');
        var bottomPos = $(window).scrollTop() + $(window).height();
        $('.c-filters-mobile .c-tip_filter').css({
            'top': ((container.offset().top - $(window).scrollTop()) + (container.outerHeight() / 2) - ($('.c-filters-mobile .c-tip_filter').outerHeight() / 2)) + 'px',
            'left': (container.offset().left + $('.c-filters-mobile .c-tip_filter').width() * 1.3) + 'px'
        })
        if ($('.c-filters-mobile .c-tip_filter').is(':hidden')) {
            $('.c-filters-mobile .c-tip_filter').show();
        }

    })


	if($('.c-filter').length && $('.c-tip_filter').length){
		$(window).scroll(function() {
			var container = $('.c-filter.is-current');
			var bottomPos = $(window).scrollTop() + $(window).height();
	    	$('.c-tip_filter').css({
	            'top': ((container.offset().top - $(window).scrollTop()) + (container.outerHeight() / 2) - ($('.c-tip_filter').outerHeight() / 2)) + 'px',
	            'left': (container.offset().left + $('.c-tip_filter').width() * 1.3) + 'px'
	        })
		})
	}

	$('select').selectric();
	$('.c-price-field__inner').click(function(){
		$(this).find('.js-price-field').focus();
	})
	// $('.js-price-field').mask("# ##0 000", {reverse: true})
	$('.js-date-field').mask("00.00.0000")
	$('.js-price-field').mask('000 000 000 000 000', {reverse: true});
	$('.js-phone-field').mask("+7 (000) 000-00-00", {placeholder: "+7", dataMask: true, watchInputs: true, watchDataMask: true});
    // $('.js-phone-field').mask("+7 (000) 000-00-00");
	// $('.js-price-field').on('input', function(e){
	// 	var number = $(e.target).text();
	// 	if(!number.length){
	// 		$(e.target).text('0');
	// 	}
	// })

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
        // autoHeight: true,
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
        // autoHeight: true,
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
    if($('.js-table_options').length){
	    $(window).scroll(function(){
	    	if($(window).scrollTop() + $(window).height() > $('.js-table_options').offset().top + ($('.js-table_options').height() / 2)) {
	    		$('.c-float-btn_options').hide();
	    	}else {
	    		$('.c-float-btn_options').show();
	    	}
	    });
    }

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

    // Скрываем "развернуть/свернуть" в карточке товара если символов < 976
    if ($(".c-product-description__body").text().length < 976) {
        $('.js-read-more-container').addClass('is-active');
        $('.js-read-more-btn').remove();
    }

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

	var tipCodeTimer = null;
	function showProductCode(){
		

		$('.c-tip_code').css('opacity', 1);
		tipCodeTimer = setTimeout(function() {
			$('.c-tip_code').css('opacity', 0);
			clearTimeout(tipCodeTimer);
		}, 5000);

	}

	setTimeout(function(){
		showProductCode();
	}, 15000);

	if(!$('.c-tip_code').length) return;

	$(window).scroll(function() {
		var container = $('.c-product__code');
    	$('.c-tip_code').css({
            'top': ((container.offset().top - $(window).scrollTop()) + (container.outerHeight() / 2) - ($('.c-tip_code').outerHeight() / 2)) + 'px'
        })
	})

	$('.c-product__order-info .c-product__code .c-info').hover(function(){
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

    $(".c-posts-showed .c-posts-showed__count-input").click(function() {
		if ($(this).is(":checked")) {
            $(".c-posts-showed").find(".is-active").removeClass("is-active");
            $(this).parent().addClass("is-active");

            var val = $(this).val();
            $.post(window.location.href, {count: val})
                .done(function(data) {
                    window.location.reload(true);
                });
        }
	});

    $(".c-sort .c-sort__select").change(function() {
        var val = $(this).find("option:selected").val();

        $.post(window.location.href, {sort: val})
            .done(function(data) {
                window.location.reload(true);
            });
    });

    $(".c-sort-mobile .c-sort-mobile__item").each(function() {
        $(this).click(function() {
            var val = $(this).find(".c-sort-mobile__input").val();

            $.post(window.location.href, {sort: val})
                .done(function(data) {
                    window.location.reload(true);
                });
        });
    });

    /////// Дороботки после верстальщика //////
    // Буквенный фильтр брендов
    $('.c-alphabet-filter .c-alphabet-filter__item').each(function() {
        var is_alpha = false;
        var alphabet = $(this).text();

        $(".c-brands-list .c-brands-list__section").each(function() {
            if ($(this).find(".c-brands-list__letter").text() == alphabet || alphabet == "Все" || alphabet == "А-я") {
                is_alpha = true;
            }
        });

        if (!is_alpha) {
            $(this).addClass("d-none");
        } else {
            $(this).click(function () {
                $('.c-alphabet-filter .is-active').removeClass("is-active");
                $(this).addClass("is-active");

                if ($(this).text() == "Все") {
                    $(".c-brands-list .c-brands-list__section").each(function () {
                        if ($(this).hasClass("d-none")) {
                            $(this).removeClass("d-none");
                        }
                    });
                } else if ($(this).text() == "А-я") {
                    $(".c-brands-list .c-brands-list__section").each(function () {
                        $(this).removeClass("d-none");
                    });

                    $('.c-alphabet-filter .c-alphabet-filter__item').each(function() {
                        if ($(this).text() != "Все" && $(this).text() != "А-я") {
                            var i = $(this).text();
                            $(".c-brands-list .c-brands-list__section").each(function () {
                                if ($(this).find(".c-brands-list__letter").text() == i) {
                                    $(this).addClass("d-none");
                                }
                            });
                        }
                    });
                } else {
                    $(".c-brands-list .c-brands-list__section").each(function () {
                        if ($(this).find(".c-brands-list__letter").text() == alphabet) {
                            $(this).removeClass("d-none");
                        } else {
                            $(this).addClass("d-none");
                        }
                    });
                }
            });
        }
    });

    function setLocation(curLoc){
        try {
            history.pushState(null, null, curLoc);
            return;
        } catch(e) {}
        location.hash = '#' + curLoc;
    }

    $(".brand-filter .brand-filter__country .c-checkbox__input").on('change', function(e) {
        e.preventDefault();

        var link = "";
        $(".brand-filter .brand-filter__country .c-checkbox__input").each(function() {
            if ($(this).prop("checked")) {
                link += $(this).val() + "_";
            }
        });

        if (link != "") {
            link = "/brands/filter/uf_country-is-" + link.substr(0, link.length - 1) + "/apply/";
            window.location.href = link;
        } else {
            window.location.href = "/brands/";
        }
    });

    // Фильтр каталога мобильный
    $(".c-filters-mobile .catalog-filter input").change(function() {
        changeFilterMob();
    });

    var is_typed = false; // предотвращаем лишние срабатывания
    $(".c-filters-mobile .catalog-filter .c-price-field__input").on('input', function(e) {
        if (!is_typed) {
            is_typed = true;
            setTimeout(function () {
                changeFilter();
                is_typed = false;
            }, 2000);
        }
    });

    function changeFilterMob() {
        var part_1 = $(".c-filters-mobile .catalog-filter input, .c-filters-mobile .catalog-filter .c-price-field__input").not(".notRequest").serialize();
        var part_2 = "";

        $(".c-filters-mobile .catalog-filter .c-price-field__input").each(function() {
            if (Number($(this).data("begin")) !== Number($(this).val().replace(/ /g, ""))) {
                part_2 += "&" + $(this).attr("id").replace(/\[/g, "%5B").replace(/\]/g, "%5D") + "=" + $(this).val().replace(/ /g, "");
            }
        });

        var fullUrl = window.location.pathname + "?" + part_1 + part_2;
        var fullUrl2 = part_1 + part_2;

        $.ajax({
            method: "GET",
            url: '/bitrix/ajax/GetCountFilteredElements.php',
            data: fullUrl2 + "&section=" + $("#section_id").val(),
            success: function (data) {
                $(".c-filters-mobile .c-tip_filter span").text(data);
                $(".c-filters-mobile .c-tip_filter a").attr("href", fullUrl);
            }
        });
    }

    function changeFilterNoAjaxMob() {
        var part_1 = $(".c-filters-mobile .catalog-filter input, .c-filters-mobile .catalog-filter .c-price-field__input").not(".notRequest").serialize();
        var part_2 = "";

        $(".c-filters-mobile .catalog-filter .c-price-field__input").each(function() {
            if (Number($(this).data("begin")) !== Number($(this).val().replace(/ /g, ""))) {
                part_2 += "&" + $(this).attr("id").replace(/\[/g, "%5B").replace(/\]/g, "%5D") + "=" + $(this).val().replace(/ /g, "");
            }
        });

        var fullUrl = window.location.pathname + "?" + part_1 + part_2;
        var fullUrl2 = part_1 + part_2;

        window.location.href = fullUrl;
    }

    $(".c-filters-mobile .catalog-filter .c-choosed-tag__close").each(function() {
        $(this).click(function() {
            var name = $(this).parent().data("name");
            $(this).parent().remove();

            $(".c-filters-mobile .catalog-filter .c-filter .c-checkbox__input").each(function() {
                if ($(this).attr("name") == name) {
                    $(this).removeAttr("checked");
                }
            });

            $(".c-filters-mobile .catalog-filter .c-filter .c-price-field__input").each(function() {
                if ($(this).attr("id") == name) {
                    $(this).val($(this).data("begin"));
                }
            });

            changeFilterNoAjaxMob();
        });
    });

    // Фильтр каталога
    $(".o-page__sidebar .catalog-filter input").change(function() {
    	console.log("change");
        changeFilter();
    });

    var is_typed = false; // предотвращаем лишние срабатывания
    $(".o-page__sidebar .catalog-filter .c-price-field__input").on('input', function(e) {
        if (!is_typed) {
            is_typed = true;
            setTimeout(function () {
                changeFilter();
                is_typed = false;
            }, 2000);
        }
    });

    function changeFilter() {
        var part_1 = $(".o-page__sidebar .catalog-filter input, .o-page__sidebar .catalog-filter .c-price-field__input").not(".notRequest").serialize();
        var part_2 = "";

        $(".o-page__sidebar .catalog-filter .c-price-field__input").each(function() {
            if (Number($(this).data("begin")) !== Number($(this).val().replace(/ /g, ""))) {
                part_2 += "&" + $(this).attr("id").replace(/\[/g, "%5B").replace(/\]/g, "%5D") + "=" + $(this).val().replace(/ /g, "");
            }
        });

        var fullUrl = window.location.pathname + "?" + part_1 + part_2;
        var fullUrl2 = part_1 + part_2;

        $.ajax({
            method: "GET",
            url: '/bitrix/ajax/GetCountFilteredElements.php',
            data: fullUrl2 + "&section=" + $("#section_id").val(),
            success: function (data) {
                $(".o-page__sidebar .c-tip_filter span").text(data);
                $(".o-page__sidebar .c-tip_filter a").attr("href", fullUrl);
            }
        });
    }

    function changeFilterNoAjax() {
        var part_1 = $(".o-page__sidebar .catalog-filter input, .o-page__sidebar .catalog-filter .c-price-field__input").not(".notRequest").serialize();
        var part_2 = "";

        $(".o-page__sidebar .catalog-filter .c-price-field__input").each(function() {
            if (Number($(this).data("begin")) !== Number($(this).val().replace(/ /g, ""))) {
                part_2 += "&" + $(this).attr("id").replace(/\[/g, "%5B").replace(/\]/g, "%5D") + "=" + $(this).val().replace(/ /g, "");
            }
        });

        var fullUrl = window.location.pathname + "?" + part_1 + part_2;
        var fullUrl2 = part_1 + part_2;

        window.location.href = fullUrl;
    }

    $(".o-page__sidebar .catalog-filter .c-choosed-tag__close").each(function() {
        $(this).click(function() {
            var name = $(this).parent().data("name");
            $(this).parent().remove();

            $(".o-page__sidebar .catalog-filter .c-filter .c-checkbox__input").each(function() {
                if ($(this).attr("name") == name) {
                    $(this).removeAttr("checked");
                }
            });

            $(".o-page__sidebar .catalog-filter .c-filter .c-price-field__input").each(function() {
                if ($(this).attr("id") == name) {
                    $(this).val($(this).data("begin"));
                }
            });

            changeFilterNoAjax();
        });
    });

    // Кнопка "в корзину"
    $(".c-btn-buy").click(function() {
        // Новая обработка параметров: begin
        var product_data = new Object; 
        
        // Если обычный товар
        if ($("#product_id").length > 0 && $("#product_id").val() > 0) {
            product_data.product_id = $("#product_id").val();

            product_data.options = [];
            $("input:checked").each(function() {
                if($(this).attr("type") == "radio") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();

                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }

                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.article = article;
                    product_data.price_before_discount = price_before_discount;
                    product_data.discount_text = discount_text;

                } else if ($(this).attr("type") == "checkbox") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();
                    
                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }
                    
                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.options[product_data.options.length] = { 'id': $(this).val(), 'article': article, 'price_before_discount': price_before_discount, 'discount_text': discount_text };
                }
            });
        }

        // Если товар c торговыми предложениями
        if ($("#offer_id").length > 0 && $("#offer_id").val() > 0) {
            product_data.offer_id = $("#offer_id").val();

            product_data.offers = [];
            product_data.options = [];
            $("input:checked").each(function() {
                if($(this).attr("type") == "radio") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();
                    
                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }
                    
                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.offers[product_data.offers.length] = { 'id': $(this).val(), 'article': article, 'price_before_discount': price_before_discount, 'discount_text': discount_text };
                } else if ($(this).attr("type") == "checkbox") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();
                    
                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }
                    
                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.options[product_data.options.length] = { 'id': $(this).val(), 'article': article, 'price_before_discount': price_before_discount, 'discount_text': discount_text };
                }
            });
        }

        // Если набор
        if ($("#set_id").length > 0 && $("#set_id").val() > 0) {
            product_data.set_id = $("#set_id").val();

            product_data.offers = [];
            product_data.options = [];
            $("input:checked").each(function() {
                if($(this).attr("type") == "radio") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();
                    
                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }
                    
                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.offers[product_data.offers.length] = { 'id': $(this).val(), 'article': article, 'price_before_discount': price_before_discount, 'discount_text': discount_text };
                } else if ($(this).attr("type") == "checkbox") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();
                    
                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }
                    
                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.options[product_data.options.length] = { 'id': $(this).val(), 'article': article, 'price_before_discount': price_before_discount, 'discount_text': discount_text };
                }
            });
        }

        //console.log(product_data);

        // Новая обработка параметров: end

        // Logic
        var ob = "";
        var neob = "";
        var coupon = $("#coupon").val();
        var id = $("#buy_input").val();

        $("input:checked").each(function() {
            if($(this).attr("type") == "radio") {
                if (ob.length > 0) {
                    ob += ":";
                }

                ob += $(this).val();

                if($("input[name=SetParentId]").length > 0 && $("input[name=SetParentId]").val() != "") {
                    ob = $("input[name=SetParentId]").val()+":"+ob;
                }
            } else if($(this).attr("type") == "checkbox") {
                if (neob.length > 0) {
                    neob += ":";
                }

                neob += $(this).val();
            }
        });

        if (ob == "undefined") {
            ob = "";
        }

        if (neob == "undefined") {
            neob = "";
        }

        if (coupon == "undefined") {
            coupon = "";
        }

        product_data = JSON.stringify(product_data);

        // $.get("/catalog/callback.php?action=ADD2BASKET&id="+id+"&ob="+ob+"&neob="+neob+"&coupon="+coupon, function(data){
        //     if (data != "f") {
        //         console.log("test#####");
        //         console.log(id);
        //         console.log(ob);
        //         console.log(neob);
        //         console.log(coupon);
        //         console.log("#####");
        //         console.log(data);
        //         console.log("test#####");
        //         RefreshCart();
        //         // Modal
        //         $("body").css("overflow", "hidden");
        //         $("#с-product-buy-notify").show();
        //     }
        // });

        $.post("/catalog/callback.php", {'action': 'ADD2BASKET', 'id': id, 'ob': ob, 'neob': neob, 'coupon': coupon, 'product_data': product_data}).done(function(data) { 
            console.log("test#####");
            console.log(id);
            console.log(ob);
            console.log(neob);
            console.log(coupon);
            console.log("#####");
            console.log(data);
            console.log("test#####");
            RefreshCart();
            // Modal
            $("body").css("overflow", "hidden");
            $("#с-product-buy-notify").show();
        });
    });

    $("#с-product-buy-notify .c-close, #с-product-buy-notify .c-close-btn").click(function() {
        $("body").css("overflow", "auto");
        $("#с-product-buy-notify").hide();
    });

    $('.js-table_product .c-product-card_radio .c-product-card__input, .js-table_options .c-product-card_checkbox .c-product-card__input').on('change', function(e) {
        UpdateBuyProperty();
    });

    function UpdateBuyProperty() {
        var result = "";

        $("input:checked").each(function() {
            if($(this).attr("type") == "radio") {
                if (result.length > 0) {
                    result += ":";
                }

                result += $(this).val();

                if($("input[name=SetParentId]").length > 0) {
                    result = $("input[name=SetParentId]").val()+":"+result;
                }
            } else if($(this).attr("type") == "checkbox") {
                if (result.length > 0) {
                    result += ":";
                }

                result += $(this).val();
            }
        });

        $("#buy_input").val(result);
    }

    function RefreshCart() {
        $(".c-card").each(function() {
            var card = eval($(this).attr("id"));
            card.refreshCart({});
        });
    }

    // Кнопка "купить в 1 клик"
    $(".c-btn-oneclick").click(function() {
        $("body").css("overflow", "hidden");
        $("#с-product-oneclick-notify").show();
    });

    $("#с-product-oneclick-notify .c-close-btn").click(function() {
        $("body").css("overflow", "auto");
        $("#с-product-oneclick-notify").hide();
    });

    // переписать связь с аналитикой (оставил пока наследие)
    function CheckFromBuyOneClick(form) {

        var errorMsg = false;
    
        var chackRules = {
            //'name1': 'Пожалуйста, введите ваше имя! (не менее 3 символов) ',
            'phoneFixCssBug1': 'Пожалуйста, введите номер телефона для связи!'
        };
    
    
        for (var key in chackRules) {
    
            var obj = document.getElementById(key);
            var inputValue = obj.value;
            if (inputValue.length < 3)
                errorMsg += chackRules[key];
    
        }
    
        if (errorMsg) {
            alert(errorMsg);
            return false;
        } else {
            var id = $("#buy_input").val();
            //var name = document.getElementById("name1").value;
            var phone = document.getElementById("phoneFixCssBug1").value;
            var email = $(".formOneClick input[name='email']").val();
            var fio = $(".formOneClick input[name='fio']").val();
            var coupon = "";
            //var coupon2 = $(".formOneClick input[name='coupon2']").val();
            $(".you_phone").html("<span class='red'>Ваш телефон: "+phone+"</span>");
            $(".formOneClick__form").hide();
            $(".formOneClick").append("<p style='text-align:center'>Спасибо за заказ! Мы свяжемся с вами по телефону: "+phone+"</p>");
    
            //$.get("/catalog/by1click.php?id="+id+"&name="+name+"&phone="+phone, function(data){
            //$.get("/catalog/by1click.php?id="+id+"&phone="+phone+"&coupon="+$("#coupon").val()+"&fio="+fio+"&email="+email+"&coupon2="+coupon2, function(data){
           
            /*
            $.get("/catalog/by1click.php?id="+id+"&phone="+phone+"&fio="+fio+"&email="+email, function(data){
                var ct_node_id = '1';
                var ct_site_id = '562';
                var ct_data = {
					phoneNumber: phone,
                    subject: 'Покупка в 1 клик',
                    sessionId: window.call_value
                };
                jQuery.ajax({
                    url: 'https://api-node' + ct_node_id + '.calltouch.ru/calls-service/RestAPI/requests/' + ct_site_id + '/register/',
                    dataType: 'json',
                    type: 'POST',
                    data: ct_data
                });
            });
            */

        // Новая обработка параметров: begin
        var product_data = new Object; 
        
        // Если обычный товар
        if ($("#product_id").length > 0 && $("#product_id").val() > 0) {
            product_data.product_id = $("#product_id").val();

            product_data.options = [];
            $("input:checked").each(function() {
                if($(this).attr("type") == "radio") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();

                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }

                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.article = article;
                    product_data.price_before_discount = price_before_discount;
                    product_data.discount_text = discount_text;

                } else if ($(this).attr("type") == "checkbox") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();
                    
                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }
                    
                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.options[product_data.options.length] = { 'id': $(this).val(), 'article': article, 'price_before_discount': price_before_discount, 'discount_text': discount_text };
                }
            });
        }

        // Если товар c торговыми предложениями
        if ($("#offer_id").length > 0 && $("#offer_id").val() > 0) {
            product_data.offer_id = $("#offer_id").val();

            product_data.offers = [];
            product_data.options = [];
            $("input:checked").each(function() {
                if($(this).attr("type") == "radio") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();
                    
                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }
                    
                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.offers[product_data.offers.length] = { 'id': $(this).val(), 'article': article, 'price_before_discount': price_before_discount, 'discount_text': discount_text };
                } else if ($(this).attr("type") == "checkbox") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();
                    
                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }
                    
                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.options[product_data.options.length] = { 'id': $(this).val(), 'article': article, 'price_before_discount': price_before_discount, 'discount_text': discount_text };
                }
            });
        }

        // Если набор
        if ($("#set_id").length > 0 && $("#set_id").val() > 0) {
            product_data.set_id = $("#set_id").val();

            product_data.offers = [];
            product_data.options = [];
            $("input:checked").each(function() {
                if($(this).attr("type") == "radio") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();
                    
                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }
                    
                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.offers[product_data.offers.length] = { 'id': $(this).val(), 'article': article, 'price_before_discount': price_before_discount, 'discount_text': discount_text };
                } else if ($(this).attr("type") == "checkbox") {
                    var article = $(this).parent().find(".c-product-card__subtitle").text();
                    
                    if (article.length > 5) {
                        article = article.replace("Арт. ", "");
                    } else {
                        article = "";
                    }
                    
                    var price_before_discount = "";
                    var discount_text = "";

                    if ($(this).parent().find("#price_before_discount").length > 0) {
                        price_before_discount = $(this).parent().find("#price_before_discount").val();
                    }

                    if ($(this).parent().find("#discount_text").length > 0) {
                        discount_text = $(this).parent().find("#discount_text").val();
                    }

                    product_data.options[product_data.options.length] = { 'id': $(this).val(), 'article': article, 'price_before_discount': price_before_discount, 'discount_text': discount_text };
                }
            });
        }

        console.log(product_data);
        product_data = JSON.stringify(product_data);

        // Новая обработка параметров: end

            $.post("/bitrix/ajax/BuyOneClick.php", {'product_id': id, 'name': fio, 'phone': phone, 'email': email, 'coupon': coupon, 'product_data': product_data}).done(function(response) { 
                var ct_node_id = '1';
                var ct_site_id = '562';
                var ct_data = {
					phoneNumber: phone,
                    subject: 'Покупка в 1 клик',
                    sessionId: window.call_value
                };
                jQuery.ajax({
                    url: 'https://api-node' + ct_node_id + '.calltouch.ru/calls-service/RestAPI/requests/' + ct_site_id + '/register/',
                    dataType: 'json',
                    type: 'POST',
                    data: ct_data
                });
            });
            // send conversion send_form_buy_in_one_click (Отправка формы "Купить в 1 клик")
          //  analitic.conversionHappened('send_form_buy_in_one_click');
    
            return false;
        }
        return false;
    }
    
    
    $("form.formOneClick").submit(function(e){
        e.preventDefault();
        CheckFromBuyOneClick();
        return false;
    })

    /*
    if ($(this).find("input[name=phone]").val() != '') {
            var ct_node_id = '1';
                var ct_site_id = '562';
                var ct_data = {
					phoneNumber: $(this).find("input[name=phone]").val(),
                    subject: 'Покупка в 1 клик',
                    sessionId: window.call_value
                };
                jQuery.ajax({
                    url: 'https://api-node' + ct_node_id + '.calltouch.ru/calls-service/RestAPI/requests/' + ct_site_id + '/register/',
                    dataType: 'json',
                    type: 'POST',
                    data: ct_data
                });
         }

         jQuery(document).on('click','form#ORDER_FORM input[type="submit"]',function() { 
var m = jQuery(this).closest('form'); 
var fio = m.find('input[name="ORDER_PROP_19"]').val(); 
var phone = m.find('input[name="ORDER_PROP_17"]').val(); 
var mail = m.find('input[name="ORDER_PROP_6"]').val(); 
var ct_site_id = '562';
var sub = 'Заказ';
var ct_data = {             
fio: fio,
phoneNumber: phone,
email: mail,
subject: sub,
sessionId: window.call_value 
};
if (!!phone && !!fio && !!mail){
jQuery.ajax({  
  url: 'https://api-node1.calltouch.ru/calls-service/RestAPI/'+ct_site_id+'/requests/orders/register/',
  dataType: 'json', type: 'POST', data: ct_data, async: false
}); 
}
});
    */

    // Блоки на главной странице
    $(".c-main-categories .c-main-categories__item").each(function() {
        $(this).find('.c-main-categories__info').click(function () {
            window.location.href = $(this).find("a").attr("href");
        });
    });

    $(".c-card .c-navbar-product__title").each(function() {
        $(this).click(function(e) {
            e.preventDefault();
            window.location.href = $(this).attr("href");
        });
    });

    $(".c-card .c-btn").click(function(e) {
        e.preventDefault();
        window.location.href = $(this).attr("href");
    });

    // Загрузить еще
    $(".c-filtered-products__load-more").click(function() {
        // Отключаем повторное нажатие
        $(".c-load-more.is-loading").attr("disable", "disable");
        // Получаем следующую страницу
        var next_page = $(".c-pagination__pages .c-pagination__page.is-active").next().attr("href");

        $.ajax({
            method: "POST",
            url: next_page,
            data: { ajax: "y" },
            success: function (data) {
                // Позиции
                $(".c-filtered-products__body .row").append($(data).find(".c-filtered-products__body .row").children());
                // Пагинация
                $(".c-pagination").each(function() {
                    $(this).html($(data).find(".c-pagination").html());
                });
                // Запоминаем адрес
                window.history.pushState(null, null, next_page);
                // Активируем обратно кнопку
                $(".c-load-more.is-loading").removeAttr("disable").removeClass("is-loading");
            }
        });
    });

    // Обратный звонок
    var timerText = $('#call-modal .c-timer .c-timer__text'),
        time = 15000,
        timeDelta = 10,
        appTime,
        timeout;

    $("#call-modal .c-btn").click(function() {
        if($("#call-modal .c-form__field_phone .js-phone-field").val().length <= 0) {
            $("#call-modal .c-form__field_phone .js-phone-field").addClass("form-control is-invalid");
        } else {
            var ct_node_id = '1';
            var ct_site_id = '562';
            var ct_data = {
                phoneNumber: $("#call-modal .c-form__field_phone .js-phone-field").val(),
                subject: 'Заказ обратного звонка',
                sessionId: window.call_value
            };
            jQuery.ajax({
                url: 'https://api-node' + ct_node_id + '.calltouch.ru/calls-service/RestAPI/requests/' + ct_site_id + '/register/',
                dataType: 'json',
                type: 'POST',
                data: ct_data
            });

            var call_data = {
                action: "call",
                phone: $("#call-modal .c-form__field_phone .js-phone-field").val(),
                urlPage: window.location.href
            };
            $.ajax({
                method: "POST",
                url: 'https://sanbest.ru/bitrix/ajax/Callback.php',
                data: call_data,
                success: function (data) {
                    console.log(data);
                }
            });

            $("#call-modal .c-form__field_phone .js-phone-field").removeClass("form-control is-invalid");
            appTime = time + timeDelta;
            timer();
        }
    });

    function format($time) {
        var result='00:';
        if($time<10)
            result=result+'0';
        result=result+number_format($time,2,'.','');
        return result;
    }

    function number_format( number, decimals, dec_point, thousands_sep ){
        var i, j, kw, kd, km;
        if( isNaN(decimals = Math.abs(decimals)) ){
            decimals = 2;
        }
        if( dec_point == undefined ){
            dec_point = ",";
        }
        if( thousands_sep == undefined ){
            thousands_sep = ".";
        }
        i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
        if( (j = i.length) > 3 ){
            j = j % 3;
        } else{
            j = 0;
        }
        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
        return km + kw + kd;
    }

    function timer(){
        appTime=appTime-timeDelta;
        if(appTime >= 0) {
            if(timeout) {
                clearTimeout(timeout);
            }

            $("#call-modal .c-btn").attr("disabled", "disabled");
            $("#call-modal .c-form__field_phone .js-phone-field").attr("disabled", "disabled");
            timeout = setTimeout(timer, timeDelta);
            timerText.text(format(appTime / 1000));
        } else {
            if(timeout) {
                clearTimeout(timeout);
            }

            $("#call-modal .c-btn").removeAttr("disabled");
            $("#call-modal .c-form__field_phone .js-phone-field").removeAttr("disabled");
            $("#call-modal .message").removeClass("d-none");
        }
    }

    // Мобильное меню
    $(".c-navbar__catalog-btn").each(function() {
        $(this).click(function() {
            $(".c-catalog-menu-mobile").toggle("slow");
        });
    });

    // Определение геолокации для отображения баннера
    var client_ip = $("#client_ip").val();

    if ($("#client_ip").length && client_ip.length > 0) {
        $.post("/bitrix/ajax/SxGeo22_API/geo.php", {'action': 'geo', 'condition': 'isMoscow', 'ip': client_ip}).done(function(data) {
            // console.log('geo:begin');
            // console.log(data);
            // console.log('geo:end');
            if (data == "") {
                $('.geo-banner-flex').css('display', 'flex');
                $('.geo-banner-block').css('display', 'block');
            }
        });
    }


    var productLeftColumn = $('#product-left-column');
    var productRightColumn = $('#product-right-column');
    if(productLeftColumn.length){

	    $(window).scroll(function(){
	    	if($(window).width() >= 1200) return;
	    	if($(window).scrollTop() >= ($(productLeftColumn).offset().top + $(productLeftColumn).find('.c-product-info').height() ) ) {
	    		$(productRightColumn).css({
	    			'max-width': '100%',
	    			'flex-basis': '100%'
	    		})
	    	} else{
	    		$(productRightColumn).attr('style', '');
	    	}
	    });
    }
});