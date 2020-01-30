import { Store } from './Store'
import { DropList } from './DropList'
import fieldsActions from './fieldsActions'
import eventActions from './eventActions'
import invertKeyboard from './invertKeyboard'
import errorRevision from './errorsRevision'

import addDropDown from './addDropDown'

const test = function (name) {

		console.log(11111111, this.name)
}

export class Input {

	constructor(node = $(), name = false, options = {}) {

		const store = new Store()
		this.node = node;
		this.name = name
		this.invertKeyboard = invertKeyboard

		for (let option in options) {
			this[option] = options[option]
		}

		store.updateState(state => ({...state, node, Input: this}))
		this.store.updateState(state => ({
			...state,
			[name]: store,
		}))

		fieldsActions.call(this)
		this.addEmitter(eventActions.call(this))

	}

	addDropList() {
		this.dropList = new DropList()
		this.addDropDown = addDropDown
	}

	errorRevision() {
		return errorRevision.call(this)
	}
}
