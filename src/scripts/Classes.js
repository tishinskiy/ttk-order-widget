import defaultParams from './defaultParams'
import buildWidget from './buildWidget'
import test from './test'
import cityInit from './cityInit'
import observer from './observer'

export class Store {

	constructor(state = {}) {
		this.state = state;
	}

	updateState(updater) {
		this.state = updater(this.state);
		// console.log('updateState => ', this.state)
	}

	readState() {
		return this.state
	}

	clearState() {
		this.state = {}
	}
}

export class Input {

	constructor(block = $(), name = false) {
		this.block = block;
		this.name = name
		this.test = test
	}

	updateClass(updater) {
		
	}
}

const createInput = function(block = $('<input>'), name = 'undefined') {

	const input = new Input(block, name)
	input.store = this.store

	const store = new Store()
	store.updateState(state => ({...state, block}))
	input.store.updateState(state => ({
		...state,
		[name]: store,
	}))

	switch (name) {

		case 'city':

			this.addEmitter({
				event: 'changeCity',
				action() {
					console.log($(block))
					$(block).focus()
					$(block).val(store.readState().current['EXTERNAL_NAME'])
					$(block).blur()
				}
			})
			break

		default:
			break
	}

	return input
}

export class Widget {

	constructor(block = $(), params = false) {
		params = {
			...defaultParams,
			...params
		}

		this.block = block;
		this.store = new Store()
		this.store.updateState(state => ({
			...state,
			params,
			widget: this
		}))

		this.key = (new Date()).getTime()
		this.createInput = createInput
		this.buildWidget = buildWidget
		this.cityInit = cityInit
		const { Observable, Observer} = observer()
		this.observable = Observable

		this.addEmitter = (action) => {
			Observable.addObserver(new Observer(action))
		}

		this.buildWidget()
		// setTimeout(() => {this.cityInit()}, 1000)
		this.cityInit()
	}

	show() {
		console.log(this)
	}
}
