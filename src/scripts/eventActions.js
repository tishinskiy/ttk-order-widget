export default function() {

	const input = this
	const node = input.node
	const store = input.store.readState()[input.name]
	const inputCurrent = () => store.readState().current


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
					store.updateState(state => ({
						...state,
						itemClick: false
					}))
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

						store.updateState(state => ({
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

						store.updateState(state => ({
							...state,
							itemClick: false
						}))
					}
				}
			]

			break

		case 'building':

			const clear = () => {

				if ($(node).val() != '') {

					$(node).val('')
					$(node).siblings('.ttk__input__label')
						.removeClass('ttk__input__label--focused')
				}

				store.updateState(state => ({
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
							
							$(node).val(current['FULL_NAME'])
						}

						$(node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
						$(node).siblings('.ttk__input__droplist').hide()
						$(node).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')
						store.updateState(state => ({
							...state,
							itemClick: false
						}))

						if(current['TC'] === null ) {

							if (input.store.readState().params.collector) {

								console.log(`SEND TO ${input.store.readState().params.collector}`, current)
							}

							if (input.store.readState().params.coverage) {

								input.store.updateState(state => ({
									...state,
									error: {
										code: 'err_7',
									}
								}))
								input.observable.eventEmitter('showError')
								$(node).blur()
								return false
							}

						}
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