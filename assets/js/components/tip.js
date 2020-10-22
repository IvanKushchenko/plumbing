import { isObject, get, isString, isNumber, isFunction, getElement } from '@js/helpers';

const Tip = (function(tipName){
	const tip = getElement(`.js-tip-${tipName}`);
	var hideTipTimeout = null;
	var showTipTimeout = null;
	let placement = 'left';

	function getOption(option, options){
		if(!isObject(options) || !isString(option)) return;
		return get(option, options);
	}

	function hideTip(delay = 0){
		if(!isNumber(delay)) return;
		if(hideTipTimeout) clearTimeout(hideTipTimeout);
		hideTipTimeout = setTimeout(() => {
			if (tip.is(':visible')) tip.hide();
		}, delay);
	}

	function setCoords({top, left}){
		tip.css({top, left});
	}

	function setPlacement(direction){
		if(!isString(placement)) return;
		placement = direction;
	}

	function setContent(content){
		if(!isString(content)) return;
		tip.html(content)
	}

	function showTip(delay = 0, cb){
		cb = isFunction(arguments[0]) ? arguments[0] : cb;
		delay = isFunction(arguments[0]) ? 0 : delay;
		if(!isNumber(delay)) return;
		if(showTipTimeout) clearTimeout(showTipTimeout);

		tip.attr('data-placement', placement);
		
		showTipTimeout = setTimeout(() => {
			if (tip.is(':hidden')) tip.show();
			cb();
		}, delay);
	}

	function show(coords, ...args){
		const content = args.find(arg => isString(arg) );
		const options = args.find(arg => isObject(arg) );
		if(!tip) return;
		setCoords(coords);
		setContent(content);

		( getOption('show.delay', options) ) ? 
			showTip( getOption('show.delay', options), () => {
				hideTip( getOption('autohide.delay', options) || 1000);
			} )
			: showTip(() => {
				hideTip( getOption('autohide.delay', options) );
			})
	}

	function hide(options){
		if(!tip) return;
		( getOption('hide.delay', options) ) ? hideTip( getOption('hide.delay', options) ) : hideTip();
	}

	return {
		show,
		hide,
		setPlacement,
		setCoords
	}
});

export default Tip;