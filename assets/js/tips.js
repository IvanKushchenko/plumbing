import $ from 'jquery';

$(function() {
    function checkPosCodeTip() {
        var codeContainer = $('.c-product-info__code');
        $('.c-tip_code').css({
            'top': ((codeContainer.offset().top - $(window).scrollTop()) - (codeContainer.height() / 2) + 10) + 'px',
            'left': (codeContainer.offset().left - $('.c-tip_code').width()) + 'px'
        })
        $('.c-tip_code').show();
    }
    checkPosCodeTip();

    function checkPosProductsTip() {
        var productsContainer = $('.js-scroll-to-options');
        $('.c-tip_products').css({
            'top': ((productsContainer.offset().top - $(window).scrollTop()) - (productsContainer.height()) - 20) + 'px',
            'left': (productsContainer.offset().left - $('.c-tip_products').width() - 20) + 'px'
        })
        $('.c-tip_products').show();
    }
    checkPosProductsTip();
    $(window).scroll(function() {
        var codeContainer = $('.c-product-info__code');
        var productsContainer = $('.js-scroll-to-options');
        var bottomPos = $(window).scrollTop() + $(window).height();
        checkPosProductsTip();
        checkPosCodeTip();
        if (bottomPos >= codeContainer.offset().top) {
            if(!$('.c-tip_code').show()) $('.c-tip_code').show();
        }
         if (bottomPos >= productsContainer.offset().top) {
         	if(!$('.c-tip_products').show()) $('.c-tip_products').show();
            
        }
    })

    $(window).resize(function(){
    	checkPosCodeTip();
    	checkPosProductsTip();
    })
})