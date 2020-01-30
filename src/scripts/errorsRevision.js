export default function() {
	if (this.node.value === '') {
		this.store.updateState(state => ({
			...state,
			error: {
				code: `err_${this.name}_empty`,
				node: this.node
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if ('dropList' in this && !this.store.readState()[this.name].readState().current) {
		this.store.updateState(state => ({
			...state,
			error: {
				code: `err_${this.name}`,
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	if ('minLength' in this && this.node.value.length < this.minLength) {
		this.store.updateState(state => ({
			...state,
			error: {
				code: `err_${this.name}`,
			}
		}))
		this.observable.eventEmitter('showError')
		return false
	}

	return true
}
