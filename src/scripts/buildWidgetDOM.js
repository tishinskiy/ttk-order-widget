import buttonClickAction from './buttonClickAction'

export default function(blocks) {

	const params = this.store.readState().params

	const form = $('<div>', {
		class: 'ttk__form'
	})

	const formBlock = $('<div>', {

		class: 'ttk__form__wrap'
	}).append(form)

	const button = $('<button>', {

		class: 'ttk__button',
<<<<<<< HEAD
		html: 'Проверить',
		tabindex: 920
=======
		html: 'Отправить заявку',
		tabindex: 1010
>>>>>>> master
	})

	const buttonBlock = $('<div>', {

		class: 'ttk__input__wrap ttk__input__wrap--button',
	}).append(button)

	for (let key in blocks) {

		if (
			key === 'city'
			&& params.hideCity
			&& typeof params.currentCity === 'object'
			&& typeof params.currentCity['INTERNAL_ID'] === 'string'
			&& typeof params.currentCity['EXTERNAL_ID'] === 'string'
			&& typeof params.currentCity['EXTERNAL_NAME'] === 'string'
		) {
			blocks[key].css({display: 'none'})
		}
		form.append(blocks[key])
	}

	form.append(buttonBlock)

	$(this.node).append(formBlock)

	button.on('click', buttonClickAction.bind(this))
}
