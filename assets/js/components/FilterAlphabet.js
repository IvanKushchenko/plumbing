import { getElement, isString, isArray, checkType } from '@js/helpers';
const FilterAlphabet = (function(element, letters){
	const filterElement = getElement(element),
		  filterItemsElements = filterElement ? filterElement.find('.js-alphabet-filter-item') : null;
	var events = [];

	function setLettersShow(){
		if( !isArray(letters) ) return;
		filterItemsElements.each((i, e) => {
			let letterElement = $(e);
			let letter = letterElement.attr('data-letter');
			let letterNoindex = letterElement.attr('data-noindex');

			if( !isString(letter) ) return;

			if(!letters.includes(letter) && !letterNoindex) letterElement.hide();
		})
	}

	function callEventCallback(event, value){
		if(!findEvent(event)) return;
		findEvent(event).forEach(event => event.callback(value));
	}

	function findEvent(event){
		return events.filter(evt => evt.event === event);
	}

	function changeFilterLetter(){
		let activeLetterElement = filterElement.find('.is-active');
		let newActiveLetterElement = $(this);
		let newActiveLetter = newActiveLetterElement.attr('data-letter');
		activeLetterElement.removeClass("is-active");
		newActiveLetterElement.addClass("is-active");
		callEventCallback('change', newActiveLetter);
	}

	function on(listenEvents, callback){
		switch(checkType(listenEvents)) {
			case 'string':
					events.push({event: listenEvents, callback});
				break;
			case 'array':
					listenEvents
						.map(event => {event, callback})
						.forEach(event => events.push(event) );
				break;
		}
	}

	function setDOMEvents(){
		filterItemsElements.click(changeFilterLetter);
	}

	function init(){
		if(!filterElement) return;
		setLettersShow();
		setDOMEvents();
	}

	

	return {
		init,
		on
	}
});
export default FilterAlphabet;