let tabindex = 900
const time = (new Date()).getTime()
const createInput = (field,) => {

	return $('<input>', {
		type: 'text',
		class: `ttk__input${ field.name ? ` ttk__input--${field.name}` : '' }`,
		maxlength: field.maxlength,
		autocomplete: field.droplist ? `ttk__${time}` : false,
		name: field.name,
		tabindex: tabindex++
	})
}

export default function(field) {

	const input = createInput(field);
	let timer

	const block = $('<div>', {

		class: `ttk__input__wrap ttk__input__wrap--${field.name}`
	}).append(input, $('<label>', {
		html: field.label,
		class: `ttk__input__label ttk__input__label--${field.name}`
	})).focusout((e) => {

	timer = setTimeout(() => {
		$(block).removeClass('ttk__input__wrap--focused')

		$(block).find('.ttk__input__droplist').hide()
	}, 500)

	}).click(() => {
		clearTimeout(timer)
	})

	return { input, block }
}
