export default function() {

	const input = this
	const node = input.node
	const inputCurrent = () => input.store.readState()[input.name].readState().current


	switch (input.name) {

		case 'city':

			return {
				event: 'changeCity',
				action() {
					const current = inputCurrent()
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
						const current = inputCurrent()
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

		case 'building':

			const clear = () => {
				console.log('CLEAR', input)

				if ($(node).val() != '') {

					$(node).val('')
					$(node).siblings('.ttk__input__label')
						.removeClass('ttk__input__label--focused')
				}

				input.store.readState()[input.name].updateState(state => ({
					...state,
					current: false
				}))
			}

			return [

				{
					event: 'changeBuilding',
					action() {
						const current = inputCurrent()

						if (current) {
							
							$(node).val(current['HOUSE_NUMBER'])
						}

						$(node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
						$(node).siblings('.ttk__input__droplist').hide()
						$(node).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')
					}
				},
				{
					event: 'changeCity',
					action: clear
				},
				{
					event: 'changeStreet',
					action: clear
				},
			]

			break

		default:
			return false
			break
	}
}