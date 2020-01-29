export default function() {
	const store = this.store.readState()
	const City = store.city.readState().current
	const Street = store.street.readState().current
	const Building = store.building.readState().current
	const ofice = store.apartment.readState().node.value
	const name = store.name.readState().node.value
	const family = store.family.readState().node.value
	const phone = store.phone.readState().node.value


	if (!City) {
		this.store.updateState(state => ({
			...state,
			error: {
				code: 'err_2',
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (!Street) {
		this.store.updateState(state => ({
			...state,
			error: {
				code: 'err_3',
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (!Building) {
		this.store.updateState(state => ({
			...state,
			error: {
				code: 'err_4',
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	const sendData = {

		city: City['EXTERNAL_NAME'],
		City_ID: City['EXTERNAL_ID'],
		street: `${Street['TYPE_NAME']} ${Street['STREET_NAME']}`,
		building: Building['FULL_NAME'],
		ofice,
		name,
		family,
		phone,
		Building_ID: Building['BUILDING_ID'],
	}

	const params = this.store.readState().params

	if (params.comment && (typeof params.comment === 'string') && params.comment !== '') {
		sendData.comment = params.comment
	}

	if (params.other && typeof params.other === 'object') {
		for (let key in params.other) {
			console.log(key, typeof params.other[key])
			if (typeof sendData[key] === 'undefined' && (typeof params.other[key] === 'string')) {
				sendData[key] = params.other[key]
			}
		}
	}

	console.log('sendData', sendData)
}
