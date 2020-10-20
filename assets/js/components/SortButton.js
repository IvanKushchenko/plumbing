import { getElement } from '@js/helpers';
const SortButton = (function(element){
	const sortElement = getElement(element),
		  sortItemElement = sortElement ? sortElement.find('.js-sort-button-item') : null;
		  

    function clickDropdownElement(e){
    	e.preventDefault();
    	var sortInputElement = getElement( $(this).find('.js-sort-button-input') );
    	if(!sortInputElement) return;
    	var val = sortInputElement.val();
        $.post(window.location.href, {sort: val})
            .done(function(data) {
                window.location.reload(true);
            });
    }

    function setDOMEvents(){
		if(sortElement) sortElement.click(clickDropdownElement);
	}

	function init() {
		setDOMEvents();
	}

	return {
		init
	}
});

export default SortButton;