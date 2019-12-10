import fieldsProps from './fieldsProps'

const createInput = (name,) => {

	const props = fieldsProps[name] ? fieldsProps[name] : {}

	return $('<input>', {
		type: 'text',
		class: `ttk__input${ name ? ` ttk__input--${name}` : '' }`,
		maxlength: 20,
		autocomplete: false,
		name,
		...props
	})
}

export default function(name, label) {

	const input = createInput(name);

	const block = $('<div>', {

		class: `ttk__input__wrap${ name ? ` ttk__input__wrap--${name}` : '' }`
	}).append(input, $('<label>', {
		html: label,
		class: `ttk__input__label${ name ? ` ttk__input__label--${name}` : '' }`
	}))

	return { input, block }
}