import 'bootstrap';

import Basket from '@js/pages/basket';
import Catalog from '@js/pages/catalog';
import Common from '@js/pages/common';
import Navbar from '@js/components/navbar';
import Sliders from '@js/components/sliders';
import Product from '@js/pages/product';
import Brands from '@js/pages/brands';


$(function() {
	const pages = [
		new Basket(),
		new Catalog(),
		new Common(),
		new Product(),
		new Brands()
	];

	const components = [
		new Navbar(),
		new Sliders()
	];

	pages.forEach(page => { page.init() } );
	components.forEach(component => { component.init() } );
});