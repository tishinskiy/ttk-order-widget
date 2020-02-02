import defaultParams from './defaultParams'
import buildWidget from './buildWidget'
import showError from './showError'
import cityInit from './cityInit'
import { Observable, Observer } from './Observer'
import { Store } from './Store'
import { Input } from './Input'
import { showPreloader } from './messages'

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

		this.observable = new Observable()
		this.showError = showError.bind(this)

		this.addEmitter = (action) => {
			if (action.length) {
				for (let item of action) {
					this.observable.addObserver(new Observer(item))
				}
			}
			this.observable.addObserver(new Observer(action))
		}

		buildWidget.call(this)
		cityInit.call(this)

		this.addEmitter({
			event: 'showError',
			action: this.showError
		})

		this.showPreloader = showPreloader
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