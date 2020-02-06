import jsonpRequest from './jsonpRequest'
import fieldsRevision from './fieldsRevision'
import { showPreloader, showMessage } from './messages'
import { setCookie } from './coockie'


const sendWidget = async (data, url) => {
	try {

		const result = await jsonpRequest(url, data)
		return result
	} catch(e) {

		return e
	}
}

export default function() {

	const store = this.store.readState()

	const params = store.params


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

			let url = false

			if (Building['TC'] === null) {

				if (params.coverage) {

					this.store.updateState(state => ({
						...state,
						error: {
							code: 'err_7',
						}
					}))
					this.observable.eventEmitter('showError')
					return false

				} else {

					url = params.collector ? params.collectorUrl : params.requestUrl
				}
			} else {

				url = params.requestUrl
			}

			showPreloader.call(this)


			if (params.writeCoockie && !!Building && 'TC' in Building && Building['TC'] !== null) {

				const ttkUserFields = {
					city: City,
					street: Street,
					building: Building,
					apartment: sendData.ofice,
					family: sendData.family,
					name: sendData.name,
					phone: sendData.phone,
				}

				setCookie('ttk_user_fields', JSON.stringify(ttkUserFields));
			}

			const result = await sendWidget(sendData, url)

			if (params.onComplite && typeof params.onComplite === 'function') {
				params.onComplite()
			}

			showMessage.call(this, '<div class="ttk__modal__header">Отправлено</div>Спасибо! Мы приняли вашу заявку на подключение.<br>Теперь просто дождитесь звонка - наш оператор позвонит вам в течении дня или в ближайший рабочий день, если вы оставили заявку в выходной.<br><a href="/">Перейти на главную страницу.</a>')

			if (!store.params.thankyouUrl) {

				this.observable.eventEmitter('clearForm')

			} else {
				document.location.href = store.params.thankyouUrl
			}

		} catch(e) {

			showMessage.call(this, '<div class="ttk__modal__header">Ошибка</div>При создании заявки что-то пошло не так.<br>Попробуйте ещё раз.')
		}

	})()
}

