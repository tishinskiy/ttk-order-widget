import fieldsInpitAction from './fieldsInpitAction.ts'

export default function(inputs) {

	const fields = $()

	for (let key in inputs) {
		fields.push(inputs[key][0])

		inputs[key].on('input focus focusout', function(event){
			console.log(event.type)
			fieldsInpitAction.call(this, key, 7)
		})

	}

	fields
		.focus(function() {

			$(this).next('.ttk__input__label').addClass('ttk__input__label--focused')
		})

		.focusout(function() {
			if (!$(this).val().length) {

				$(this).next('.ttk__input__label').removeClass('ttk__input__label--focused')
			}
		})
}