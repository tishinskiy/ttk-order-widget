import jsonpRequest from './jsonpRequest'
import fieldsRevision from './fieldsRevision'

const sendWidget = async (data, url) => {
	try {

		const result = await jsonpRequest(url, data)
		return result
	} catch(e) {
		console.log('err => ', e)
		return e
	}
}


export default function() {

	const store = this.store.readState()


	if (!fieldsRevision.call(this, ['city', 'street', 'building', 'apartment', 'family', 'name', 'phone'])) return false


	const City = store.city.readState().current
	const Street = store.street.readState().current
	const Building = store.building.readState().current


	const sendData = {

		city: City['EXTERNAL_NAME'],
		City_ID: City['EXTERNAL_ID'],
		street: `${Street['TYPE_NAME']} ${Street['STREET_NAME']}`,
		building: Building['FULL_NAME'],
		Building_ID: Building['BUILDING_ID'],
		ofice: store.apartment.readState().node.value,
		family: store.family.readState().node.value,
		name: store.name.readState().node.value,
		phone: store.phone.readState().node.value,
	}

	this.showPreloader()

	const params = this.store.readState().params

	if (params.comment && (typeof params.comment === 'string') && params.comment !== '') {
		sendData.comment = params.comment
	}

	if (params.other && typeof params.other === 'object') {
		for (let key in params.other) {

			if (typeof sendData[key] === 'undefined' && (typeof params.other[key] === 'string')) {
				sendData[key] = params.other[key]
			}
		}
	}

	;(async () => {

		const result = await sendWidget(sendData, 'http://localhost:7000/jsonp/200')
		console.log(result)
	})()
}

export { fieldsRevision }
