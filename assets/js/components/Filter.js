import { getElement, checkType } from '@js/helpers';
const Filter = (function(element){
	const filterElement = getElement(element),
		  filterInputsElements = filterElement ? filterElement.find('input') : null;

	let events = [];

	function callEventCallback(event, value){
		if(!findEvent(event)) return;
		findEvent(event).forEach(evt => evt.callback.bind(this)(value));
	}

	function findEvent(event){
		return events.filter(evt => evt.event == event);
	}

	function changeFilterHandler(){
		let value = $(this).val();
		callEventCallback.bind(this)('change', value);
	}

	function inputFilterHandler(){
		let value = $(this).val();
		callEventCallback.bind(this)('input', value);
	}


	function getChecked(){
		if( !filterElement ) return;
		return filterElement.find('input:checked');
	}

	function on(listenEvents, callback){
		switch(checkType(listenEvents)) {
			case 'string':
				events.push({event: listenEvents, callback})
				break;
			case 'array':
				listenEvents
					.map(event => ({event, callback}) )
					.forEach(event => events.push(event))
				break;
		}
	}

	function setDOMEvents(){
		filterInputsElements.on('change', changeFilterHandler);
		filterInputsElements.on('input', inputFilterHandler);
	}

	function init(){
		setDOMEvents();
	}

	return {
		init,
		on,
		getChecked
	}
});
export default Filter;