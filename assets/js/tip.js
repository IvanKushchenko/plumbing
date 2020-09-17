import { isObject, checkElementExist } from './helpers';

const Tip = (function(tipName, options){
	const tip = $(`.js-tip-${tipName}`);
	const tipExist = checkElementExist(tip);
	var hideTipTimeout = null;

	function checkOptionsExist(){
		return isObject(options);
	}

	function getOption(option){
		if(!checkOptionsExist() || !options.hasOwnProperty(option)) return;
		return options[option];
	}

	function hideTip(delay = 0){
		if(hideTipTimeout) clearTimeout(hideTipTimeout);
		if(!delay) return;
		hideTipTimeout = setTimeout(() => {
			tip.hide();
		}, delay);
	}

	function show({top, left}){
		if(!tipExist) return;
		top = top - (tip.outerHeight() / 2);
		tip.css({top, left});


		if (tip.is(':hidden')) {
            tip.show();
        }

        hideTip( getOption('delay') );

	}
	return {
		show
	}
});

export default Tip;