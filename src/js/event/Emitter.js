export class Emitter {
	constructor() {
		this.listeners = {};
	}

	emit(event, args) {
		if(!this.listeners[event]) {
			return;
		}

		this.listeners[event].forEach(function(listener) {
			listener.apply(null, args);
		});
	}

	on(event, listener) {
		if(!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(listener);
	}

	off(event, listener) {
		let index = this.listeners[event].indexOf(listener);
		this.listeners[event].splice(index, 1);

		if(!this.listeners[event].length) {
			delete this.listeners[event];
		}
	}
}