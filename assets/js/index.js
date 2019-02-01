import '../scss/index.scss';
import 'bootstrap';
import $ from 'jquery';
import lightGallery from 'lightgallery';

require('./products');
require('./tips');

import Swiper from 'swiper';

$(function() {


    var previewThumbnails = new Swiper('.js-product-preview-thumbnails', {
        slidesPerView: 3,
        spaceBetween: 15,
        shortSwipes: false,
        longSwipes: false,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.c-product-preview__thumbnails .swiper-button-next'
        }
    });

    var previewMain = new Swiper('.js-product-preview-main', {
        simulateTouch: false,
        thumbs: {
            swiper: previewThumbnails,
        },
    });

    var watchEarlierSlider = new Swiper('.js-watch-earlier-slider', {
        slidesPerView: 4,
        spaceBetween: 25,
        navigation: {
            nextEl: '.js-watch-earlier .swiper-button-next',
            prevEl: '.js-watch-earlier .swiper-button-prev'
        },
        pagination: {
            clickable: true,
            el: '.js-watch-earlier-slider .swiper-pagination'
        }
    });

    var checkoutProducts = new Swiper('.js-checkout-products', {
        slidesPerView: 5,
        spaceBetween: 20,
        navigation: {
            nextEl: '.c-checkout-products .swiper-button-next',
            prevEl: '.c-checkout-products .swiper-button-prev'
        },
        scrollbar: {
            el: '.js-checkout-products .swiper-scrollbar'
        }
    });



    $('#order-checkout-products').on('shown.bs.collapse', function() {
        checkoutProducts.update();
    })
    var productPreviewGallery = $('#js-product-preview-thumbnails');

    $('#js-product-preview-main').lightGallery({
        selector: '.js-product-preview-item'
    })

    $('.js-product-preview-btn').on('click', function() {
        $('.js-product-preview-item').trigger('click');
    })


    function orderCheckoutInfo() {
        var orderInfo = $('.c-product__order-info');
        var productCheckoutStatic = $('.js-product-order-checkout-static');
        var productCheckoutFixed = $('.js-product-order-checkout-fixed');
        productCheckoutFixed.css({
            'left': orderInfo.offset().left + 'px',
            'width': orderInfo.parent().width() + 'px'
        })

        function checkPosAndHide() {
            if ($(window).scrollTop() + $(window).height() >= productCheckoutStatic.offset().top) {
                productCheckoutFixed.hide();
            } else {
                productCheckoutFixed.show();
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


});