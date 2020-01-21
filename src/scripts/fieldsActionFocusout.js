
export default function(name){
	console.log(111111111, this)

	switch (this.name) {
		case 'city':

			const Store = this.store.readState().city
			const node = this.node
			if ($(node).val() === '') {

				$(node).val('current' in Store.readState() ? Store.readState().current['EXTERNAL_NAME'] : '')
			} else {

				let marker = true
				this.addEmitter({
					event: 'changeCity',
					action() {
						marker = !marker
					}
				})

				setTimeout(() => {
					if (marker) {

						console.log(77777777, this)
						const cities = this.store.readState().Requests.readState().cities
						if (cities && cities.length) {

							const arr = cities.filter(item => $(node).val().toLowerCase() === item['EXTERNAL_NAME'].toLowerCase())

							if (arr.length) {
								Store.updateState(state => ({
									...state,
									current: arr[0]
								}))
								this.observable.eventEmitter('changeCity')
							}
						}
					}
				}, 100)
			}

			break

		default:
			break
	}
}