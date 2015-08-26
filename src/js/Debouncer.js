export function Debouncer(context, func, time) {
	function _debounce() {
		const innerFunc = context[func];
		let callTimeout;

		context[func] = function() {
			const args = arguments;

			if(callTimeout) {
				window.clearTimeout(callTimeout);
			}

			callTimeout = window.setTimeout(function() {
				innerFunc.apply(context, args);
				callTimeout = null;
			}, time);
		}
	}

	_debounce();
}