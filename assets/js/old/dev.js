import Swiper from 'swiper';
$(function() {
    $(".c-sort .c-sort__select_search").change(function () {
        $('#search_form').submit();
    });
    $('.c-sort-mobile-search input.c-sort-mobile__input').click(function() {
        //alert($(this).val());
        //$('#search_sort').val($(this).val());
        //alert($('#search_sort').val());
        $('#mobile_search_form').submit();
    });

    var collectionSlider = new Swiper('.js-collection-slider', {
        slidesPerView: 4,
        spaceBetween: 25,
        slidesPerGroup: 4,
        breakpoints: {
            992:{
                slidesPerView: 3
            },
            450:{
                slidesPerView: 2,
                slidesPerGroup: 2
            }
        },
        navigation: {
            nextEl: '.js-collection .swiper-button-next',
            prevEl: '.js-collection .swiper-button-prev'
        },
        pagination: {
            clickable: true,
            el: '.js-collection-slider .swiper-pagination'
        }
    });

});