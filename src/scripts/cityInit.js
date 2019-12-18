import getWidgetStore from './getWidgetStore'

export default function (params) {

	const thas = $(this)

	if (params) {

		thas.val(params['EXTERNAL_NAME'])

		getWidgetStore.call(this).City.updateState( state => ({
			...params
		}))
	}

	if (thas.val() !== '') {

		thas.next('label').addClass('ttk__input__label--focused')
	}
}