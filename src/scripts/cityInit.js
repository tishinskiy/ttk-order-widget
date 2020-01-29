import changeCity from './changeCity'

export default function () {

	const node = $(this.store.readState().city.node)

	const current = this.store.readState().params.currentCity

	if (current) {

		changeCity.call(this, current)
	}

	if (node.val() !== '') {

		node.next('label').addClass('ttk__input__label--focused')
	}
}