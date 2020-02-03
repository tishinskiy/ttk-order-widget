export default function (newCity) {

	const store = this.store.readState().city
	const current = store.readState().current

	if (!current || current['EXTERNAL_ID'] != newCity['EXTERNAL_ID']) {

		store.updateState(state => ({
			...state,
			current: newCity
		}))

		this.observable.eventEmitter('changeCity')
	} else {

		$(this.node).val(newCity['EXTERNAL_NAME'])
	}
}
