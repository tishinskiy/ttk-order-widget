import { Store } from './Store'
import { DropList } from './DropList'
import fieldsActions from './fieldsActions'
import eventActions from './eventActions'
import invertKeyboard from './invertKeyboard'
import errorRevision from './errorsRevision'

import addDropDown from './addDropDown'
import { getCookie } from './coockie'
let ttkUserFields = false


try {

	ttkUserFields = JSON.parse(getCookie('ttk_user_fields'))
} catch(err) {

	console.log(err)
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

		store.updateState(state => ({
			...state,
			node,
			Input: this,
		}))

		this.store.updateState(state => ({
			...state,
			[name]: store,
		}))

		fieldsActions.call(this)
		this.addEmitter(eventActions.call(this))

		if (this.store.readState().params.readCoockie && ttkUserFields && name in ttkUserFields) {

			$(this.node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')

			if (typeof ttkUserFields[name] === 'string') {

				$(node).val(ttkUserFields[name])
			}

			if (this.store.readState().params.readCoockie) {

				store.updateState(state => ({
					...state,
					current: (ttkUserFields && name in ttkUserFields) ? ttkUserFields[name] : false
				}))

				if (typeof ttkUserFields[name] === 'object') {

					switch (name) {
						case 'city':

							$(node).val(ttkUserFields[name]['EXTERNAL_NAME'])

							break

						case 'street':

							$(node).val(ttkUserFields[name]['STREET_NAME'])
							$(node).siblings('.ttk__input__label').html(ttkUserFields[name]['TYPE_NAME'])

							break

						case 'building':

							$(node).val(ttkUserFields[name]['FULL_NAME'])

							break

						default:
							break
					}

				}
			}
		}


	}

	addDropList() {
		this.dropList = new DropList()
		this.addDropDown = addDropDown
	}

	errorRevision() {
		return errorRevision.call(this)
	}
}
