import jsonpRequest from './jsonpRequest'
import fieldsRevision from './fieldsRevision'
import { showPreloader, showMessage } from './messages'
import changeCity from './changeCity'

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

	showPreloader.call(this)

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

		try {

			const result = await sendWidget(sendData, 'http://localhost:7000/jsonp/200')

			changeCity.call(this, false)

			showMessage.call(this, 'В своём стремлении повысить качество жизни, они забывают, что социально-экономическое развитие говорит о возможностях существующих финансовых и административных условий.')

		} catch(e) {
			showMessage.call(this, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, similique. Distinctio eaque quos fuga, esse sequi dicta voluptatem quibusdam laborum provident officiis ex saepe, accusamus quam, aspernatur et earum mollitia.')
		}

	})()
}

