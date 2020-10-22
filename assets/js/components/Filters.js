import { getElement, checkType, isArray, removeSpaces } from '@js/helpers';
import Filter from './Filter';
const Filters = (function(element){
	const filtersElement = getElement(element);
	var sectionCodeElement = filtersElement ? filtersElement.find('#section_code') : null;
	let filters = [];
	let events = [];

	function initFilters(){
		if( !filtersElement ) return;
		let filtersElements = filtersElement.find('.js-filter');

		filters = filtersElements.map((idx, el) => new Filter(el) );
		filters.each((idx, filter) => {
			filter.init();
			filter.on('change', function(val) {
				callEventCallback.bind(this)('change', val);
			})

			filter.on('input', function(val) {
				callEventCallback.bind(this)('input', val);
			})
		})
	}

	function generatedFilterUrl() {
        const str_fields = getSerialized( getAllInputs() );
        var url = str_fields.replace(/&/g, "-and-").replace(/=/g, "-is-");

        $.each(['price', 'length', 'width', 'height', 'depth'], function(idx, prop) {
        	const from = filtersElement.find(`#${prop}_from`);
        	const fromBegin = Number( $(from).data("begin") );
        	const fromVal = Number( removeSpaces( $(from).val() ) );
	        const to = filtersElement.find(`#${prop}_to`);
	        const toBegin = Number( $(to).data("to") );
	        const toVal = Number( removeSpaces( $(to).val() ) );

			if ( from.length && 
			   ( fromBegin !== fromVal || toBegin !== toVal || $(from).data("selected") == 1 ) ) {
				if (url != "") url += "-and-";

				url += "price-is-" + fromVal + "-to-" + toVal;
			}
        })

        return url;
    }

    function getAllCheckboxes(){
    	return filtersElement.find('.js-checkbox');
    }

	function getAllInputs(){
		if(!filtersElement) return;
		return filtersElement.find('input');
	}

	function getAllCheckedInputs(){
		if(!filtersElement) return;
		return filtersElement.find('input:checked');
	}

	function getSerialized (elements) {
		if(!(elements instanceof $)) return;
		return elements.serialize();
	}

	function callEventCallback(event, value){
		if(!findEvents(event)) return;
		findEvents(event).forEach(event => event.callback.bind(this)(value));
	}

	function findEvents(event){
		return events.filter(evt => evt.event == event);
	}

	function getSectionCode(){
		return sectionCodeElement ? sectionCodeElement.val() : null;
	}

	function choosedTagCloseHandler(){
		const parent = $(this).parent();
		const type = parent.data("prop");
		const val = parent.data("val");
		const processTypes = ['price', 'length', 'width', 'height', 'depth'];
		const sectionCode = getSectionCode();
		const generatedUrl = generatedFilterUrl();
		
		if(processTypes.includes(type)){
			const from = filtersElement.find(`#${prop}_from`);
            const to = filtersElement.find(`#${prop}_to`);

            if (from.length > 0 && to.length > 0) {
               $(from).data("selected", false);
               $(to).data("selected", false);
            }
		} else {
            filtersElement.find(".js-checkbox-input[name='`${type}`'][value='`${val}`']").removeAttr("checked");
        }

        window.location.href = `/catalog/${sectionCode}/${generatedUrl ? `filter/${generatedUrl}/apply/` : ''}`;

	}

	function setDOMEvents(){
		if(filtersElement) filtersElement.on('click', '.js-choosed-tag-close', choosedTagCloseHandler);
		$('.js-price-field').click(function(){ $(this).find('.js-price-field-input').focus(); })
	}

	function on(listenEvents, callback){
		switch(checkType(listenEvents)) {
			case 'string':
				events.push({event: listenEvents, callback})
				break;
			case 'array':
				listenEvents
					.map(event => ({event, callback}) )
					.forEach(event => events.push(event) )
				break;
		}
	}

	function init(){
		setDOMEvents();
		initFilters();
	}

	return {
		init,
		getSerialized,
		generatedFilterUrl,
		getSectionCode,
		getAllCheckedInputs,
		getAllCheckboxes,
		on
	}
});
export default Filters;