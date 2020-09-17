import NumberCounter from './numberCounter';
import CountUp from 'countup.js';
const Basket = (function () {
	const CountUpOptions = {
		separator: ' ',
	};

	let CountUpInstances = [],
		total = {
	    	price: 0,
	    	priceWithoutDiscount: 0
	    }

	let basketTotalPriceCountUp,
		basketTotalPriceWithoutDiscountCountUp;

    

    function createProductCardTotalCountUp(productCardTotal){
    	$(productCardTotal).each((index, element) => {
    		element = $(element);
	        CountUpInstances[element.attr("id")] = new CountUp(element.attr("id"), Number( element.attr('data-total') ), 0, 0, 1, CountUpOptions);
    	})
    }

    function createBasketTotalCountUp(){
    	updateBasketTotal()

    	basketTotalPriceCountUp = new CountUp('basket-total-price', total.price, 0, 0, 1, CountUpOptions);
		basketTotalPriceWithoutDiscountCountUp = new CountUp('basket-total-price-without-discount', total.priceWithoutDiscount, 0, 0, 1, CountUpOptions);
    }

    

    function updateBasketTotalCountUp(){
    	basketTotalPriceCountUp.update(total.price);
    	basketTotalPriceWithoutDiscountCountUp.update(total.priceWithoutDiscount);
    }

    function updateBasketTotal(){
    	total.price = 0;
    	total.priceWithoutDiscount = 0;

    	$('.js-table-basket .js-product-card').each((index, element) => {
    		let nodeNumberCounter = $(element).find('.js-number-counter');
    		let nodeNumberCounterValue = Number( nodeNumberCounter.attr('data-count') || 1 );

    		let productCardPrice = Number( $(element).find('.js-product-card-cost').eq(0).attr('data-total') ) || null;
    		let productWithoutDiscountPrice = Number( $(element).find('.js-discount-price').attr('data-price') ) || null;
    		if(!productCardPrice) return;

    		total.price += productCardPrice * nodeNumberCounterValue;
			total.priceWithoutDiscount += productWithoutDiscountPrice * nodeNumberCounterValue || total.price;
    	});
    }
	
   	
   	function UpdateQuantityItemById(id, quantity) {
        $.ajax({
            method: "POST",
            data: { BASKET_ACTION: "UpdateQuantityItemByID", BASKET_ITEM_ID: id, QUANTITY_ITEM: quantity },
        });
    }

    function createNumberCounter(element){
    	let nodeNumberCounter = $(element).find('.js-number-counter');
		let nodeNumberCounterInput = $(nodeNumberCounter).find('.js-number-counter-input');
		let productCardPrice = Number( $(element).find('.js-product-card-cost').eq(0).attr('data-total') );

    	let numberCounter = new NumberCounter(nodeNumberCounter);

		numberCounter.on(['down', 'up', 'change'], function(count){

			$(nodeNumberCounter).attr('data-count', count);

			$(productCardTotal).each((index, element) => { 
			 	element = $(element);
			 	element.attr('data-total', count * productCardPrice);
			 	CountUpInstances[element.attr('id')].update(count * productCardPrice);
			});

			 updateBasketTotal();
			 updateBasketTotalCountUp();

	        UpdateQuantityItemById($(nodeNumberCounterInput).data("quantity-item-id"), count);
		})
    }

    function removeProductCardHandler(){
    	var id = $(this).data("delete-item-id");

        $.ajax({
            method: "POST",
            data: { BASKET_ACTION: "RemoveItemByID", BASKET_ITEM_ID: id },
            success: function (data) {
                updateBasketTotal();
            }
        });
    }

    function orderBtnHandler(){
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
    }

	function init(){
		$('.js-table-basket .js-product-card').each((index, element) => {
			let productCardTotal = $(element).find(".js-product-card-total");
			let productCardRemoveBtn = $(element).find(".js-product-card-remove");

			productCardRemoveBtn.click(removeProductCardHandler);

			createProductCardTotalCountUp(productCardTotal);
			
			createNumberCounter(element);

		})

		createBasketTotalCountUp();

		$('.order-btn').click(orderBtnHandler);
	}

	return {
		init
	}
});

export default Basket;