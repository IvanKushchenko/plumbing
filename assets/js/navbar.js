const Navbar = (function(){

	const navbarCart = $('.js-navbar-cart'),
		  navbarCartBtn = $('.js-navbar-cart-btn');

	function removeProduct(){
		$(this).parents('.js-navbar-cart-product').remove();
	}

	function navbarCartBtnHoverEnter(){
		if(!$('.js-navbar-cart-product').length) return;
		$(this).dropdown('toggle');
	}

	function navbarCartBtnHoverLeave(){
		if(!$('.js-navbar-cart-product').length) return;
		$(this).dropdown('hide');
	}

	function setDOMEvents(){

		$('.js-navbar-cart-product-remove').click(removeProduct);

		navbarCartBtn.hover(navbarCartBtnHoverEnter, navbarCartBtnHoverLeave)
	}

	function init(){
		setDOMEvents();
	}

	return {
		init
	}

});
export default Navbar;