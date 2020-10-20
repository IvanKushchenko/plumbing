import { isObject, getElement } from '@js/helpers';

const Panel = (function(element = null){
	const panel = getElement(element);

	function hide(){
		if(!panel) return;
		if (!panel.is(':hidden')) {
			panel.hide();
		}
	}

	function show({left, width}){
		if(!panel) return;
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