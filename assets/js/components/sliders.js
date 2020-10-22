import Swiper from 'swiper';
const Sliders = (function(){
	var previewThumbnails = new Swiper($('.js-product-preview-page .js-product-preview-thumbnails'), {
        slidesPerView: 4,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        spaceBetween: 1,
        shortSwipes: false,
        longSwipes: false,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.js-product-preview-page .c-product-preview__thumbnails .swiper-button-next'
        }
    });

    var previewMain = new Swiper('.js-product-preview-page .js-product-preview-main', {
        simulateTouch: false,
        // autoHeight: true,
        thumbs: {
            swiper: previewThumbnails,
        },
    });


    var watchEarlierSlider = new Swiper('.js-watch-earlier-slider', {
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
            nextEl: '.js-watch-earlier .swiper-button-next',
            prevEl: '.js-watch-earlier .swiper-button-prev'
        },
        pagination: {
            clickable: true,
            el: '.js-watch-earlier-slider .swiper-pagination'
        }
    });

    var saleDaySlider = new Swiper('.js-sale-day-slider', {
        slidesPerView: 6,
        spaceBetween: 15,
        breakpoints: {
        	992:{
        		slidesPerView: 3
        	},
        	450:{
        		slidesPerView: 2
        	}
        },
        pagination: {
            clickable: true,
            el: '.c-sale-day .swiper-pagination'
        },
        navigation: {
            nextEl: '.c-sale-day .swiper-button-next',
            prevEl: '.c-sale-day .swiper-button-prev'
        },
    });

    var ourBrandsSlider = new Swiper('.js-our-brands', {
        slidesPerView: 6,
        spaceBetween: 15,
        breakpoints: {
        	992:{
        		slidesPerView: 3
        	},
        	450:{
        		slidesPerView: 2
        	}
        },
        pagination: {
            clickable: true,
            el: '.c-our-brands .swiper-pagination'
        },
        navigation: {
            nextEl: '.c-our-brands .swiper-button-next',
            prevEl: '.c-our-brands .swiper-button-prev'
        },
    });


    var topProductSlider = new Swiper('.js-top-product-slider', {
        slidesPerView: 6,
        spaceBetween: 15,
        breakpoints: {
        	992:{
        		slidesPerView: 3
        	},
        	450:{
        		slidesPerView: 2
        	}
        },
        pagination: {
            clickable: true,
            el: '.c-top-product .swiper-pagination'
        },
        navigation: {
            nextEl: '.c-top-product .swiper-button-next',
            prevEl: '.c-top-product .swiper-button-prev'
        },
    });


    var mainBanner = new Swiper('.js-main-banner-slider', {
        pagination: {
            clickable: true,
            el: '.js-main-banner-slider .swiper-pagination'
        }
    });

    var mainSharesSlider = new Swiper('.js-main-shares-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
        	992:{
        		slidesPerView: 2
        	},
        },
        navigation: {
            nextEl: '.c-main-shares .swiper-button-next',
            prevEl: '.c-main-shares .swiper-button-prev'
        },
    });

	var ourShowroomThumbnails = new Swiper('.js-our-showroom-thumbnails', {
        slidesPerView: 8,
        spaceBetween: 5,
        shortSwipes: false,
        longSwipes: false,
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
        	992: {
        		slidesPerView: 8
        	},
        	450: {
        		slidesPerView: 3
        	}
        }
    });


    var ourShowroomGallery = new Swiper('.js-our-showroom-gallery', {
        simulateTouch: false,
        thumbs: {
            swiper: ourShowroomThumbnails,
        },
        navigation: {
            nextEl: '.c-our-showroom-slider__main .swiper-button-next',
            prevEl: '.c-our-showroom-slider__main .swiper-button-prev'
        }
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


	function init(){

	}

	return {
		init
	}
});

export default Sliders;