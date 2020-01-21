export default function() {
	// console.log('event', this)
	const input = this


	switch (input.name) {

		case 'city':

			const node = input.node
			return {
				event: 'changeCity',
				action() {

					const current = input.store.readState().city.readState().current

					if (current) {
						
						$(node).val(current['EXTERNAL_NAME'])
					}

					$(node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
					$(node).closest('.ttk__input__wrap').addClass('ttk__input__wrap--focused')
					$(node).siblings('.ttk__input__droplist').hide()
				}
			}
			break

		default:
			return false
			break
	}
}