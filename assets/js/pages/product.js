import lightGallery from 'lightgallery';
import Panel from '@js/components/panel';
import ReadMore from '@js/components/readMore';
import { getElement, removeSpaces, getDeclentionWord } from '@js/helpers';
import Tip from '@js/components/tip';
import CountUp from 'countup.js';
import _throttle from 'lodash/throttle';
const Product = (function(){
	const columnLeftElement = getElement('#product-left-column'),
		  columnRightElement = getElement('#product-right-column'),
		  productPreviewElement = getElement('.js-product-preview-main'),
		  productOrderInfoElement = getElement('.js-product-order-info'),
		  productInfoDescriptionElement = getElement('.js-product-info-description'),
		  productDescriptionElement = getElement('.js-product-description'),
		  panelOrderCheckoutElement = getElement('.js-panel-order-checkout'),
		  panelOrderCheckoutCounterElement = getElement('.js-panel-order-checkout-counter'),
		  productCodeElement = getElement('.js-product-code'),
		  productCodeHintElement = getElement('.js-product-code-hint'),
		  addToBasketBtnElement = getElement('.c-btn-buy'),
		  productsCardsInputsElements = getElement('.js-product-card-input'),
		  tipCodeElement = getElement('.js-tip-code'),
		  modalOneclickElement = getElement('.js-modal-oneclick'),
		  formOneclickElement = getElement('.js-form-oneclick'),
		  productPriceNewElement = getElement('.js-product-price-new'),
		  productPriceOldElement = getElement('.js-product-price-old'),
		  tableProductElement = getElement('.js-table-products'),
		  productLightboxElements = getElement('.js-product-lightbox'),
		  buyInputElement = getElement('#buy_input');
	let productDescription = new ReadMore( productDescriptionElement,  976);
	let panelOrderCheckout = new Panel( panelOrderCheckoutElement );
	let tipCode = tipCodeElement ? new Tip('code') : null;

	let products = [];

	const product = {
		articul: productOrderInfoElement ? productOrderInfoElement.data('articul') : 0,
		name: productOrderInfoElement ? productOrderInfoElement.data('name') : 0,
		img: productOrderInfoElement ? productOrderInfoElement.data('img') : 0,
		price: productPriceNewElement ? removeSpaces(productPriceNewElement.text()) : 0,
		priceOld: productPriceOldElement ? removeSpaces(productPriceOldElement.text()) : productPriceNewElement
	}
	
	/**
	 * Добавляем главный продукт, если нет таблицы с продуктами
	 */
	function addInitialProduct(){
		if(tableProductElement) return;

		products.push(product);
	}

	function addChosenProducts(){
		const allChosenProducts = getAllChosenProducts();

		allChosenProducts.each((idx, product) => {
			product = $(product);
			let productData = {
				articul: product.data('articul'),
				img: product.data('img'),
	            name: product.data('name'),
	            price: parseInt( removeSpaces(product.data('price')) ) || 0,
	            priceOld: parseInt( removeSpaces(product.data('price-old')) ) || parseInt( removeSpaces(product.data('price')) )
			}

			products.push(productData);
		})
	}

	function refreshProducts(){
		products = [];
		addInitialProduct();
		addChosenProducts();
		refreshAllProductsActiveClass();
		refreshAllPrices();
	}

	const CountUpOptions = {
		init: false,
		separator: ' ',
	};

	const installementCost = new CountUp("installement-cost", 0, 0, 0, 0.4, CountUpOptions);

	let productPriceCountUpInstances = {
		new: [],
		old: []
	};

	function createProductPricesCountUp() {
		$(['product-price', 'panel-order-checkout-price']).each((index, element) => {
			let countUpPriceNew = new CountUp(`${element}-new`, Number(product.price), 0, 0, .4, CountUpOptions);
			let countUpPriceOld = new CountUp(`${element}-old`, Number(product.priceOld), 0, 0, .4, CountUpOptions);
			productPriceCountUpInstances['new'].push( countUpPriceNew );
			productPriceCountUpInstances['old'].push( countUpPriceOld );
		});
	}

    function hideLeftColumn(){
    	if($(window).width() >= 1200) return;
	    	if($(window).scrollTop() >= ($(columnLeftElement).offset().top + $(columnLeftElement).find('.c-product-info').height() ) ) {
	    		$(columnRightElement).css({
	    			'max-width': '100%',
	    			'flex-basis': '100%'
	    		})
	    	} else{
	    		$(columnRightElement).attr('style', '');
	    	}
    }

	function initProductPreviewLightgallery(){
		if( !productPreviewElement ) return;

		productPreviewElement.lightGallery({
	        selector: '.js-product-preview-item'
	    })
	}

	function checkHidePosProductOrderPanel(){
		if(!productOrderInfoElement || !productDescriptionElement ) return;

		let windowScrollTop = $(window).scrollTop();
		let windowHeight = $(window).height();

		
		windowScrollTop > productOrderInfoElement.offset().top + productOrderInfoElement.outerHeight() &&
		( windowScrollTop + windowHeight) < (productDescriptionElement.offset().top + productDescriptionElement.outerHeight())
			? showPanelOrderCheckout() : hidePanelOrderCheckout();
	}

	function hidePanelOrderCheckout(){
		if(!panelOrderCheckout) return;

		panelOrderCheckout.hide();
	}

	function showPanelOrderCheckout(){
		if(!panelOrderCheckout || !columnRightElement) return;
		var style = {
			left: columnRightElement.position().left + parseInt( columnRightElement.css("paddingLeft") ),
			width: columnRightElement.width()
		};

		panelOrderCheckout.show(style);
	}

	function productInfoCollapseHandler(status){
		if(!status) return;
		$('.js-product-info-collapse-toggle a').text(status === 'hide' ? 'Показать все характеристики' : 'Свернуть характеристики');
	}

	function setProductInfoCollapseEvents(){
		if(!productInfoDescriptionElement) return;
		productInfoDescriptionElement.on('hide.bs.collapse', () => productInfoCollapseHandler('hide'))
		productInfoDescriptionElement.on('show.bs.collapse', () => productInfoCollapseHandler('show'))
	}

	function showTipCode(options){
		if(!tipCodeElement || !productCodeElement) return;
		let isTablet = $(window).outerWidth() < 768;

		tipCode.setPlacement(isTablet ? 'bottom' : 'left');
		tipCode.show(setCoordsTipCode(), options);
	}

	function initialShowTipCode(){
		showTipCode({
			autohide: {
				delay: 15000
			},
			show: {
				delay: 1000
			}
		})
	}

	function hideTipCode(){
		tipCode.hide();
	}

	function setCoordsTipCode(){
		if(!tipCodeElement || !productCodeElement) return;
		let isTablet = $(window).outerWidth() < 768;
		let top = productCodeElement.offset().top - $(window).scrollTop() + (productCodeElement.outerHeight() / 2) - (tipCodeElement.outerHeight() / 2);
		let left = productCodeElement.offset().left + (productCodeElement.outerWidth());

		if(isTablet) top = top - (tipCodeElement.outerHeight() / 2) - (productCodeElement.outerHeight() / 2) - 15;
		if(isTablet) left = left - (tipCodeElement.outerWidth() / 2) - (productCodeElement.outerWidth() / 2);

		
		tipCode.setCoords({top, left});
		return {top, left};
	}

	function setProductHintEvents(){
		if(!productCodeHintElement) return;
		productCodeHintElement.hover(showTipCode, hideTipCode);
	}

	function getAllChosenProducts(){
		return $('.js-table-products input:checked, .js-table-options input:checked');
	}

	function getAllProducts(){
		return $('.js-table-products input, .js-table-options input');
	}


	function addProductToCart(id, ob, neob, price, coupon, product_data){
    	return $.post("/catalog/callback.php", {
    		'action': 'ADD2BASKET',
    		id,
    		ob,
    		neob,
    		price,
    		coupon,
    		product_data
    	});
    }


    function getProductData(){
    	const product = $("#product_id");
		const offer = $("#offer_id");
		const set = $("#set_id");
		const allChosenProducts = getAllChosenProducts();

		// Если обычный товар
		const isProduct = product.length > 0 && product.val() > 0;
		// Если товар c торговыми предложениями
		const isOffer = offer.length > 0 && offer.val() > 0;
		// Если набор
		const isSet = set.length > 0 && set.val() > 0;


    	var productData = new Object; 

        switch(true) {
        	case isProduct:
        		productData.product_id = product.val();
        		break;
        	case isOffer:
        		productData.offer_id = offer.val();
        		productData.offers = [];
        		break;
        	case isSet:
        		productData.offers = [];
        		productData.set_id = set.val();
        		break;
        }


        allChosenProducts.each(function() {
        	const product = $(this);
        	const productParent = product.parent();
        	const productType = product.attr('type'),
        		  productVal = product.val(),
        		  article = productParent.attr("data-articul"),
       			  priceBeforeDiscount = productParent.find("#price_before_discount").val(),
       			  discountText = productParent.find('#discount_text').val();

       		switch(true) {
	        	case isProduct && productType == 'radio':
	        		productData.article = article;
		            productData.price_before_discount = priceBeforeDiscount;
		            productData.discount_text = discountText;
		        	break;
	        	case isOffer && productType == 'radio':
	        	case isSet && productType == 'radio':
	        		productData.offers[productData.offers.length] = {
	        			'id': productVal,
	        			'article': article,
	        			'price_before_discount': priceBeforeDiscount,
	        			'discount_text': discountText
	        		};
		        	break;
		        case productType == 'checkbox':
		        	productData.options[productData.options.length] = { 
		        		'id': productVal,
		        		'article': article,
		        		'price_before_discount': priceBeforeDiscount,
		        		'discount_text': discountText
		        	};
		        	break;

	       	}
	    });

	    return productData;
    }

    function refreshAllProductsActiveClass(){
    	const allProducts = getAllProducts();
    	allProducts.each((idx, product) => {
    		const isChecked = $(product).is(':checked');
    		const parent = $(product).parent();
    		isChecked ? parent.addClass('is-active') : parent.removeClass('is-active')
    		
    	})
    }

	function addToBasketHandler(){
		const allChosenProducts = getAllChosenProducts();
		const coupon = $("#coupon").val();
		const productData = getProductData();
		var ob = null;
			neob = null;
        	allProductsRequests = [];

		/**
		 * Очищаем Блок-котент модального окна 
		 * успешного добавления товара в корзину
		 * TODO: отрефакторить
		 */
		$("#basket_checked_block").text('');

        allChosenProducts.each(function() {
        	const product = $(this);
        	const productParent = product.parent();
        	const productType = product.attr('type'),
        		  productVal = product.val(),
        		  productTitle = product.attr("title_name");
        		  productPrice = product.attr("price") || product.attr("old_price");
        		  productImage = product.attr("file_item");
       			  inputSetParentIdVal = $("input[name=SetParentId]").val();

	       	switch(productType) {
	       		case 'radio':
	       			if (ob.length > 0) {
	                    ob += ":";
	                }

	                ob += productVal;

	                if(inputSetParentIdVal) {
						ob = inputSetParentIdVal + ":" + ob;
	                }

	       			break;
	       		case 'checkbox':
	       			if (neob.length > 0) {
	                    neob += ":";
	                }

	                neob += productVal;
	       			break;
	       	}

	       	allProductsRequests.push( addProductToCart(productVal, ob, neob, productPrice, coupon, JSON.stringify(productData) ) );

	       	$("#basket_checked_block").append(`<div class='c-table__row c-product-card c-product-card_radio mb-4' data-articul=''>
				<div class='c-table__cell pl-0'>
					<div class='c-product-card__img-wrap js-product-lightbox'>
						<a class='c-product-card__img' href='${productImage}'>
							<img  src='${productImage}' alt=''>
						</a>
						</div>
					</div>
				<div class='c-table__cell'>
					<a class='c-product-card__title' href='#!'>${productTitle}</a>
					
				</div>
				<div class='c-table__cell pl-0'>
					<div class='c-product-card__subtitle d-flex flex-column mb-2 pb-2'><span class='c-product__price-number' style='font-weight:500'>${price}</span></div>
				</div>
			</div>`);
        })
 
        $.when(...allProductsRequests).done(function(){
        	const BX = window.BX;
        	const bx_basketFKauiI = window.bx_basketFKauiI;
			const data = {
				sessid: BX.bitrix_sessid(),
				siteId: bx_basketFKauiI.siteId,
				templateName: bx_basketFKauiI.templateName,
				arParams: bx_basketFKauiI.arParams
			};

			BX.ajax({
				url: bx_basketFKauiI.ajaxPath,
				method: 'POST',
				dataType: 'html',
				data: data,
				onsuccess: function(result){
					/**
					 * Меняем кол-во товаров в окне "товар добавлен в корзину"
					 * TODO: отрефакторить
					 */
					$('#send-basket-modal-products-count').text( $($(result)[4]).text() );

					/**
					 * Меняем кол-во товаров навигации
					 * TODO: отрефакторить
					 */
					$('.c-navbar__counter').text($($(result)[4]).text());

					/**
					 * Меняем цену всех товаров в окне "товар добавлен в корзину"
					 * TODO: отрефакторить
					 */
                    $('#send-basket-modal-products-price').text($($($(result)[8])).find(".c-navbar__total-price").text());
				}
			});

			/* Очищаем массив запросов на добавление товара  */
			allProductsRequests = [];

		});
        
	}



	async function formOneClickSubmitHandler(e){
		e.preventDefault(); // Предотвращаем дефолтное поведение формы

		const productData = getProductData(),
			  form = $(this);
			  

		const id = buyInputElement.val(),
			  phone = form.find('.js-phone-field').val(),
        	  email = form.find('.js-email-field').val(),
        	  name = form.find('.js-name-field').val();
		const ctNodeId = '1',
			  ctSiteId = '562',
			  ctData = {
			  	phoneNumber: phone,
			  	subject: 'Покупка в 1 клик',
			  	sessionId: window.call_value
			  };
       	var coupon = null;
			errorMsg = false;

    
        var chackRules = {
            'phone': 'Пожалуйста, введите номер телефона для связи!'
        };
    
    
        for (var key in chackRules) {
    
            var inputValue = form.find(`.js-${key}-field`).val();
            if (inputValue.length < 3){
                errorMsg += chackRules[key];
            }
   
        }
    
        if (errorMsg) {
            alert(errorMsg);
            return false;
        } 

        form.hide();
        modalOneclickElement.find(".modal-body").append(`<p class="text-center">Спасибо за заказ! Мы свяжемся с вами по телефону: ${phone}</p>`);

        try{
	        await $.post("/bitrix/ajax/BuyOneClick.php", {
	        	product_id: id,
	        	product_data: productData,
	        	name, 
	        	phone, 
	        	email, 
	        	coupon, 
	        });
	        
	        $.post({
	            url: `https://api-node${ctNodeId}.calltouch.ru/calls-service/RestAPI/requests/${ctSiteId}/register/`,
	            dataType: 'json',
	            data: ctData
	        });

        } catch(error){
        	console.error(error);
        }

        return false; // Предотвращаем дефолтное поведение формы
	}


	/**
	 * Записывает id всех выбранных продуктов 
	 * в скрытый input c id = buy_input
	 * Нужно было для аналитики, теперь видимо нет
	 * TODO: узнать нужно ли это попрежнему 
	 */
	function setProductsChosenIds() {
		if(!buyInputElement) return;
		const product = $(this);
		const allChosenProducts = getAllChosenProducts();
			  productType = product.attr('type'),
			  productVal = product.val();

        var result = [];

        allChosenProducts.each(function() {
        	result.push(productVal);
        	const inputSetParentIdVal = $("input[name=SetParentId]").val();

        	if(productType === 'radio' && inputSetParentIdVal){
				result.unshift(inputSetParentIdVal);
        	}
        });

        result.join(':');

        buyInputElement.val(result);
    }

	function setDOMEvents(){
		$(document).ready(showPanelOrderCheckout);
		$(window).scroll(showPanelOrderCheckout);
		$(window).scroll(checkHidePosProductOrderPanel);
		$(window).resize( _throttle(showPanelOrderCheckout, 100) );
		$(window).scroll(setCoordsTipCode);
		$(window).resize( _throttle(setCoordsTipCode, 100) );
		$(window).on('load', initialShowTipCode);

		if(columnLeftElement) $(window).scroll(hideLeftColumn);

		setProductHintEvents();
		setProductInfoCollapseEvents();

		if ( addToBasketBtnElement ) addToBasketBtnElement.click(addToBasketHandler);

		if ( productsCardsInputsElements ) productsCardsInputsElements.each((idx, input) => {
			$(input).on('change', setProductsChosenIds)
			$(input).on('change', refreshProducts)
		});

		if(formOneclickElement) formOneclickElement.submit(formOneClickSubmitHandler);
	}

	function initProductCardLightgallery(){
		if(!productLightboxElements) return;
		productLightboxElements.each((index, item) => {
	    	$(item).lightGallery({
	    		controls: false,
	    		download: false,
	    		counter: false,
	    		enableDrag: false,
	    		enableSwipe: false
	    	});
	    })
	}


	function refreshAllPrices(){

        const price = products.reduce((acc, item) => acc + item.price, 0),
        	  priceOld = products.reduce((acc, item) => acc + item.priceOld, 0),
        	  productsLength = products.length,
        	  getDeclentionOfProducts = (num) => getDeclentionWord(num, {nom: 'Товар', gen: 'Товара', plu: 'Товаров'})
        if(panelOrderCheckoutCounterElement) panelOrderCheckoutCounterElement.text(`${productsLength} ${getDeclentionOfProducts(productsLength)}`);
        
        $(productPriceCountUpInstances['new']).each((idx, item) => item.update(price) );
        $(productPriceCountUpInstances['old']).each((idx, item) => item.update(priceOld) );
        installementCost.update(price / 12);
	}

	function init(){
		createProductPricesCountUp();
		setDOMEvents();
		productDescription.init();
		refreshProducts();
		refreshAllProductsActiveClass();
		initProductPreviewLightgallery();
		initProductCardLightgallery();
	}

	return {
		init
	}
});
export default Product;