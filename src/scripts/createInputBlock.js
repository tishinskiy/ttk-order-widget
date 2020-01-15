// import fieldsProps from './fieldsProps'
const time = (new Date()).getTime()
const createInput = (field,) => {

	return $('<input>', {
		type: 'text',
		class: `ttk__input${ field.name ? ` ttk__input--${field.name}` : '' }`,
		maxlength: field.maxlength,
		autocomplete: field.droplist ? `ttk__${time}` : false,
		name: field.name,
	})
}

export default function(field) {

	const input = createInput(field);

	const block = $('<div>', {

		class: `ttk__input__wrap ttk__input__wrap--${field.name}`
	}).append(input, $('<label>', {
		html: field.label,
		class: `ttk__input__label ttk__input__label--${field.name}`
	}))

	return { input, block }
}