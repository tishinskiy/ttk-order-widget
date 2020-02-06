
import fieldsRevision from './fieldsRevision'
import { showMessage, hideModal } from './messages'
import { setCookie, getCookie } from './coockie'

export default function() {

	const store = this.store.readState()

	const params = store.params


	if (!fieldsRevision.call(this, ['city', 'street', 'building', 'apartment'])) return false


	const City = store.city.readState().current
	const Street = store.street.readState().current
	const Building = store.building.readState().current


	if (!Building || Building['TC'] === null) {

		showMessage.call(this, '<div class="ttk__modal__header">Проверено</div>Указанный адрес не подключен к сети.</a>')
		return false

	}

	const ttkUserFields = {
		city: City,
		street: Street,
		building: Building,
		apartment: store.apartment.readState().node.value,
	}

	const coockie = getCookie('ttk_user_fields')

	const oldCoockie = !!coockie ? JSON.parse(coockie) : {}

	setCookie('ttk_user_fields', JSON.stringify({
		...oldCoockie,
		...ttkUserFields
	}));

	const button = $('<button>', {

		html: 'Выбрать тариф',
		class: 'ttk__button ttk__button--modal',
	})

	const block = $('<div>', {

		class: 'ttk__modal__button-wrap',
	})

	if (params.onButtonAction) {

		button.on('click', () => {
			params.onButtonAction
			hideModal.call(this)
		})
	}

	showMessage.call(this, '<div class="ttk__modal__header">Проверено</div>По вашему адресу доступно подключение услуг ТТК.</a><br>', block.append(button)
		)

	if (params.onComplite) {

		params.onComplite()
	}

}

