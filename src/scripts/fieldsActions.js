import fieldsActionFocus from './fieldsActionFocus'

export default function() {

	const node = this.node

	$(node)

		.on('input', () => {
			console.log($(node).val())
		})

		.on('focus', fieldsActionFocus.bind(this))
		// .on('focus', () => {

		// 	$(node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
		// 	$(node).closest('.ttk__input__wrap').addClass('ttk__input__wrap--focused')
		// })

		.on('focusout', event => {

			$(node).attr('placeholder', '')

			if (event.originalEvent && $(event.originalEvent.relatedTarget).hasClass('ttk__droplist__item')) {
				return false
			}
			if (!$(node).val().length) {

				$(node).siblings('.ttk__input__label').removeClass('ttk__input__label--focused')
			}

			$(node).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')

			$(node).siblings('.ttk__input__droplist').hide()

		})
}