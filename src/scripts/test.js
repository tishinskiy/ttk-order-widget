export default function() {


	$(this.block)

		.on('input', () => {
			console.log($(this.block).val())
		})

		.on('focus', () => {

			$(this.block).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
			$(this.block).closest('.ttk__input__wrap').addClass('ttk__input__wrap--focused')
		})

		.on('focusout', event => {

			const thas = $(this.block)

			thas.attr('placeholder', '')

			if (event.originalEvent && $(event.originalEvent.relatedTarget).hasClass('ttk__droplist__item')) {
				return false
			}
			if (!thas.val().length) {

				thas.siblings('.ttk__input__label').removeClass('ttk__input__label--focused')
			}

			$(this.block).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')

			thas.siblings('.ttk__input__droplist').hide()

		})
}