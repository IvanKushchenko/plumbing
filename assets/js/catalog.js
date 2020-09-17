import Tip from './tip';
const Catalog = (function(){
	var body = $('body'),
		showFiltersBtnNode = $('.js-dropdown-filters'),
		tipFilterNode = $('.js-tip-filter'),
		tipFilter = new Tip('filter', { delay: 5000 }),
		filters = $('.js-filters'),
		filtersPanelBg = $('.js-filters-panel-bg');
	var hammerFilters = checkNodeElement(filters) ? Hammer(filters[0]) : null;

	function showFiltersPanel(){
		if( !checkNodeElement(filters) ) return;
		filters.addClass('is-show');
		filtersPanelBg.delay(300).fadeIn(400);
		body.css({overflow: 'hidden'});
	}

	function checkNodeElement(element){
		return !!$(element).length
	}

	function hideFiltersPanel(){
		if( !checkNodeElement(filters) ) return;
		filters.removeClass('is-show');
		filtersPanelBg.fadeOut(400);
		tipFilterNode.fadeOut(400);
		body.css({overflow: 'auto'});
	}

	function showFilterTip(){
		if( !checkNodeElement(tipFilterNode) ) return;

		var parent = $(this).parents('.js-filter');

		var tipCoords = {
			top: (($(this).offset().top - $(window).scrollTop()) + ($(this).outerHeight() / 2)),
			left: (parent.outerWidth() + parent.offset().left + 30)
		}

		tipFilter.show(tipCoords);

		$(window).scroll(() => {
			var tipCoords = {
				top: (($(this).offset().top - $(window).scrollTop()) + ($(this).outerHeight() / 2)),
				left: (parent.outerWidth() + parent.offset().left + 30)
			}

			tipFilter.show(tipCoords);
		})		
	}

	
	
	function setDOMEvents(){
		if( checkNodeElement(showFiltersBtnNode) ) $('.js-dropdown-filters').click(showFiltersPanel);
		
		if(hammerFilters) hammerFilters.on("swipeleft", hideFiltersPanel);

		if( checkNodeElement( $('.js-filters .js-price-field') ) ||
			checkNodeElement( $('.js-filters .js-price-field') ) ) 
			$('.js-filters .js-price-field, .js-filters input').on('change', showFilterTip);
	}


	function init(){
		setDOMEvents();
	}

	return {
		init
	}
});

export default Catalog;