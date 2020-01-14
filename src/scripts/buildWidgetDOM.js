export default function(blocks) {

	const form = $('<div>', {
		class: 'ttk__form'
	})

	const formBlock = $('<div>', {

		class: 'ttk__form__wrap'
	}).append(form)

	const button = $('<button>', {

		class: 'ttk__button',
		html: 'Отправить заявку',
	})

	const buttonBlock = $('<div>', {

		class: 'ttk__input__wrap ttk__input__wrap--button',
	}).append(button)

	for (let key in blocks) {
		form.append(blocks[key])
	}

	form.append(buttonBlock)

	$(this).append(formBlock)

	return { button }
}