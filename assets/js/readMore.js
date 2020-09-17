import { checkElementExist } from './helpers';
const ReadMore = (function(element, count){
	if( !checkElementExist( $(element) ) ) return false;
	const parent = $(element),
		  content = parent.find('.js-read-more-content'),
		  btn = parent.find('.js-read-more-btn');

	function toggleContent(e){
		e.preventDefault();
		if(content.hasClass('is-active')){
    		$(this).text('Развернуть');
    		content.removeClass('is-active')
    	}else{
    		$(this).text('Свернуть');
    		content.addClass('is-active')
    	}
	}

	function setDOMEvents(){
		btn.click(toggleContent);
	}

	function checkContentLength(){
		if(!count) return;
		if (content.text().length < count) {
	        content.addClass('is-active');
	        btn.hide();
	    }
	}

	function init(){
		setDOMEvents();

		checkContentLength();
	}

	return {
		init
	}
});

export default ReadMore;