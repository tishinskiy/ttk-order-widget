import cityDropDown from './cityDropDown'
import streetDropDown from './streetDropDown'
import buildingDropDown from './buildingDropDown'
import phoneMask from './phoneMask'

export default function(){

	$(this.node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
	$(this.node).closest('.ttk__input__wrap').addClass('ttk__input__wrap--focused')

	$(this.node).removeClass('ttk__input--error')


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

			streetDropDown.call(this)

			break

		case 'building': 

			buildingDropDown.call(this)

			break

		case 'phone': 
			phoneMask.call(this)

			break

		default:
			break
	}
}