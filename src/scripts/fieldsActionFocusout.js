
export default function(name){

	const Store = this.store.readState()[this.name]
	const node = this.node
	const current = Store.readState().current
	const changeEvent = `change${this.name[0].toUpperCase()}${this.name.slice(1)}`

	const fieldAction = (func_1, func_2,) => {
		if (Store.readState().itemClick) {
			console.log(2222222)
			Store.updateState(state => ({
				...state,
				itemClick: false
			}))

			// return false
		} else {

			$(node).val() === '' ? func_2() : func_1()
		}
	}

	const func = (arr, fieldId, fieldName) => {

			Store.updateState(state => ({
			...state,
			current: arr.length ? arr[0] : false
		}))

		if (current && arr.length && arr[0][fieldId] === current[fieldId]) {
			$(node).val(arr[0][fieldName])
			$(node).siblings('.ttk__droplist').remove()
			return false
		}

		if (!current) {

			if (arr.length) {

				$(node).val(arr[0][fieldName])
			}
		}

		this.observable.eventEmitter(changeEvent)
	}

	switch (this.name) {
		case 'city': {
			fieldAction(() => {

				const arr = this.dropList.list.filter(item => $(node).val().toLowerCase() === item['EXTERNAL_NAME'].toLowerCase())

				func(arr, 'EXTERNAL_ID', 'EXTERNAL_NAME')
			},

			() => {

				console.log(44444444)
				$(node).val('current' in Store.readState() ? Store.readState().current['EXTERNAL_NAME'] : '')
			})

			break
		}

		case 'street': {

			fieldAction(() => {

				const arr = this.dropList.list.filter(item => {

					return (($(node).val().toLowerCase() === item['STREET_NAME'].toLowerCase()) && (!!this.type ? this.type.toLowerCase() === item['TYPE_NAME'].toLowerCase() : true))
				})

				func(arr, 'STREET_ID', 'STREET_NAME')

			}, () => {

				if (!current) return false

				$(node).val(current ? Store.readState().current['STREET_NAME'] : '')
				$(node).siblings('.ttk__input__label').html(current['TYPE_NAME'])
			})

			break
		}

		case 'building': {

			fieldAction(() => {

				const arr = this.dropList.list.filter(item => {

					return $(node).val().toLowerCase() === item['FULL_NAME'].toLowerCase()
				})

				func(arr, 'BUILDING_ID', 'FULL_NAME')

			}, () => {

				if (!current) return false

				$(node).val(current ? Store.readState().current['FULL_NAME'] : '')
			})

			break
		}

		case 'phone':
			if ($(node).val() === '+7 (') {
				$(node).val('')
				$(node).next('.ttk__input__fake').remove()
			}

			break

		default:
			break
	}
}
