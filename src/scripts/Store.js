const _Store = class {

	constructor(state = {}) {
		this.state = state;
		this.observers = new Set();
	}

	addObserver(observer) {
		this.observers.add(observer);
	}

	removeObserver(observer) {
		this.observers.delete(observer);
	}

	updateState(updater) {
		this.state = updater(this.state);
		this.notifyObservers();
	}

	readState() {
		return this.state
	}

	clearState() {
		this.state = {}
		this.notifyObservers();
	}
	
	notifyObservers() {
		for (let observer of this.observers) {
			observer(this.state);
		}
	}
}

const Store = new _Store()

const createStore = function(key) {

	const City = new _Store();
	const Requests = new _Store();
	const Street = new _Store();
	const Building = new _Store();
	const Autocomplite = new _Store();


	Store.updateState(state => ({
		...state,
		[key]: { City, Requests, Street, Building, Autocomplite }
	}))

}

const readStore = function(key) {

	return [key] in Store.readState() ? Store.readState()[key] : false
}


export { createStore, readStore }