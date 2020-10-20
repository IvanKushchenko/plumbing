import { getElement, isString } from '@js/helpers';
import FilterAlphabet from '@js/components/FilterAlphabet';
import Filters from '@js/components/Filters';

const Brands = (function () {
	const alphabetFilterElement = getElement('.js-alphabet-filter'),
		  brandsListSectionsElements = getElement('.js-brands-list-section'),
		  filtersElement = getElement('.js-filters-brands');

	var letters = [...brandsListSectionsElements || []].map(item => $(item).attr('data-letter') || null),
		alphabetFilter = new FilterAlphabet(alphabetFilterElement, letters),
		filters = new Filters(filtersElement);
	function initAlphabetFilter(){
		if(!alphabetFilterElement) return;

		alphabetFilter.init();
		
		alphabetFilter.on('change', (letter) => {
			if(!isString(letter)) return;
			switch(letter) {
			 	case 'Все':
			 		brandsListSectionsElements
			 			.filter((idx, el) => $(el).is(':hidden') )
			 			.each((idx, el) => $(el).show() )
			 		break;
			 	case 'А-я':
					brandsListSectionsElements
						.each((idx, el) => $(el).show() )
						.filter((idx, el) => !(/[А-яЁё]/.test( $(el).attr('data-letter') ) ) )
						.each((idx, el) => $(el).hide() )

			 		break;
			 	default:
			 		let section = getElement(`.js-brands-list-section[data-letter="${letter}"]`);
			 		brandsListSectionsElements.each((idx, el) => $(el).hide() );
			 		if(section) section.show();
			 }
		})
	}

	// function initFilter(){
	// 	if( !filterElements ) return;
	// 	let filters = filterElements.map( (idx, el) => new Filter(el) );

	// 	filters.each((idx, filter) => {
	// 		filter.init();

	// 		filter.on('input', (val) => {
	// 			let link = [...filter.getChecked().map((idx, el) => $(el).val())].reduce( (accum, val) => `${accum}_${val}` );
	// 			setFilter(link);
	// 		} ) 
	// 	})
	// }

    function setFilter(link) {
        if (!link) {
            window.location.href = "/brands/";
            return;
        };
        link = "/brands/filter/uf_country-is-" + link.substr(0, link.length - 1) + "/apply/";
        window.location.href = link;
    }


    function initFilters(){
		filters.on('change', (val) => {
			console.log(val);
		})

		filters.on('input', (val) => {
			console.log(val);

			// let link = [...filter.getChecked().map((idx, el) => $(el).val())].reduce( (accum, val) => `${accum}_${val}` );
			// 	setFilter(link);
		})
	}

	function init(){
		initAlphabetFilter();
		initFilters();
	}

	return {
		init
	}
});
export default Brands;