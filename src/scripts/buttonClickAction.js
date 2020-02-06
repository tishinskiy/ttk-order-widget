// import jsonpRequest from './jsonpRequest'
import fieldsRevision from './fieldsRevision'
import { showMessage } from './messages'
import { setCookie, getCookie } from './coockie'


/*const sendWidget = async (data, url) => {
	try {

		const result = await jsonpRequest(url, data)
		return result
	} catch(e) {

		return e
	}
}*/

export default function() {

	const store = this.store.readState()

	const params = store.params


	if (!fieldsRevision.call(this, ['city', 'street', 'building', 'apartment'])) return false


	const City = store.city.readState().current
	const Street = store.street.readState().current
	const Building = store.building.readState().current


/*	const sendData = {

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

			let url = false*/

			if (Building['TC'] === null) {

				// if (params.coverage) {

					/*this.store.updateState(state => ({
						...state,
						error: {
							code: 'err_7',
						}
					}))
					this.observable.eventEmitter('showError')*/
					showMessage.call(this, '<div class="ttk__modal__header">Проверено</div>Указанный адрес не подключен к сети.</a>')
					return false

				// } else {

/*					url = params.collector ? params.collectorUrl : params.requestUrl
				}*/
			}
/*			} else {

				url = params.requestUrl
			}

			showPreloader.call(this)


			if (params.writeCoockie && !!Building && 'TC' in Building && Building['TC'] !== null) {*/

				const ttkUserFields = {
					city: City,
					street: Street,
					building: Building,
					apartment: store.apartment.readState().node.value,
/*					family: sendData.family,
					name: sendData.name,
					phone: sendData.phone,*/
				}


				const coockie = getCookie('ttk_user_fields')

				const oldCoockie = !!coockie ? JSON.parse(coockie) : {}

				setCookie('ttk_user_fields', JSON.stringify({
					...oldCoockie,
					...ttkUserFields
				}));
/*			}

			const result = await sendWidget(sendData, url)

			if (params.onComplite && typeof params.onComplite === 'function') {
				params.onComplite()
			}*/

			const button = $('<button>', {

				html: 'Выбрать тариф',
				class: 'ttk__button ttk__button--modal',
			})

			const block = $('<div>', {

				class: 'ttk__modal__button-wrap',
			})

			if (params.onButtonAction) {

				button.on('click', params.onButtonAction)
			}

			showMessage.call(this, '<div class="ttk__modal__header">Проверено</div><br>По вашему адресу доступно подключение услуг ТТК.</a><br>', block.append(button)
				)

			if (params.onComplite) {

				params.onComplite()
			}

	// 		if (!store.params.thankyouUrl) {

	// 			this.observable.eventEmitter('clearForm')

	// 		} else {
	// 			document.location.href = store.params.thankyouUrl
	// 		}

	// 	} catch(e) {

	// 		showMessage.call(this, 'Ошибка при создании заявки.<br>Попробуйте ещё раз.')
	// 	}

	// })()
}

