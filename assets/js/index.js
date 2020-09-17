import 'bootstrap';
import $ from 'jquery';

import selectric from 'selectric';
require('jquery-mask-plugin').default;


require('./products');
require('./tips');
require('./file-uploader');

import Basket from './basket';
import Catalog from './catalog';
import Common from './common';
import Navbar from './navbar';
import Sliders from './sliders';
import Product from './product';
$(function() {
	const pages = [
		new Basket(),
		new Catalog(),
		new Common(),
		new Product()
	];

	const components = [
		new Navbar(),
		new Sliders()
	];

	pages.forEach(page => { page.init() } );

	components.forEach(component => { component.init() } );


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

	function setProductCode(){
		if(!$('.c-tip_code').length) return;

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
	}
	setProductCode();
	

	

	
	



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

    $("#basket_checked_block").text();
    // Кнопка "в корзину"
    $(".c-btn-buy").click(function() {
    	$("#basket_checked_block").text('');
        // Новая обработка параметров: begin
        var product_data = new Object; 
        
        // Если обычный товар
        if ($("#product_id").length > 0 && $("#product_id").val() > 0) {
            product_data.product_id = $("#product_id").val();

            product_data.options = [];
            $("input:checked").each(function() {
                if($(this).attr("type") == "radio") {
                    var article = $(this).parent().attr("data-articul");

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
                  	var article = $(this).parent().attr("data-articul");

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
                	var article = $(this).parent().attr("data-articul");
                    
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
					var article = $(this).parent().attr("data-articul");
                    
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
                    var article = $(this).parent().attr("data-articul");
                    
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
                    var article = $(this).parent().attr("data-articul");
                    
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
        // var id = $("#buy_input").val();
        var id = parseInt($(this).attr("item"));
        // var article_value = $(this).attr("article_value");
        var allOptionsRequests = [];
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
            id = $(this).val();
			var title_name = $(this).attr("title_name");
			var price = $(this).attr("price");
			var file_item = $(this).attr("file_item");

			if(!price){
				price = $(this).attr("old_price");
			}

			product_data = JSON.stringify(product_data);
			
			allOptionsRequests.push( addToCart(id, ob, neob, price, coupon, product_data) );
			$("#basket_checked_block").append("<div class='c-table__row c-product-card c-product-card_radio mb-4'  data-articul=''><div class='c-table__cell'><div class='c-product-card__img-wrap js-product-lightbox'><a class='c-product-card__img' href='"+file_item+"'><img  src='"+file_item+"' alt=''></a></div></div><div class='c-table__cell'><a class='c-product-card__title' href='#!'>"+title_name+"</a><div class='c-product-card__subtitle d-flex flex-column mb-2 pb-2'>Цена<span class='c-product__price-number' style='font-weight:500'>"+price+"</span></div></div></div>");
        });

        function addToCart(id, ob, neob, price, coupon, product_data){
        	return $.post("/catalog/callback.php", {'action': 'ADD2BASKET', 'id': id, 'ob': ob, 'neob': neob, price: price, 'coupon': coupon, 'product_data': product_data}, function(data) { 
					if(data!="f") $(".notify.product").show();
		            // RefreshCart();
		            // Modal
		            // $("body").css("overflow", "hidden");
		            // $("#с-product-buy-notify").show();
		        });
        }

        if (ob == "undefined") {
            ob = "";
        }

        if (neob == "undefined") {
            neob = "";
        }

        if (coupon == "undefined") {
            coupon = "";
        }

        $.when(...allOptionsRequests).done(function(){
			var data = {};
			data.sessid = BX.bitrix_sessid();
			data.siteId = bx_basketFKauiI.siteId;
			data.templateName = bx_basketFKauiI.templateName;
			data.arParams = bx_basketFKauiI.arParams;

			BX.ajax({
				url: bx_basketFKauiI.ajaxPath,
				method: 'POST',
				dataType: 'html',
				data: data,
				onsuccess: function(result){
					$('#send-basket-modal-products-count').text($($(result)[4]).text());
					$('.c-navbar__counter').text($($(result)[4]).text());
					$('#send-basket-modal-products-price').text($($(result)[8]).text());
				}
			});

			allOptionsRequests = [];

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
    var menuShowed = false;
    $(".c-navbar__catalog-btn_close").on('click touchstart', function(e) {
    	e.preventDefault();
    	$(".c-catalog-menu-mobile").css("display", "none");
    });

    $(".c-navbar__catalog-btn_open").on('click touchstart', function(e) {
    	e.preventDefault();
    	$(".c-catalog-menu-mobile").css("display", "block");
		$(".c-catalog-menu-mobile").css("width", "100%");
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