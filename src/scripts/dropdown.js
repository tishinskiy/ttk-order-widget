import buildDropList from './buildDropList'

const DropList = class {

	constructor(store) {
		this.Store = store;
		this.list = [];
		this.filter = '';
		this.filterList = []
	}

	createDropList(list) {
		this.list = list
	}

	filterDropList(filter) {

		this.filterList = filter(this.list)
		return this.filterList
	}

	buildDropList(name, str = false, current = false) {
		return buildDropList(name, this.filterList, str, current)
	}
}

export default (store) => (new DropList(store))