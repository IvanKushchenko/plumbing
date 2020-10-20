import { getElement } from '@js/helpers';

const FileUploader = (function(element){
	element = $(element);
	const inputElement = element.find('input');
	let textElement = renderTextElement('Прикрепить файл');
	let removeBtnElement = null;
	let file = null;

	function renderTextElement(text){
		let container = $('<a>');
		container.attr('href', '#!');
		container.css({pointerEvents: 'none'});
		container.text(text);
		element.append(container);
		return container;
	}

	function renderRemoveBtnElement(){
		let btn = $('<a>');
		btn.attr('href', '#!');
		btn.css({boxShadow: 'none'});
		btn.addClass('text-danger js-file-uploader-action-remove ml-2');
		btn.text('Удалить');
		element.append(btn);
		return btn;
	}

	function toggleEventsInput(status){
		inputElement.css({pointerEvents: status ? 'auto' : 'none'})
	}

	function toggleVisibleRemoveBtn(status){
		if(status && !getElement(removeBtnElement)){
			removeBtnElement = renderRemoveBtnElement();
		} else if(!status && getElement(removeBtnElement)){
			removeBtnElement.remove();
			removeBtnElement = null;
		}
	}

	function removeBtnClickHandler(e){
		e.preventDefault();
		inputElement.files = null;
		toggleEventsInput(true);
		textElement.text('Прикрепить файл');
		toggleVisibleRemoveBtn(false);
	}

	function removeFile(){
		textElement.text('Прикрепить файл');
		toggleVisibleRemoveBtn(false);
		toggleEventsInput(true);
		file = null;
	}

	function addFile(){
		const fileName = file.name;
		textElement.text(fileName);
		toggleVisibleRemoveBtn(true);
		toggleEventsInput(false);
	}

	function inputChangeHandler(e){
		file = e.target.files[0];

		file ? addFile() : removeFile();
	}

	function setDOMEvents(){
		inputElement.change(inputChangeHandler);
		element.on('click', '.js-file-uploader-action-remove', removeBtnClickHandler);
	}

	function init(){
		setDOMEvents();
	}

	return {
		init
	}
});

export default FileUploader;