import getObserver from './observer'

export default function (newCity) {

	const store = this.store.readState().city
	const current = store.current

	if (!current || current['EXTERNAL_ID'] != newCity['EXTERNAL_ID']) {

		store.updateState(state => ({
			...state,
			current: newCity
		}))

		// getObserver.call(this).Observable.eventEmitter('changeCity')
		this.observable.eventEmitter('changeCity')
	} else {

		$(store.block).val(newCity['EXTERNAL_NAME'])
	}
}