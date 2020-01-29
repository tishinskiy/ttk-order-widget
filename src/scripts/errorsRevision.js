export default function() {
	const store = this.store.readState()
	const City = store.city.readState().current
	const city = store.city.readState().node
	const Street = store.street.readState().current
	const street = store.street.readState().node
	const Building = store.building.readState().current
	const building = store.building.readState().node
	const ofice = store.apartment.readState()
	const name = store.name.readState()
	const family = store.family.readState()
	const phone = store.phone.readState()

	if (city.value === '') {
		this.store.updateState(state => ({
			...state,
			error: {
				code: 'err_2a',
				node: value
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (!City) {
		this.store.updateState(state => ({
			...state,
			error: {
				code: 'err_2',
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (street.value === '') {
		this.store.updateState(state => ({
			...state,
			error: {
				code: 'err_3a',
				node: street
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (!Street) {
		this.store.updateState(state => ({
			...state,
			error: {
				code: 'err_3',
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (building.value === '') {
		this.store.updateState(state => ({
			...state,
			error: {
				code: 'err_4a',
				node: building
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (!Building) {
		this.store.updateState(state => ({
			...state,
			error: {
				code: 'err_4',
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (!ofice.node.value.length) {

		this.store.updateState(state => ({
			...state,
			error: {
				code: `err_11a`,
				node: ofice.node
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (family.node.value.length < 2) {

		this.store.updateState(state => ({
			...state,
			error: {
				code: `err_9${!family.node.value.length? 'a' : ''}`,
				node: family.node
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (name.node.value.length < 2) {

		this.store.updateState(state => ({
			...state,
			error: {
				code: `err_8${!name.node.value.length? 'a' : ''}`,
				node: name.node
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if (phone.node.value.length < 17) {

		this.store.updateState(state => ({
			...state,
			error: {
				code: `err_10${!phone.node.value.length? 'a' : ''}`,
				node: phone.node
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}
}
