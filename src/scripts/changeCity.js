export default function (newCity) {

	const store = this.store.readState().city
	const current = store.current

	if (!current || current['EXTERNAL_ID'] != newCity['EXTERNAL_ID']) {

		store.updateState(state => ({
			...state,
			current: newCity
		}))

		this.observable.eventEmitter('changeCity')
	} else {

		$(store.node).val(newCity['EXTERNAL_NAME'])
	}
}