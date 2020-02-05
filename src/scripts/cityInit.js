import changeCity from './changeCity'

export default function () {

	const node = $(this.store.readState().city.node)
	const params = this.store.readState().params
	const stockCity = this.store.readState().params.currentCity

	if (
		   typeof stockCity === 'object'
		&& typeof stockCity['INTERNAL_ID'] === 'string'
		&& typeof stockCity['EXTERNAL_ID'] === 'string'
		&& typeof stockCity['EXTERNAL_NAME'] === 'string'
	) {

		changeCity.call(this, stockCity)
	}

	if (node.val() !== '') {

		node.next('label').addClass('ttk__input__label--focused')
	}
}
