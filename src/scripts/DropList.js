import buildDropList from './buildDropList'

export class DropList {

	constructor(store) {
		this.list = [];
		this.filterList = []
	}

	createDropList(list) {
		this.list = list
	}

	filterDropList(filter) {

		this.filterList = filter(this.list)
		return this.filterList
	}
}
