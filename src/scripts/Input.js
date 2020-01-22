import { Store } from './Store'
import { DropList } from './DropList'
import fieldsActions from './fieldsActions'
import eventActions from './eventActions'

import addDropDown from './addDropDown'

export class Input {

	constructor(node = $(), name = false, options = {}) {

		const store = new Store()
		this.node = node;
		this.name = name

		for (let option in options) {
			this[option] = options[option]
		}

		store.updateState(state => ({...state, node}))
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
}