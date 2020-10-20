import { getElement } from '@js/helpers';
import Timer from './Timer';
const FormCall = (function(element){
	const formElement = $(element);
	const timerElement = formElement.find('.js-timer'),
		  phoneFieldElement = formElement.find('.js-phone-field'),
		  actionBtnElement = formElement.find('.js-form-call-action');
	const timerInstance = new Timer(timerElement);
	const ctNodeId = '1',
		  ctSiteId = '562',
		  ctData = {
            subject: 'Заказ обратного звонка',
            sessionId: window.call_value
		  },
		  sbData = {
		  	action: "call",
            urlPage: window.location.href
		  };

    async function formSubmitHandler(e){
    	e.preventDefault();
    	
    	try{
    		let phone = phoneFieldElement.val();
    		if(!validatePhone(phone)) {
    			phoneFieldElement.addClass("is-invalid");
    			return;
    		};
    		phoneFieldElement.removeClass("is-invalid");
	    	timerStart();

	    	await $.post({
                url: `https://api-node${ctNodeId}.calltouch.ru/calls-service/RestAPI/requests/${ctSiteId}/register/`,
                dataType: 'json',
                data: {phoneNumber: phone, ...ctData}
            });

            await $.post({
                url: 'https://sanbest.ru/bitrix/ajax/Callback.php',
                data: {phone, ...sbData}
            });

    	} catch(error){
    		console.error( new Error(error) );
    		timerStop();
    	}

    	return false;
    }

    function validatePhone(phone){
    	if(!phone) return;
    	return !(phone.replace(/\D/g, '').length < 11)
    }

    function toggleAccessFormFields(status){
    	$(phoneFieldElement).attr("disabled", !status);
    	$(actionBtnElement).attr("disabled", !status);
    }

    function timerStop(){
    	toggleAccessFormFields(true);
    	timerInstance.stop();
    }

    function timerStart(){
    	toggleAccessFormFields(false);
    	
    	timerInstance.start();
    	
    	timerInstance.on('finish', () => {
    		toggleAccessFormFields(true);
    	})
    }
	
	function setDOMEvents(){
		formElement.submit(formSubmitHandler);
	}

	function init() {
		if(!element) return; 
		setDOMEvents();
		timerInstance.init();
	}

	return {
		init
	}
});

export default FormCall;