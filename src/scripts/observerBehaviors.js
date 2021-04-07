import { Observer, Observable } from './observer'
import { readStore } from './Store'

export default function( inputs ) {

	const Store = readStore.call(this)

	// const { Observer, Observable } = getObserver.call(this)

	const changeCity = new Observer({
		event: 'changeCity',
		action() {
			$(inputs.city).val(Store.City.readState().current['EXTERNAL_NAME']).blur()
			$(inputs.street).val('').siblings('label').removeClass('ttk__input__label--focused')
			$(inputs.building).val('').siblings('label').removeClass('ttk__input__label--focused')
			$(inputs.city).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')
		}
	})

	const changeStreet = new Observer({
		event: 'changeStreet',
		action() {
			const street = Store.Street.readState().current
			$(inputs.street).val(street['STREET_NAME'])
			$(inputs.street).siblings('label').html(street['TYPE_NAME'])
			$(inputs.street).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')
			$(inputs.building).val('').siblings('label').removeClass('ttk__input__label--focused')
		}
	})

	Observable.addObserver([changeCity, changeStreet])

}
