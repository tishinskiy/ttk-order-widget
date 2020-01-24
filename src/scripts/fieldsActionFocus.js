import cityDropDown from './cityDropDown'
import streetDropDown from './streetDropDown'
import buildingDropDown from './buildingDropDown'

export default function(){

	$(this.node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
	$(this.node).closest('.ttk__input__wrap').addClass('ttk__input__wrap--focused')


	const thas = this
	const store = this.store.readState()[this.name]
	const requests = this.store.readState().Requests

	store.updateState(state => ({
		...state,
		focus: false
	}))


	switch (this.name) {
		case 'city':

			cityDropDown.call(this)

			break

		case 'street': 

			if ($(this.node).val().length >= 3) {

				streetDropDown.call(this)
			}

			break

		case 'building': 

			if ($(this.node).val().length >= 1) {

				buildingDropDown.call(this)
			}

			break

		default:
			break
	}
}