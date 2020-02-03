export class Observable {

	constructor(state = {}) {

		this.observers = new Set();
	}

	addObserver(observer) {

		if (typeof observer.event == 'string') {

			this.observers.add(observer);
		}

		if (typeof observer.event == 'object' && !!observer.event.length) {

			observer.event.forEach(event => {


				this.addObserver({
					event,
					action: observer.action
				})
			})
		}
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

	this.event = behavior.event
	this.action = function(){
		behavior.action()
	}
}
