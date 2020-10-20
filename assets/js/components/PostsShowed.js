import { getElement } from '@js/helpers';
const PostsShowed = (function(element){
	const postsShowedElement = getElement(element),
		  postsShowedInputElement = postsShowedElement ? postsShowedElement.find('.js-posts-showed-input') : null;

	function checkInput(e){
		e.preventDefault();
		if ($(this).is(":checked")) {
            postsShowedElement.find(".is-active").removeClass("is-active");
            $(this).parent().addClass("is-active");

            var val = $(this).val();
            $.post(window.location.href, {count: val})
                .done(function(data) {
                    window.location.reload(true);
                });
        }
	}

	function setDOMEvents(){
		if(postsShowedInputElement) postsShowedInputElement.change(checkInput);
	}

	function init() {
		setDOMEvents();
	}

	return {
		init
	}
});
export default PostsShowed;