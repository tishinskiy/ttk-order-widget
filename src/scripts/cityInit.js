import changeCity from './changeCity'

export default function () {

	// console.log('cityInit', this)

	this.changeCity = changeCity

	const node = $(this.store.readState().city.node)

	const current = this.store.readState().params.currentCity

	if (current) {

		this.changeCity(current)
	}

	if (node.val() !== '') {

		node.next('label').addClass('ttk__input__label--focused')
	}
}