import '../scss/index.scss';
import 'bootstrap';
import $ from 'jquery';
import lightGallery from 'lightgallery';

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

    $('.c-checkout-product__remove').click(function() {
        $(this).parents('.c-checkout-product').remove();
        checkoutProducts.update();
    })

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
        $(window).scroll(function() {
	    	if($(this).scrollTop() + $(this).height() >= productCheckoutStatic.offset().top){
	    		productCheckoutFixed.hide();
	    	}else{
	    		productCheckoutFixed.show();
	    	}

	    })
    }
    orderCheckoutInfo();

});