import cityDropDown from './cityDropDown'
import streetDropDown from './streetDropDown'
import buildingDropDown from './buildingDropDown'
import phoneMask from './phoneMask'

export default function(){

	$(this.node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
	$(this.node).closest('.ttk__input__wrap').addClass('ttk__input__wrap--focused')

	$(this.node).removeClass('ttk__input--error')


	const store = this.store.readState()[this.name]

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

		case 'apartment':

			if (this.store.readState().city.readState().Input.errorRevision()) return false
			if (this.store.readState().street.readState().Input.errorRevision()) return false
			if (this.store.readState().building.readState().Input.errorRevision()) return false

			break

		case 'phone':
			phoneMask.call(this)

			break

		default:
			break
	}
}
