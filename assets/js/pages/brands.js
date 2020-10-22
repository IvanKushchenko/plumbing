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

    function setFilter(link) {
        if (!link) {
            window.location.href = "/brands/";
            return;
        };
        window.location.href = `/brands/filter/uf_country-is-${link}/apply/`;
    }


    function initFilters(){
    	filters.init();
		filters.on('change', (val) => {
			let link = [...filters.getAllCheckedInputs().map((idx, el) => $(el).val())].reduce( (accum, val) => `${accum}_${val}` );
			setFilter(link);
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