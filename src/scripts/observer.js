export class Observable {

	constructor(state = {}) {

		this.observers = new Set();
	}

	addObserver(observer) {

		this.observers.add(observer);
	}

	removeObserver(observer) {

		this.observers.delete(observer);
	}

	eventEmitter(event = false) {
		if (event) {

			console.log('eventEmitter', event)
			this.notifyObservers(event);
		}
	}

	notifyObservers(event) {

		for (let observer of this.observers) {

			if (event === observer.event) {
				observer.action();
			}
		}
	}
}

export const Observer = function( behavior ) {

	console.log('behavior', behavior)
	this.event = behavior.event
	this.action = function(){
		behavior.action()
	}
}
