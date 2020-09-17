import { checkElementExist } from './helpers';
const Common = (function(){

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

	function setDOMEvents(){
		$('.c-load-more').on('click', loadMoreClickHandler);
		$('.js-scroll-to').on('click', scrollTo);
	}

	function init(){
		setDOMEvents();
		hideHiddenContent();
	}

	return {
		init
	}
});

export default Common;