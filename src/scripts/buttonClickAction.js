import errorsRevision from './errorsRevision'

export default function() {
	const store = this.store.readState()
	const City = store.city.readState().current
	const Street = store.street.readState().current
	const Building = store.building.readState().current
	const ofice = store.apartment.readState().node.value
	const name = store.name.readState().node.value
	const family = store.family.readState().node.value
	const phone = store.phone.readState().node.value

	errorsRevision.call(this)

	const sendData = {

		city: City['EXTERNAL_NAME'],
		City_ID: City['EXTERNAL_ID'],
		street: `${Street['TYPE_NAME']} ${Street['STREET_NAME']}`,
		building: Building['FULL_NAME'],
		Building_ID: Building['BUILDING_ID'],
		ofice,
		family,
		phone,
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
