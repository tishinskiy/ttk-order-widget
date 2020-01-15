import defaultParams from './defaultParams'
import buildWidget from './buildWidget'

import cityInit from './cityInit'
import { Observable, Observer } from './Observer'

import { Store } from './Store'
import { Input } from './Input'

export class Widget {

	constructor(node = $('<div>'), params = {}) {

		params = {
			...defaultParams,
			...params
		}

		this.node = node;
		this.store = new Store()
		this.store.updateState(state => ({
			...state,
			Requests: new Store(),
			params,
			widget: this
		}))

		this.key = (new Date()).getTime()


		// this.buildWidget = buildWidget
		// this.cityInit = cityInit

		this.observable = new Observable()

		this.addEmitter = (action) => {
			this.observable.addObserver(new Observer(action))
		}

		buildWidget.call(this)
		cityInit.call(this)
	}
	
	createInput(node = $('<input>'), name = 'undefined') {

		const input = new Input(node, name, {
			store: this.store,
			observable: this.observable,
			addEmitter: this.addEmitter,
		})

		return input
	}

	show() {
		console.log(this)
	}
}