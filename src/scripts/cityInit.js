import { readStore } from './Store'
import changeCity from './changeCity'

export default function (params) {

	const thas = $(this)

	const store = readStore.call(thas).City

	if (params) {

		changeCity.call(this, params, store)
	}

	if (thas.val() !== '') {

		thas.next('label').addClass('ttk__input__label--focused')
	}
}