import $ from 'jquery';
import CountUp from 'countup.js';
$(function() {

    var products = [];
    var productsNewCostCounter = new CountUp("c-product__price-number_new", 0, 0);
    var productsOldCostCounter = new CountUp("c-product__price-number_old", 0, 0);
    var productsMobileOldCostCounter = new CountUp("c-product__price-mobile-number_old", 0, 0);
    var productsMobileNewCostCounter = new CountUp("c-product__price-mobile-number_new", 0, 0);
    var productsMobileBottomOldCostCounter = new CountUp("c-product__price-mobile-bottom-number_old", 0, 0);
    var productsMobileBottomNewCostCounter = new CountUp("c-product__price-mobile-bottom-number_new", 0, 0);
    var productsFixedCostCounter = new CountUp("c-product__price-number-fixed", 0, 0);
    var productsFixedMobileCostCounter = new CountUp("c-product__price-number-fixed-mobile", 0, 0);
    var productsStaticCostCounter = new CountUp("c-product__price-number-static", 0, 0);
    var productsStaticMobileCostCounter = new CountUp("c-product__price-number-static-mobile", 0, 0);

    $('.js-table_product .c-product-card__btn').click(function(e) {
        e.preventDefault();
        var table = $(this).parents('.c-table__body');
        var currentProduct = $(this).parents('.c-product-card');
        var articul = currentProduct.find('.c-product-card__subtitle').text().replace(/^\D+/g, '');;
        var img = currentProduct.find('.c-product-card__img').attr('src');
        var name = currentProduct.find('.c-product-card__title').text();
        var price = (currentProduct.find('.c-product-card__price_new').eq(0).length) ? currentProduct.find('.c-product-card__price_new').eq(0).text() : currentProduct.find('.c-product-card__price').eq(0).text();
        var product = {
            articul: articul,
            img: img,
            name: name,
            price: price
        };
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $(this).text('Выбрать');
            table.find('.c-product-card__btn').removeClass('is-disabled');
            $(products).each(function(i, item) {
                if (item.articul == articul) products.splice(i, 1);
            })
            removeProductFromSlider(product);
        } else {
            table.find('.c-product-card__btn').addClass('is-disabled');
            $(this).removeClass('is-disabled').addClass('is-active');
            $(this).text('Выбрано');
            products.push(product)
            addProductToSlider(product);
        }
        checkoutProducts();


    })

    $('.js-table_options .c-product-card__btn').click(function(e) {
        e.preventDefault();
        var table = $(this).parents('.c-table__body');

        var currentProduct = $(this).parents('.c-product-card');
        var articul = currentProduct.find('.c-product-card__subtitle').text().replace(/^\D+/g, '');
        var img = currentProduct.find('.c-product-card__img').attr('src');
        var name = currentProduct.find('.c-product-card__title').text();
        var price = (currentProduct.find('.c-product-card__price_new').eq(0).length) ? currentProduct.find('.c-product-card__price_new').eq(0).text() : currentProduct.find('.c-product-card__price').eq(0).text();
        var product = {
            articul: articul,
            img: img,
            name: name,
            price: price
        };
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $(this).text('Добавить');
            $(products).each(function(i, item) {
                if (item.articul == articul) products.splice(i, 1);
            })
            removeProductFromSlider(product);
        } else {
            $(this).addClass('is-active');
            $(this).text('Добавлено');

            products.push(product)
            addProductToSlider(product);
        }
        checkoutProducts();
    })

     $(document).on('click', '.c-checkout-product__remove', function(e) {
    	e.preventDefault();
    	var removedProductArticul = $(this).parents('.c-checkout-product').attr('data-articul');
    	$(products).each(function(i, item) {
            if (item.articul == removedProductArticul){
            	products.splice(i, 1);
            } 
        })
        $(this).parents('.c-checkout-product').remove();
        $('.c-product-card[data-articul="'+$(this).parents('.c-checkout-product').attr('data-articul')+'"]').find('.c-product-card__btn.is-active').removeClass('is-active').text('Выбрать');
        checkoutProducts();
       		
        	$('.js-checkout-products-fixed')[0].swiper.update();
        	$('.js-checkout-products-static')[0].swiper.update();
    })


    function removeProductFromSlider(product) {
        var sliderContainer = $('.js-product-order-checkout-static .swiper-wrapper, .js-product-order-checkout-fixed .swiper-wrapper');
        sliderContainer.find('.swiper-slide[data-articul="' + product.articul + '"]').remove();
        $(products).each(function(i, item) {
            if (item.articul == product.articul) products.splice(i, 1);
        })
        checkoutProducts();
        console.log( $('.js-product-order-checkout-fixed .js-checkout-products'));
        $('.js-checkout-products-fixed')[0].swiper.update();
        $('.js-checkout-products-static')[0].swiper.update();
    }

    function addProductToSlider(product) {
        var sliderContainer = $('.js-product-order-checkout-static .swiper-wrapper, .js-product-order-checkout-fixed .swiper-wrapper');

        var slide = $('<div>').addClass('swiper-slide c-checkout-product').attr('data-articul', product.articul);
        slide.html(`
			<a href='#' class="c-checkout-product__remove"></a>
			<div class="c-checkout-product__img">
				<img src="` + product.img + `">
			</div>
			<div class="c-checkout-product__title">` + product.name + `</div>
			<div class="c-checkout-product__price">` + product.price + `</div>
		`);
        sliderContainer.append(slide);
         setTimeout(function(){
        	$('.js-checkout-products-fixed')[0].swiper.update();
        	$('.js-checkout-products-static')[0].swiper.update();
        }, 100)
    }


    function checkoutProducts() {
        var orderCheckoutBl = $('.js-product-order-checkout-static, .js-product-order-checkout-fixed, .c-product__order-info');
        var resultCost = 0;
        $(products).each(function(i, item) {
            resultCost = resultCost + +item['price'].replace(/\D+/g, '');
        })
        orderCheckoutBl.find('.c-product__choosen-count').text(products.length + " товара");
        // orderCheckoutBl.find('.c-product__price-number').text(resultCost);
        productsNewCostCounter.update(+resultCost);
        productsOldCostCounter.update(+resultCost);
        productsMobileOldCostCounter.update(+resultCost);
        productsMobileNewCostCounter.update(+resultCost);
        productsMobileBottomOldCostCounter.update(+resultCost);
        productsMobileBottomNewCostCounter.update(+resultCost);
        productsFixedCostCounter.update(+resultCost);
        productsFixedMobileCostCounter.update(+resultCost);
        productsStaticCostCounter.update(+resultCost);
        productsStaticMobileCostCounter.update(+resultCost);
    }
});