const _Store = class {

	constructor(state = {}) {
		this.state = state;
	}

	updateState(updater) {
		this.state = updater(this.state);
		console.log('updateState => ', this.state)
	}

	readState() {
		return this.state
	}

	clearState() {
		this.state = {}
		this.notifyObservers();
	}
}

const Store = new _Store()

const createStore = (key = false) => {

	if (!!key) {

		const City = new _Store();
		const Requests = new _Store();
		const Street = new _Store();
		const Building = new _Store();
		const Autocomplite = new _Store();
		const EventBus = new _Store();

		Store.updateState(state => ({
			...state,
			[key]: { City, Requests, Street, Building, Autocomplite, EventBus }
		}))

		return Store.readState()[key]
	}

	else {
		const err = new Error('WTF')
		console.log('err', err)
		return err
	}

}

const readStore = function() {

	const thas = !!this.length ? this : $(this)
	const key = !!thas.attr('ttk-widget-key') ? thas.attr('ttk-widget-key') : thas.closest('[ttk-widget-key]').attr('ttk-widget-key')

	return [key] in Store.readState() ? Store.readState()[key] : createStore(key)
}


export { readStore }