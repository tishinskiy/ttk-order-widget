export class Store {

	constructor(state = {}) {
		this.state = state;
	}

	updateState(updater) {
		this.state = updater(this.state);
	}

	readState() {
		return this.state
	}

	clearState() {
		this.state = {}
		this.notifyObservers();
	}
}
