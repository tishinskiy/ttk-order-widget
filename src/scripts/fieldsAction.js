import fieldsActionInpit from './fieldsActionInpit'
import fieldsActionFocus from './fieldsActionFocus'

export default function(inputs) {

	const fields = $()

	for (let key in inputs) {
		fields.push(inputs[key])

		$(inputs[key]).on('input focus focusout', function(event){


			switch (event.type) {

				case 'focus':
					console.log('focus')
					fieldsActionFocus.call(this, key,)
					break

				case 'input':
					console.log('input')
					fieldsActionInpit.call(this, key,)
					break

				default:
					break
			}
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