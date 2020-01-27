export default function (newBuilding) {

	const store = this.store.readState().building
	const current = store.readState().current

	if (!current || current['BUILDING_ID'] != newBuilding['BUILDING_ID']) {

		store.updateState(state => ({
			...state,
			current: newBuilding
		}))

		this.observable.eventEmitter('changeBuilding')

	} else {

		$(this.node).val(newBuilding['HOUSE_NUMBER'])
	}
}