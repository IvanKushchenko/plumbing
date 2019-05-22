import $ from 'jquery';
import CountUp from 'countup.js';
import lightGallery from 'lightgallery';

$(function() {
	var CountUpOptions = {
		separator: ' '
	};
    var products = [];
    var productsNewCostCounter = new CountUp("c-product__price-number_new", 0, 0, 0, 0, CountUpOptions);
    var productsOldCostCounter = new CountUp("c-product__price-number_old", 0, 0, 0, 0, CountUpOptions);
    var productsMobileOldCostCounter = new CountUp("c-product__price-mobile-number_old", 0, 0, 0, 0, CountUpOptions);
    var productsMobileNewCostCounter = new CountUp("c-product__price-mobile-number_new", 0, 0, 0, 0, CountUpOptions);
    var productsMobileBottomOldCostCounter = new CountUp("c-product__price-mobile-bottom-number_old", 0, 0, 0, 0, CountUpOptions);
    var productsMobileBottomNewCostCounter = new CountUp("c-product__price-mobile-bottom-number_new", 0, 0, 0, 0, CountUpOptions);
    var productsFixedCostCounter = new CountUp("c-product__price-number-fixed", 0, 0, 0, 0, CountUpOptions);
    var productsFixedMobileCostCounter = new CountUp("c-product__price-number-fixed-mobile", 0, 0, 0, 0, CountUpOptions);
    var productsStaticCostCounter = new CountUp("c-product__price-number-static", 0, 0, 0, 0, CountUpOptions);
    var productsStaticMobileCostCounter = new CountUp("c-product__price-number-static-mobile", 0, 0, 0, 0, CountUpOptions);
    var productsFixedOldCostCounter = new CountUp("c-product__price-number-fixed_old", 0, 0, 0, 0, CountUpOptions);
    var productsFixedNewCostCounter = new CountUp("c-product__price-number-fixed_new", 0, 0, 0, 0, CountUpOptions);
    var productsFixedMobileNewCostCounter = new CountUp("c-product__price-number-fixed-mobile_new", 0, 0, 0, 0, CountUpOptions);
    var productsFixedMobileOldCostCounter = new CountUp("c-product__price-number-fixed-mobile_old", 0, 0, 0, 0, CountUpOptions);
    var productsStaticOldCostCounter = new CountUp("c-product__price-number-static_old", 0, 0, 0, 0, CountUpOptions);
    var productsStaticNewCostCounter = new CountUp("c-product__price-number-static_new", 0, 0, 0, 0, CountUpOptions);
    var productsStaticMobileNewCostCounter = new CountUp("c-product__price-number-static-mobile_new", 0, 0, 0, 0, CountUpOptions);
    var productsStaticMobileOldCostCounter = new CountUp("c-product__price-number-static-mobile_old", 0, 0, 0, 0, CountUpOptions);


    $('.c-product-card__input:checked').parents('.c-product-card_radio').addClass('is-active');

    $('.c-table_product').each(function(index, item){
    	var currentProduct = $(this).find('.c-product-card_radio.is-active');
        var articul = currentProduct.attr('data-articul');
        var img = currentProduct.find('.c-product-card__img img').attr('src');
        var name = currentProduct.find('.c-product-card__title').text();
        var price = (currentProduct.find('.c-product-card__price_new').eq(0).length) ? currentProduct.find('.c-product-card__price_new').eq(0).text() : currentProduct.find('.c-product-card__price').eq(0).text();

        var product = {
            articul: articul,
            img: img,
            name: name,
            price: price
        };
        $(this).parents('.c-product-card_radio').addClass('is-active');
	    products.push(product)
	    addProductToSlider(product);
	    setTimeout(function(){
	    	checkoutProducts();

	    }, 100)
    })


     $('.js-table_product .c-product-card_radio .c-product-card__input').on('change', function(e) {
     	e.preventDefault();
     	var table = $(this).parents('.c-table__body');
        
        var currentActiveProduct = table.find('.c-product-card_radio.is-active');
        if(currentActiveProduct.length){
	        // var currentActiveProductArticul = currentActiveProduct.find('.c-product-card__subtitle').text().replace(/^\D+/g, '');
	        var currentActiveProductArticul = currentActiveProduct.attr('data-articul');
	        var currentActiveProductImg = currentActiveProduct.find('.c-product-card__img img').attr('src');
	        var currentActiveProductName = currentActiveProduct.find('.c-product-card__title').text();
	        var currentActiveProductPrice = (currentActiveProduct.find('.c-product-card__price_new').eq(0).length) ? currentActiveProduct.find('.c-product-card__price_new').eq(0).text() : currentActiveProduct.find('.c-product-card__price').eq(0).text();
	    	if(products.length){
		        $(products).each(function(i, item) {
		        	if (item.articul == currentActiveProductArticul) products.splice(i, 1);
		        });
	       }
	        var currentActiveProductData = {
	            articul: currentActiveProductArticul,
	            img: currentActiveProductImg,
	            name: currentActiveProductName,
	            price: currentActiveProductPrice
	        };
	        removeProductFromSlider(currentActiveProductData);
		     currentActiveProduct.removeClass('is-active');
	    }
	    if(!$(this).parents('.c-product-card_radio').hasClass('is-active')){
	    	var currentProduct = $(this).parents('.c-product-card');
	        var articul = currentProduct.attr('data-articul');
	        var img = currentProduct.find('.c-product-card__img img').attr('src');
	        var name = currentProduct.find('.c-product-card__title').text();
	        var price = (currentProduct.find('.c-product-card__price_new').eq(0).length) ? currentProduct.find('.c-product-card__price_new').eq(0).text() : currentProduct.find('.c-product-card__price').eq(0).text();

	        var product = {
	            articul: articul,
	            img: img,
	            name: name,
	            price: price
	        };
	        $(this).parents('.c-product-card_radio').addClass('is-active');
		    products.push(product)
		    addProductToSlider(product);
		    setTimeout(function(){
		    	checkoutProducts();

		    }, 100)
	    }


     })

    $('.js-table_product .c-product-card__btn').click(function(e) {
        e.preventDefault();
        var table = $(this).parents('.c-table__body');
        
        var currentActiveProduct = table.find('.c-product-card__btn.is-active').parents('.c-product-card');
	    
	    if(currentActiveProduct.length){
	        var currentActiveProductArticul = currentActiveProduct.find('.c-product-card__subtitle').text().replace(/^\D+/g, '');
	        var currentActiveProductImg = currentActiveProduct.find('.c-product-card__img img').attr('src');
	        var currentActiveProductName = currentActiveProduct.find('.c-product-card__title').text();
	        var currentActiveProductPrice = (currentActiveProduct.find('.c-product-card__price_new').eq(0).length) ? currentActiveProduct.find('.c-product-card__price_new').eq(0).text() : currentActiveProduct.find('.c-product-card__price').eq(0).text();
	    	if(products.length){
		        $(products).each(function(i, item) {
		        	if (item.articul == currentActiveProductArticul) products.splice(i, 1);
		        });
	       }
	        var currentActiveProductData = {
	            articul: currentActiveProductArticul,
	            img: currentActiveProductImg,
	            name: currentActiveProductName,
	            price: currentActiveProductPrice
	        };
	        removeProductFromSlider(currentActiveProductData);
		     
	    }

	    

    	if(!$(this).hasClass('is-active')){
	    	var currentProduct = $(this).parents('.c-product-card');
	        var articul = currentProduct.find('.c-product-card__subtitle').text().replace(/^\D+/g, '');;
	        var img = currentProduct.find('.c-product-card__img img').attr('src');
	        var name = currentProduct.find('.c-product-card__title').text();
	        var price = (currentProduct.find('.c-product-card__price_new').eq(0).length) ? currentProduct.find('.c-product-card__price_new').eq(0).text() : currentProduct.find('.c-product-card__price').eq(0).text();

	        var product = {
	            articul: articul,
	            img: img,
	            name: name,
	            price: price
	        };


		    $(this).text('Выбрано');
		    $(this).addClass('is-active');
		    currentProduct.addClass('is-active');
		    products.push(product)
		    addProductToSlider(product);
		    setTimeout(function(){
		    	checkoutProducts();

		    }, 100)
	    }

	    currentActiveProduct.find('.c-product-card__btn').text('Выбрать');
	    currentActiveProduct.find('.c-product-card__btn').removeClass('is-active');
	    currentActiveProduct.removeClass('is-active');
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
            currentProduct.removeClass('is-active');
            
            $(this).text('Добавить');
            $(products).each(function(i, item) {
                if (item.articul == articul) products.splice(i, 1);
            })
            removeProductFromSlider(product);
        } else {
            $(this).addClass('is-active');
            $(this).text('Добавлено');
            currentProduct.addClass('is-active');

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
         	$('.js-checkout-products-static').each(function(index, item){
	        	item.swiper.update();
	        })
	        $('.js-checkout-products-fixed').each(function(index, item){
	        	item.swiper.update();
	        })
        }, 200)
    }

    $('.js-product-lightbox').each(function(index, item){
    	$(item).lightGallery({
    		controls: false,
    		download: false,
    		counter: false,
    		enableDrag: false,
    		enableSwipe: false
    	});
    })


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
	        productsFixedOldCostCounter.update(+resultCost);
			productsFixedNewCostCounter.update(+resultCost);
			productsFixedMobileNewCostCounter.update(+resultCost);
			productsFixedMobileOldCostCounter.update(+resultCost);
			productsStaticOldCostCounter.update(+resultCost);
			productsStaticNewCostCounter.update(+resultCost);
			productsStaticMobileNewCostCounter.update(+resultCost);
			productsStaticMobileOldCostCounter.update(+resultCost);
        
    }



    $('.c-product-card__remove-btn').click(function(){
    	if($(this).parents('.c-table__row-wrap_kit').length){
    		$(this).parents('.c-table__row-wrap_kit').remove();
    	}else{
    		$(this).parents('.c-product-card').remove();
    	}
    })

});