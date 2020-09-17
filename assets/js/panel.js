import { isObject, checkElementExist } from './helpers';

const Panel = (function(element = null){
	const panel = $(element),
		  panelExist = checkElementExist(element);

	function hide(){
		if(!panelExist) return;
		if (!panel.is(':hidden')) {
			panel.hide();
		}
	}

	function show({left, width}){
		if(!panelExist) return;
		panel.css({left, width});

		if (panel.is(':hidden')) {
            panel.show();
        }
	}

	return {
		show,
		hide
	}
});
export default Panel;