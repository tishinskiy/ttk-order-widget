import getObserver from './observer'
import { readStore } from './Store'

export default function( inputs ) {

	const Store = readStore.call(this)

	const { Observer, Observable } = getObserver.call(this)

	const changeCity = new Observer({
		event: 'changeCity',
		action() {
			console.log($(inputs.city))
			$(inputs.city).val(Store.City.readState().current['EXTERNAL_NAME']).blur()
			$(inputs.street).val('').siblings('label').removeClass('ttk__input__label--focused')
			$(inputs.building).val('').siblings('label').removeClass('ttk__input__label--focused')
			$(inputs.street).val('').siblings('label').removeClass('ttk__input__label--focused')
		}
	})

	Observable.addObserver([changeCity])

}
