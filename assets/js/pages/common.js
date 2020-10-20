import { checkElementExist, getElement } from '@js/helpers';
import FormCall from '@js/components/FormCall';
import FileUploader from '@js/components/FileUploader';
import selectric from 'selectric';
require('jquery-mask-plugin').default;

const Common = (function(){
	const clientIp = $("#client_ip").val();
	const formCall = new FormCall(getElement('.js-form-call'));
	const fileUploadersElements = $(".js-file-uploader");
	let menuShowed = false;

	function initFileUploaders(){
		fileUploadersElements.each((idx, item) => (new FileUploader(item)).init() )
	}

    // Определение геолокации для отображения баннера
    async function showDeliveryBanner(){
    	if(!clientIp) return;
    	
    	let data = await $.post("/bitrix/ajax/SxGeo22_API/geo.php", {'action': 'geo', 'condition': 'isMoscow', 'ip': clientIp});
    	if(data !== "") return;
        $('.geo-banner-flex').css('display', 'flex');
        $('.geo-banner-block').css('display', 'block');
    }

	function hideHiddenContent(){
		if($(".navbar-all-hidden").length) $(".navbar-all-hidden").hide();
	}

	function loadMoreClickHandler(e){
		e.preventDefault();
		$(this).addClass('is-loading');
	}

	function scrollTo(e){
		e.preventDefault();
		var target = $( $(this).attr('href') );
		if( !checkElementExist(target) ) return;

		$('html').animate({
    		scrollTop: target.offset().top
    	})
	}

	function initPlugins(){
		$('select').selectric();

		$('.js-date-field').mask("00.00.0000")
		$('.js-price-field-input').mask('000 000 000 000 000', {reverse: true});
		$('.js-phone-field').mask("+7 (000) 000-00-00", {placeholder: "+7", dataMask: true, watchInputs: true, watchDataMask: true});
	}

	function setDOMEvents(){
		$('.c-load-more').on('click', loadMoreClickHandler);
		$('.js-scroll-to').on('click', scrollTo);
		$('.js-catalog-menu-toggle').click(function(){
			let nav = $(this).parent().find('.js-catalog-menu-nav');
			if(menuShowed){
				menuShowed = false;
				nav.hide();
				if($('.js-overlay').length) $('.js-overlay').remove();
			}else{
				menuShowed = true;
				nav.show();
				let overlay = $('<div>');
				overlay.addClass('o-overlay js-overlay');
				$('body').append(overlay);
			}
		});

		$('body').on('click', '.js-overlay', function(){ 
			let nav = $('.js-catalog-menu-toggle').parent().find('.js-catalog-menu-nav');
			menuShowed = false;
			nav.hide();
			$('.js-overlay').remove();
		})
	}

	function init(){
		setDOMEvents();
		hideHiddenContent();
		initPlugins();
		formCall.init();
		initFileUploaders();
	}

	return {
		init
	}
});

export default Common;