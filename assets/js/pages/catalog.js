import Tip from '@js/components/tip';
import Hammer from 'hammerjs';
import PostsShowed from '@js/components/PostsShowed';
import SortSelect from '@js/components/SortSelect';
import SortButton from '@js/components/SortButton';
import Filters from '@js/components/Filters';
import { getElement } from '@js/helpers';
import _debounce from 'lodash/debounce';
import _throttle from 'lodash/throttle';

const Catalog = (function(){
	const bodyElement = getElement('body'),
		showFiltersBtnNodeElement = getElement('.js-filters-button'),
		tipFilterElement = getElement('.js-tip-filter'),
		tipFilter = new Tip('filter'),
		filtersElement = getElement('.js-filters-catalog'),
		filtersPanelBgElement = getElement('.js-filters-panel-bg'),
		postsShowedElement = getElement('.js-posts-showed'),
		sortSelectElement = getElement('.js-sort-select'),
		resetFilterElement = getElement('.js-reset-filter'),
		sortButtonElement = getElement('.js-sort-button');

	
	const hammerFilters = filtersElement ? Hammer(filtersElement[0]) : null,
		  postsShowed = new PostsShowed(postsShowedElement),
		  sortSelect = new SortSelect(sortSelectElement),
		  sortButton = new SortButton(sortButtonElement),
		  filters = new Filters(filtersElement);

	let currentFilter = null;


	function showFiltersPanel(){
		if( !filtersElement ) return;
		filtersElement.addClass('is-show');
		filtersPanelBgElement.delay(300).fadeIn(400);
		bodyElement.css({overflow: 'hidden'});
	}

	function hideFiltersPanel(){
		if( !filtersElement ) return;
		filtersElement.removeClass('is-show');
		filtersPanelBgElement.fadeOut(400);
		tipFilterElement.fadeOut(400);
		bodyElement.css({overflow: 'auto'});
	}

	async function changeFiltersHandler(){
		const url = filters.generatedFilterUrl(),
			  sectionCodeVal = filters.getSectionCode();
		currentFilter = $(this);

		try{
			const allFiltersCheckboxes = filters.getAllCheckboxes();
			// const productsCountData = await $.post("", { FILTER_ACTION: "count", FILTER_URL: url });
			const productsCountData = 1;

			let tipContent = `
				Найдено товаров: 
				<span class="mr-2">${productsCountData}</span>
				<a href="/catalog/${sectionCodeVal}/${url ? `filter/${url}/apply/` : ''}">Показать</a>
			`;

			showFilterTip(tipContent);

            var productsFilterData = await $.post(`/catalog/${sectionCodeVal}/${url ? `filter/${url}/apply/` : ''}`, { FILTER_ACTION: "find"} );
            productsFilterData = JSON.parse(productsFilterData);

           allFiltersCheckboxes.each(function(idx, checkbox) {
           			checkbox = $(checkbox);
                    const input = $( $(checkbox).find('input[type="checkbox"]') );
                    const countElement = $( checkbox.find(".count") );
                    const inputName = input.attr("name");
                    const inputVal = input.val();
                    // Кол-во продуктов у выбранного фильтра
                    const filterValueProductsCount = Number( productsFilterData["FILTER"]["PROPERTIES"][inputName]["VALUES"][inputVal]["COUNT"] ); 
                    
                    if(filterValueProductsCount) checkbox.removeClass("text-muted");
                    else checkbox.addClass("text-muted");
                    input.prop("disabled", !filterValueProductsCount);

                    countElement.text(`[${filterValueProductsCount}]`);
            });

		} catch (error){
			console.error(new Error(error));
		}

	}

	function setTipCoords(){
		var parent = getElement($(currentFilter).parents('.js-filter'));
		if(!parent) return;
		var tipCoords = {
			top: (($(parent).offset().top - $(window).scrollTop()) + ($(parent).outerHeight() / 2) - tipFilterElement.outerHeight() / 2),
			left: (parent.outerWidth() + parent.offset().left + 30)
		}

		tipFilter.setCoords(tipCoords);
		return tipCoords;
	}

	function showFilterTip(content){
		if( !tipFilterElement ) return;
		let tipCoords = setTipCoords();
		tipFilter.show(tipCoords, content, {
			autohide: {
				delay: 5000
			}
		});	
	}

	function resetFilterClickHandler(){
		const sectionCodeVal = filters.getSectionCode();
        window.location.href = `/catalog/${sectionCodeVal}/`;
	}

	function initFilters(){
		filters.init();	
		filters.on('change', function(val) {
			changeFiltersHandler.bind(this)();
		})

		filters.on('input', _debounce(function(val) {
			changeFiltersHandler.bind(this)()
		}, 400));
	}

	
	
	function setDOMEvents(){
		if( showFiltersBtnNodeElement ) showFiltersBtnNodeElement.click(showFiltersPanel);
		
		if(hammerFilters) hammerFilters.on("swipeleft", hideFiltersPanel);

		if(resetFilterElement) resetFilterElement.on('click', resetFilterClickHandler);

		$(window).scroll(_throttle(setTipCoords, 50));
	}


	function init(){
		setDOMEvents();
		postsShowed.init();
		sortSelect.init();
		sortButton.init();
		initFilters();
	}

	return {
		init
	}
});

export default Catalog;