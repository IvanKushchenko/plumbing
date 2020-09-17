import lightGallery from 'lightgallery';
import Panel from './panel';
import ReadMore from './readMore';
import { checkElementExist, getElement } from './helpers';

const Product = (function(){
	const columnLeft = getElement('#product-left-column'),
		  columnRight = getElement('#product-right-column'),
		  productPreviewElement = getElement('.js-product-preview-main'),
		  productOrderInfo = getElement('.js-product-order-info'),
		  productDescriptionElement = getElement('.js-product-description'),
		  panelOrderCheckoutElement = getElement('.js-panel-order-checkout');
	let productDescription = productDescriptionElement ? new ReadMore( productDescriptionElement,  976) : null;
	let panelOrderCheckout = productDescriptionElement ? new Panel( panelOrderCheckoutElement ) : null;

	

	function setLightGallery(){
		if( !productPreviewElement ) return;

		productPreviewElement.lightGallery({
	        selector: '.js-product-preview-item'
	    })
	}

	function checkHidePosProductOrderPanel(){
		if(!productOrderInfo || !productDescriptionElement ) return;

		let windowScrollTop = $(window).scrollTop();
		let windowHeight = $(window).height();

		
		windowScrollTop > productOrderInfo.offset().top + productOrderInfo.outerHeight() &&
		( windowScrollTop + windowHeight) < (productDescriptionElement.offset().top + productDescriptionElement.outerHeight())
			? showPanelOrderCheckout() : hidePanelOrderCheckout();
	}

	function hidePanelOrderCheckout(){
		if(!panelOrderCheckout) return;

		panelOrderCheckout.hide();
	}

	function showPanelOrderCheckout(){
		if(!panelOrderCheckout || !columnRight) return;
		var style = {
			left: columnRight.position().left + parseInt( columnRight.css("paddingLeft") ),
			width: columnRight.width()
		};

		panelOrderCheckout.show(style);
	}

	function productInfoCollapseHandler(status){
		if(!status) return;
		$('.js-product-info-collapse-toggle a').text(status === 'hide' ? 'Показать все характеристики' : 'Свернуть характеристики');
	}

	function setProductInfoCollapseEvents(){
		$('.js-product-info-description').on('hide.bs.collapse', () => productInfoCollapseHandler('hide'))
		$('.js-product-info-description').on('show.bs.collapse', () => productInfoCollapseHandler('show'))
	}

	function setDOMEvents(){
		$(document).ready(showPanelOrderCheckout);
		$(window).scroll(showPanelOrderCheckout);
		$(window).scroll(checkHidePosProductOrderPanel);
		$(window).resize(showPanelOrderCheckout);
		setProductInfoCollapseEvents();
	}


	function init(){
		setDOMEvents();
		setLightGallery();
		productDescription.init();
	}

	return {
		init
	}
});
export default Product;