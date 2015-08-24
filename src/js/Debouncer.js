export function Debouncer(context, func, time) {
	function debounce() {
		let innerFunc = context[func];
		let callTimeout;

		context[func] = function() {
			let args = arguments;

			if(callTimeout) {
				window.clearTimeout(callTimeout);
			}

			callTimeout = window.setTimeout(function() {
				innerFunc.apply(context, args);
				callTimeout = null;
			}, time);
		}
	}

	debounce();
}