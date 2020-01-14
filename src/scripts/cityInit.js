import changeCity from './changeCity'

export default function () {

	this.changeCity = changeCity

	const input = $(this.store.readState().city.block)

	const current = this.store.readState().params.currentCity

	if (current) {

		this.changeCity(current)
	}

	if (input.val() !== '') {

		input.next('label').addClass('ttk__input__label--focused')
	}
}