const Observers = []

const Observable = class {

	constructor(state = {}) {

		this.observers = new Set();
	}

	addObserver(observer) {

		if (!observer.length) {

			this.observers.add(observer);
		} else {
			for (let item of observer) {

				this.observers.add(item);
			}
		}
	}

	removeObserver(observer) {

		this.observers.delete(observer);
	}

	eventEmitter(event) {
		console.log('eventEmitter', event)
		this.notifyObservers(event);
	}

	notifyObservers(event) {

		for (let observer of this.observers) {

			if (event === observer.event) {
				observer.action();
			}
		}
	}
}

const Observer = function( behavior) {

	this.event = behavior.event
	this.action = function(){
		behavior.action()
	}
}

const createObserver = (key) => {

	Observers[key] = { Observable: new Observable(), Observer }

	return Observers[key]
}

export default function() {
	
	const thas = !!this.length ? this : $(this)
	const key = !!thas.attr('ttk-widget-key') ? thas.attr('ttk-widget-key') : thas.closest('[ttk-widget-key]').attr('ttk-widget-key')
	return [key] in Observers ? Observers[key] : createObserver(key)
}