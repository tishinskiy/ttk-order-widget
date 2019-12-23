import getObserver from './observer'

export default function (newCity, store) {

	if (!store.readState().current || store.readState().current['EXTERNAL_ID'] != newCity['EXTERNAL_ID']) {

		store.updateState(state => ({
			...state,
			current: newCity
		}))

		getObserver.call(this).Observable.eventEmitter('changeCity')
	} else {

		$(this).closest('.ttk__input__wrap').find('.ttk__input').val(newCity['EXTERNAL_NAME'])
	}
}