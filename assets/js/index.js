import '../scss/index.scss';
import 'bootstrap'; 
import $ from 'jquery';

import Swiper from 'swiper';

var previewThumbnails = new Swiper('.js-product-preview-thumbnails', {
	slidesPerView: 3,
	spaceBetween: 15,
	slideToClickedSlide: true,
	navigation: {
		nextEl: '.c-product-preview__thumbnails .swiper-button-next'
	}
});

var checkoutProducts = new Swiper('.js-checkout-products', {
	slidesPerView: 5,
	spaceBetween: 20,
	navigation: {
		nextEl: '.c-checkout-products .swiper-button-next',
		prevEl: '.c-checkout-products .swiper-button-prev'
	},
	scrollbar:{
		el: '.js-checkout-products .swiper-scrollbar'
	}
});

$('.c-checkout-product__remove').click(function(){
	$(this).parents('.c-checkout-product').remove();
	checkoutProducts.update();
})

$('#order-checkout-products').on('shown.bs.collapse', function () {
	console.log("Showed")
	checkoutProducts.update();
})