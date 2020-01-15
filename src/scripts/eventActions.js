export default function() {
	console.log('event', this)
	const input = this


	switch (input.name) {

		case 'city':

			const node = this.node
			return {
				event: 'changeCity',
				action() {

					$(node).focus()
					$(node).val(input.store.readState().city.readState().current['EXTERNAL_NAME'])
					$(node).blur()

				}
			}
			break

		default:
			return false
			break
	}

	// return {
	// 	event: 'changeCity',
	// 	action() {
	// 		console.log(333, input.name)
	// 	}
	// }
}