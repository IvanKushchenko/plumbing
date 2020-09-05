import $ from 'jquery';
import { CountUp } from 'countup.js';
import lightGallery from 'lightgallery';

$(function() {


	var CountUpOptions = {
		init: false,
		separator: ' ',
	};

    var products = window.products = [];
    
    var productOrderInfoBlock = $('.js-product-order-checkout-static');

    var mainProductArticul = productOrderInfoBlock.data('articul');
    var mainProductPrice = $("#c-product__price-number_new").html();
    var mainProductPriceOld = $("#c-product__price-number_old").length ? $("#c-product__price-number_old").html(): null;
    var mainProductName = productOrderInfoBlock.data('name');
    var mainProductImg = productOrderInfoBlock.data('img');


    if(!$('.c-product .js-table_product').length){
	    products.push({
	    	articul: mainProductArticul,
	        img: mainProductImg,
	        name: mainProductName,
	        price: mainProductPrice,
	        price_old: mainProductPriceOld,
	    })
    }

    $('.c-product-card__input:checked').parents('.c-product-card_radio').addClass('is-active');
    $('.c-product-card__input:checked').parents('.c-product-card_checkbox').addClass('is-active');

    $('.c-table_product, .c-table_options').each(function(index, item){
    	var currentProducts = $(this).find('.c-product-card_radio.is-active, .c-product-card_checkbox.is-active');
    	if(!currentProducts.length) return;
    	currentProducts.each(function(index, item){
	        var articul = $(item).attr('data-articul');
	        var img = $(item).find('.c-product-card__img img').attr('src');
	        var name = $(item).find('.c-product-card__title').text();
	        var price = ($(item).find('.c-product-card__price_new').eq(0).length) ? $(item).find('.c-product-card__price_new').eq(0).text() : $(item).find('.c-product-card__price').eq(0).text();
	        var priceOld = ($(item).find('.c-product-card__price_old').eq(0).length) ? $(item).find('.c-product-card__price_old').eq(0).text() : null;

	        var product = {
	            articul: articul,
	            img: img,
	            name: name,
	            price: price,
	            price_old: priceOld
	        };
	        if($(this).parents('.c-product-card_checkbox').length){
	        	$(this).parents('.c-product-card_checkbox').addClass('is-active');
	        }else if($(this).parents('.c-product-card_radio').length){
	        	$(this).parents('.c-product-card_radio').addClass('is-active');
	        }

		    products.push(product)
		    setTimeout(function(){
		    	// checkoutProducts();

		    }, 100)
    		
    	})
    })


    // $('.js-table_product .c-product-card_radio .c-product-card__input, .js-table_options .c-product-card_checkbox .c-product-card__input').on('change', function(e) {
    //  	e.preventDefault();
    //  	var table = $(this).parents('.c-table__body');
        
        
    //     if($(this).parents('.c-product-card_checkbox').hasClass('is-active')){
    //     	var product = $(this).parents('.c-product-card_checkbox');
    //     	var currentActiveProductArticul = product.attr('data-articul');
	   //      var currentActiveProductImg = product.find('.c-product-card__img img').attr('src');
	   //      var currentActiveProductName = product.find('.c-product-card__title').text();
	   //      var currentActiveProductPrice = (product.find('.c-product-card__price_new').eq(0).length) ? product.find('.c-product-card__price_new').eq(0).text() : currentActiveProduct.find('.c-product-card__price').eq(0).text();
	   //  	if(products.length){
		  //       $(products).each(function(i, item) {
		  //       	if (item.articul == currentActiveProductArticul) products.splice(i, 1);
		  //       });
	   //     }
	   //      var currentActiveProductData = {
	   //          articul: currentActiveProductArticul,
	   //          img: currentActiveProductImg,
	   //          name: currentActiveProductName,
	   //          price: currentActiveProductPrice
	   //      };
	   //      removeProductFromSlider(currentActiveProductData);
		  //   product.removeClass('is-active');
    //     }else{
    //     	var currentProduct = $(this).parents('.c-product-card');
	   //      var articul = currentProduct.attr('data-articul');
	   //      var img = currentProduct.find('.c-product-card__img img').attr('src');
	   //      var name = currentProduct.find('.c-product-card__title').text();
	   //      var price = (currentProduct.find('.c-product-card__price_new').eq(0).length) ? currentProduct.find('.c-product-card__price_new').eq(0).text() : currentProduct.find('.c-product-card__price').eq(0).text();

	   //      var product = {
	   //          articul: articul,
	   //          img: img,
	   //          name: name,
	   //          price: price
	   //      };
	   //      $(this).parents('.c-product-card_checkbox').addClass('is-active');
		  //   products.push(product)
		  //   addProductToSlider(product);
		  //   setTimeout(function(){
		  //   	checkoutProducts();

		  //   }, 100)
    //     }
    //     var currentActiveProduct = table.find('.c-product-card_radio.is-active');
    //     if(currentActiveProduct.length){
	   //      // var currentActiveProductArticul = currentActiveProduct.find('.c-product-card__subtitle').text().replace(/^\D+/g, '');
	   //      var currentActiveProductArticul = currentActiveProduct.attr('data-articul');
	   //      var currentActiveProductImg = currentActiveProduct.find('.c-product-card__img img').attr('src');
	   //      var currentActiveProductName = currentActiveProduct.find('.c-product-card__title').text();
	   //      var currentActiveProductPrice = (currentActiveProduct.find('.c-product-card__price_new').eq(0).length) ? currentActiveProduct.find('.c-product-card__price_new').eq(0).text() : currentActiveProduct.find('.c-product-card__price').eq(0).text();
	   //  	if(products.length){
		  //       $(products).each(function(i, item) {
		  //       	if (item.articul == currentActiveProductArticul) products.splice(i, 1);
		  //       });
	   //     }
	   //      var currentActiveProductData = {
	   //          articul: currentActiveProductArticul,
	   //          img: currentActiveProductImg,
	   //          name: currentActiveProductName,
	   //          price: currentActiveProductPrice
	   //      };
	   //      removeProductFromSlider(currentActiveProductData);
		  //    currentActiveProduct.removeClass('is-active');
	   //  }else if(!$(this).parents('.c-product-card_radio').hasClass('is-active') && !$(this).parents('.c-product-card_checkbox').length){
	   //  	var currentProduct = $(this).parents('.c-product-card');
	   //      var articul = currentProduct.attr('data-articul');
	   //      var img = currentProduct.find('.c-product-card__img img').attr('src');
	   //      var name = currentProduct.find('.c-product-card__title').text();
	   //      var price = (currentProduct.find('.c-product-card__price_new').eq(0).length) ? currentProduct.find('.c-product-card__price_new').eq(0).text() : currentProduct.find('.c-product-card__price').eq(0).text();

	   //      var product = {
	   //          articul: articul,
	   //          img: img,
	   //          name: name,
	   //          price: price
	   //      };
	   //      $(this).parents('.c-product-card_radio').addClass('is-active');
		  //   products.push(product)
		  //   addProductToSlider(product);
		  //   setTimeout(function(){
		  //   	checkoutProducts();

		  //   }, 100)
	   //  }

    //  })

    $('.js-table_product .c-product-card_radio .c-product-card__input, .js-table_options .c-product-card_checkbox .c-product-card__input').on('change', function(e) {
		e.preventDefault();
		if($(this).parents('.c-product-card_checkbox').length && $(this).parents('.c-product-card_radio').length) return;

		var tableBody = $(this).parents('.c-table__body');

		var producIsRadio = $(this).parents('.c-product-card_radio').length;
		var producIsCheckbox = $(this).parents('.c-product-card_checkbox').length;

		var product = producIsRadio ? $(this).parents('.c-product-card_radio') : $(this).parents('.c-product-card_checkbox');
		var selectedProductArticul = product.attr('data-articul');
		var selectedProductImg = product.find('.c-product-card__img img').attr('src');
		var selectedProductName = product.find('.c-product-card__title').text();
		var selectedProductPrice = (product.find('.c-product-card__price_new').eq(0).length) ? product.find('.c-product-card__price_new').eq(0).text() : product.find('.c-product-card__price').eq(0).text();
		var selectedProductPrice_old = (product.find('.c-product-card__price_old').eq(0).length) ? product.find('.c-product-card__price_old').eq(0).text() : product.find('.c-product-card__price').eq(0).text();
		var selectedProductIsActive = product.hasClass('is-active');
		
		var selectedProductData = {
			articul: selectedProductArticul,
			img: selectedProductImg,
			name: selectedProductName,
			price: selectedProductPrice,
			price_old: selectedProductPrice_old,
			removeble: true
		};

		if (producIsCheckbox) {

			if (selectedProductIsActive) {
				if (products.length) {
					$(products).each(function (i, item) {
						if (item.articul == selectedProductArticul) products.splice(i, 1);
					});
				}

				product.removeClass('is-active');
			} else {

				product.addClass('is-active');
				products.push(selectedProductData);
				
			}
		} else if (producIsRadio) {
			

			if (!selectedProductIsActive) {
				
				var currentActiveRadioProduct = tableBody.find('.c-product-card_radio.is-active');

				if (currentActiveRadioProduct.length) {

					var currentActiveRadioProductArticul = currentActiveRadioProduct.attr('data-articul');

					// Убираем предыдущий активный
					if (currentActiveRadioProduct.length && products.length) {
						$(products).each(function (i, item) {
							if (item.articul == currentActiveRadioProductArticul) products.splice(i, 1);
						});
					}

					currentActiveRadioProduct.removeClass('is-active');

					product.addClass('is-active');
					products.push(selectedProductData);
				}
			}
		}
		setTimeout(function () {
			checkoutProducts();
		}, 100);
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
        } else {
            $(this).addClass('is-active');
            $(this).text('Добавлено');
            currentProduct.addClass('is-active');

            products.push(product)
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
        // $('.c-product-card[data-articul="'+$(this).parents('.c-checkout-product').attr('data-articul')+'"]').find('.c-product-card__btn.is-active').removeClass('is-active').text('Выбрать');
        $('.c-product-card[data-articul="'+$(this).parents('.c-checkout-product').attr('data-articul')+'"]').find('.c-product-card__input:checked').click();
        checkoutProducts();

        if(!$('.js-checkout-products-fixed .c-checkout-product').length) {
        	 $('.js-product-order-checkout-static').collapse("hide");
        }

    })

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
        var resultOldCost = 0;
        $(products).each(function(i, item) {
            resultCost = resultCost + +item['price'].replace(/\D+/g, '');
            resultOldCost = item['price_old'] ? resultOldCost + +item['price_old'].replace(/\D+/g, '') : null;
        });

        if(!CountUpOptions.init){
	        new CountUp("installement-cost", +resultCost / 12, { duration: 0.00001, separator: ' '}).start();
	    } else{
	        new CountUp("installement-cost", +resultCost / 12, CountUpOptions).start();
	    }

        orderCheckoutBl.find('.c-product__choosen-count').text(products.length + " товара");
        if(!CountUpOptions.init){
	        [
	        	'c-product__price-number_new',
	        	'c-product__price-mobile-number_new',
	        	'c-product__price-mobile-bottom-number_new',
	        	'c-product__price-number-fixed',
	        	'c-product__price-number-fixed-mobile',
	        	'c-product__price-number-static',
	        	'c-product__price-number-static-mobile',
	        	'c-product__price-number-fixed_new',
	        	'c-product__price-number-fixed-mobile_new',
	        	'c-product__price-number-static_new',
	        	'c-product__price-number-static-mobile_new',
	        ].forEach(function(item){
		        new CountUp(item, +resultCost, {useEasing: false, duration: 0.00001, separator: ' '}).start();
	        });

	        [
	        	'c-product__price-number_old',
	        	'c-product__price-mobile-number_old',
	        	'c-product__price-mobile-bottom-number_old',
	        	'c-product__price-number-fixed_old',
	        	'c-product__price-number-fixed-mobile_old',
	        	'c-product__price-number-static_old',
	        	'c-product__price-number-static-mobile_old',
	        ].forEach(function(item){
	        	if(!resultOldCost) return;
		        new CountUp(item, +resultOldCost, {useEasing: false, duration: 0.00001, separator: ' '}).start();
	        });
	        CountUpOptions.init = true;
        } else{
        	[
        		'c-product__price-number_new',
	        	'c-product__price-mobile-number_new',
	        	'c-product__price-mobile-bottom-number_new',
	        	'c-product__price-number-static',
	        	'c-product__price-number-static-mobile',
	        	'c-product__price-number-fixed_new',
	        	'c-product__price-number-fixed-mobile_new',
	        	'c-product__price-number-static_new',
	        	'c-product__price-number-static-mobile_new',
        	].forEach(function(item){
		        new CountUp(item, +resultCost, CountUpOptions).start();
	        });

	        [
	        	'c-product__price-number_old',
	        	'c-product__price-mobile-number_old',
	        	'c-product__price-mobile-bottom-number_old',
	        	'c-product__price-number-fixed_old',
	        	'c-product__price-number-fixed-mobile_old',
	        	'c-product__price-number-static_old',
	        	'c-product__price-number-static-mobile_old',
	        ].forEach(function(item){
		        new CountUp(item, +resultOldCost, CountUpOptions).start();
	        });
        }

        
    }

    if($('.c-product').length) checkoutProducts();


    $('.c-product-card__remove-btn').click(function(){
    	if($(this).parents('.c-table__row-wrap_kit').length){
    		$(this).parents('.c-table__row-wrap_kit').remove();
    	}else{
    		$(this).parents('.c-product-card').remove();
    	}
    })

});