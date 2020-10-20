import { getElement } from '@js/helpers';
const SortSelect = (function(element){
	const sortElement = getElement(element);

    function checkSelect(){
    	var val = $(this).find("option:selected").val();

        $.post(window.location.href, {sort: val})
            .done(function(data) {
                window.location.reload(true);
            });
    }

    function setDOMEvents(){
		if(sortElement) sortElement.change(checkSelect);
	}

	function init() {
		setDOMEvents();
	}

	return {
		init
	}
});

export default SortSelect;