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

	console.log('behavior', behavior)
	this.event = behavior.event
	this.action = function(){
		behavior.action()
	}
}

export default () => ({ Observable: new Observable(), Observer })
