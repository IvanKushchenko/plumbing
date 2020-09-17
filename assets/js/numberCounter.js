const numberCounter = (function(element = null){
	var value = 0;
	var events = [];

	setValue( Number($(element).find('.js-number-counter-input').val()) || 0 );
	setDOMEvents();

	function setValue(newValue){
		newValue = newValue < 0 ? 0 : newValue;
		value = newValue;

		setInputValue(value);
	}

	function setInputValue(){
		var nodeInput = $(element).find('.js-number-counter-input');
		nodeInput.val(value);
	}

	function callEventCallback(event){
		findEvent(event).forEach(event => event.callback(value));
	}

	function findEvent(event){
		return events.filter(evt => evt.event === event);
	}

	function upHandler(){
		let newVal = Number( value + 1 || 0 );

		setValue( valueBounds(newVal) );
		
		if(findEvent('up')) callEventCallback('up');
	}

	function downHandler(){
		let newVal = Number( value - 1 || 0 );

		setValue( valueBounds(newVal) );

		if(findEvent('down')) callEventCallback('down');

	}

	function changeHandler(evt){
		let newVal = Number( evt.target.value || 0 );

		setValue( valueBounds(newVal) );

		if(findEvent('change')) callEventCallback('change');
	}

	function valueBounds(value){
		if (!value || value <= 0) {
            return 1;
        } else if (value > 99) {
            return 99;
        } else{
        	return value
        }
	}

	function inputHandler(evt){
		let newVal = Number( evt.target.value || 0) ;
		setValue( valueBounds(newVal) );

        if(findEvent('input')) callEventCallback('change');
	}

	function setDOMEvents(){
		var nodeActionUp = $(element).find('.js-number-counter-up');
		var nodeActionDown = $(element).find('.js-number-counter-down');
		var nodeInput = $(element).find('.js-number-counter-input');

		nodeActionDown.click(downHandler);
		nodeActionUp.click(upHandler);
		nodeInput.change(changeHandler);
		nodeInput.on('input', inputHandler);
	}

	function on(listenEvents = '', callback){
		const type = (Object.prototype.toString.call(listenEvents)).replace(/\[object /gi, ``).replace(/\]/gi, ``);

		switch(type) {
			case 'String':
				events.push({event: listenEvents, callback});
				break;
			case 'Array':
				listenEvents
					.map(event => ({event, callback }) )
					.forEach(event => events.push(event));
				break;
			default: return;
		}
	}

	return {
		on
	}

});

export default numberCounter;