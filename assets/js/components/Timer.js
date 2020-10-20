import { getElement, isDate, checkType } from '@js/helpers';
const Timer = (function(element){
	const timerElement = getElement(element);
	if(!timerElement) return;
	const from = timerElement.data('from');
	
	let time = new Date();
	let events = [];
	let started = false;
	let requestAnimationInstance = null;

	function getPadNumber(number){
		return number < 10 ? `0${number}` : String(number);
	}

	function getFormatedTime(date){
		if(!isDate(date)) return;
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		const milliseconds = date.getMilliseconds();
		const formattedMinutes = getPadNumber(minutes);
		const formattedSeconds = getPadNumber(seconds);
		const formattedMilliseconds = getPadNumber(milliseconds) >= 100 ?  getPadNumber(milliseconds).slice(0, -1) : getPadNumber(milliseconds);

		return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
	}

	function parseTime(){
		let [m, sms] = from.split(':');
		// Обрезаем минуты до десятых, если передались сотые и больше 
		m = m && m.length > 2 ? m.slice(0, -1) : m;
		let [s, ms] = sms.split('.');
		// Обрезаем секунды до десятых, если передались сотые и больше
		s = s && s.length > 2 ? s.slice(0, -1) : s;
		// Обрезаем миллисекунды до десятых, если передались сотые и больше
		ms = ms && ms.length > 2 ? ms.slice(0, -1) : ms;
		ms = ms * 10;

		return { m, s, ms };
	}

	function setTime({m, s, ms}){
		time.setMinutes(m);
		time.setSeconds(s);
		time.setMilliseconds(ms);
		return time;
	}

	function renderTime(time){
		if(!timerElement) return;
		timerElement.text(getFormatedTime(time));
	}

	function stopAnimation(){
		cancelAnimationFrame(requestAnimationInstance);
		callEventCallback('finish');
	}

	function startAnimation({m, s, ms}){
		requestAnimationInstance = requestAnimationFrame(() => startAnimation({m, s, ms}));

		if(s == 0 && ms == 0) {
			stopAnimation();
			return;
		}
		if(ms == 0) {
			s -= 1;
			ms = 1000;
		}
		ms -= 10;

		setTime({m, s, ms})

		renderTime(time);
	}

	function restartAnimation({m, s, ms}){
		stopAnimation();
		startAnimation({m, s, ms});
	}

	function stop(){
		started = false;
		let {m, s, ms} = parseTime();
		setTime({m, s, ms});
		renderTime(time);
		stopAnimation();
	}

	function start(){
		let {m, s, ms} = parseTime();
		if(started){
			started = false;
			restartAnimation({m, s, ms});
			started = true;
		} else{
			started = true;
			startAnimation({m, s, ms});
		}
	}


	function callEventCallback(event, value){
		if(!findEvent(event)) return;
		findEvent(event).forEach(event => event.callback(value));
	}

	function findEvent(event){
		return events.filter(evt => evt.event === event);
	}

	function setDOMEvents(){

	}

	function on(listenEvents, callback){
		switch(checkType(listenEvents)) {
			case 'string':
				events.push({event: listenEvents, callback})
				break;
			case 'array':
				listenEvents
					.map(event => ({event, callback}))
					.forEach(event => events.push(event))
				break;
		}
	}

	function init() {
		if(!timerElement) return;
		setDOMEvents();
		let {m, s, ms} = parseTime();
		let defaultTime = setTime({m, s, ms});
		renderTime(defaultTime);
	}

	return {
		init,
		on,
		start,
		stop
	}
});
export default Timer;