import $ from 'jquery';

$(function() {
    var codeHiden = false,
        productsHidden = false;

    function checkPosCodeTip() {
        if (codeHiden) return;
        var bottomPos = $(window).scrollTop() + $(window).height();
        var codeContainer = $('.c-product-info__code');
        $('.c-tip_code').css({
            'top': ((codeContainer.offset().top - $(window).scrollTop()) - (codeContainer.height() / 2) + 10) + 'px',
            'left': (codeContainer.offset().left - $('.c-tip_code').width() * 1.7) + 'px'
        })
        if (bottomPos >= codeContainer.offset().top) {
            if ($('.c-tip_code').is(':hidden')) {
                $('.c-tip_code').show();
                setTimeout(function() {
                    $('.c-tip_code').fadeOut(300);
                    codeHiden = true;
                }, 10000);
            }
        }
    }
    setTimeout(function() {
        checkPosCodeTip();
    }, 200)

    function checkPosProductsTip() {
        if (productsHidden) return;
        var bottomPos = $(window).scrollTop() + $(window).height();
        var productsContainer = $('.js-options');
        $('.c-tip_products').css({
            'top': ((productsContainer.offset().top - $(window).scrollTop()) + 50) + 'px',
            'left': (productsContainer.offset().left - $('.c-tip_products').width() * 1.3) + 'px'
        })
        if (bottomPos >= productsContainer.offset().top) {
            if ($('.c-tip_products').is(':hidden')) {
                $('.c-tip_products').show();
                setTimeout(function() {
                    $('.c-tip_products').fadeOut(300);
                    productsHidden = true;
                }, 10000);
            }

        }

    }
    checkPosProductsTip();
    $(window).scroll(function() {
        checkPosProductsTip();
        checkPosCodeTip();
    })

    $(window).resize(function() {
        checkPosCodeTip();
        checkPosProductsTip();
    })
})