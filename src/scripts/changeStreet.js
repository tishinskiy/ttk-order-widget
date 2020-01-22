export default function (newStreet) {

	const store = this.store.readState().street
	const current = store.readState().current

	if (!current || current['STREET_ID'] != newStreet['STREET_ID']) {

		store.updateState(state => ({
			...state,
			current: newStreet
		}))

		this.observable.eventEmitter('changeStreet')
	} else {

		$(this.node).val(newCity['STREET_NAME'])
	}
}