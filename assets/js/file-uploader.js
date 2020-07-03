import $ from 'jquery';

$(function(){
	var button = $('<button>').text('Удалить').addClass('c-btn c-btn_danger ml-2 js-file-uploader-action_remove');
	$('.js-file-uploader input').on('change', function(event){
		var file = event.target.files[0];
		var actionRemove = $(this).parent().find('.js-file-uploader-action_remove');
		if(!file) {
			if(actionRemove) actionRemove.remove();
			$('.js-file-uploader-action_attach').text('Прикрепить файл').removeClass('h-is-disabled');
			$(this).parent().removeClass('is-uploaded');
			return;
		}
		$(this).parent().addClass('is-uploaded');
		$('.js-file-uploader-action_attach').text(file.name).addClass('h-is-disabled');
		$(this).parent().append(button);
		$(this).parent().on('click', '.js-file-uploader-action_remove', function(e){
			e.preventDefault();
			event.target.files = null;
			if(actionRemove) actionRemove.remove();
			$('.js-file-uploader-action_attach').text('Прикрепить файл').removeClass('h-is-disabled');
			$(this).parent().removeClass('is-uploaded');
			$(this).remove();
		});
	});


});