import getObserver from './observer'

export default function (newStreet, store) {

	console.log('changeStreet', newStreet)

	if (!store.readState().current || store.readState().current['STREET_ID'] != newStreet['STREET_ID']) {

		store.updateState(state => ({
			...state,
			current: newStreet
		}))

		getObserver.call(this).Observable.eventEmitter('changeStreet')
	} else {

		$(this).closest('.ttk__input__wrap').find('.ttk__input').val(newStreet['STREET_NAME'])
		$(this).closest('.ttk__input__wrap').find('label').html(newStreet['TYPE_NAME'])
		$(this).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')
	}
}