export default function() {

	const input = this
	const node = input.node

	switch (input.name) {

		case 'city':

			return {
				event: 'changeCity',
				action() {

					const current = input.store.readState().city.readState().current

					if (current) {
						
						$(node).val(current['EXTERNAL_NAME'])
					}

					$(node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
					$(node).siblings('.ttk__input__droplist').hide()
					$(node).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')
				}
			}
			break

		case 'street':

			return [
				{
					event: 'changeCity',
					action() {

						$(node).val('')
						$(node).siblings('.ttk__input__label')
							.removeClass('ttk__input__label--focused')
							.removeClass('.ttk__input__label--fixed')
							.html('Улица')

						input.type = false

						input.store.readState().street.updateState(state => ({
							...state,
							current: false
						}))
					}
				},
				{
					event: 'changeStreet',
					action() {

						const current = input.store.readState().street.readState().current

						if (current) {
							
							$(node).val(current['STREET_NAME'])
						}

						$(node).siblings('.ttk__input__label')
							.addClass('ttk__input__label--focused')
							.removeClass('.ttk__input__label--fixed')
							.html(current['TYPE_NAME'])
						$(node).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')
						$(node).siblings('.ttk__input__droplist').hide()
					}
				}
			]

			break

		default:
			return false
			break
	}
}