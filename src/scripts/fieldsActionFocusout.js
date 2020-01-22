
export default function(name){

	switch (this.name) {
		case 'city': {

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

						const cities = this.store.readState().Requests.readState().cities
						if (cities && cities.length) {

							const arr = cities.filter(item => $(node).val().toLowerCase() === item['EXTERNAL_NAME'].toLowerCase())

							if (arr.length) {

								Store.updateState(state => ({
									...state,
									current: arr[0]
								}))
								this.observable.eventEmitter('changeCity')
								
							} else {

								if (Store.readState().current) {
									Store.updateState(state => ({
										...state,
										current: false
									}))
									this.observable.eventEmitter('changeCity')
								}
							}
						}
					}
				}, 200)
			}

			break
		}

		case 'street': {


			const Store = this.store.readState().street
			const node = this.node
			const current = Store.readState().current

			if ($(node).val() === '') {

				$(node).val(current ? Store.readState().current['STREET_NAME'] : '')
				$(node).siblings('.ttk__input__label').html(current['TYPE_NAME'])

			} else {


				let marker = true

				this.addEmitter({
					event: 'changeStreet',
					action() {
						marker = !marker
					}
				})

				setTimeout(() => {

					if (marker) {

						const arr = this.dropList.list.filter(item => {

							return (($(node).val().toLowerCase() === item['STREET_NAME'].toLowerCase()) && (!!this.type ? this.type.toLowerCase() === item['TYPE_NAME'].toLowerCase() : true))
						})

						Store.updateState(state => ({
							...state,
							current: arr.length ? arr[0] : false
						}))

						this.observable.eventEmitter('changeStreet')
					}
				}, 200)

			}

			break
		}

		default:
			break
	}
}