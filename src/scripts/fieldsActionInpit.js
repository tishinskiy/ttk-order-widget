import sortItems from './sortItems'
import streetDropDown from './streetDropDown'

export default function(){

	const node = this.node

	$(node).val($(node).val().replace(/^\s*/,''))

	const Store = this.store.readState()[this.name]
	this.invertKeyboard()

	switch (this.name) {

		case 'city':

			this.dropList.filterDropList(list => {

				const newList =  list.filter(item => {

					return (item['EXTERNAL_NAME'].toLowerCase().indexOf($(node).val().toLowerCase()) != -1)
				})

				return sortItems(newList, $(node).val())
			})

			if (this.dropList.filterList.length === 1 && $(node).val().toLowerCase() === Store.readState().current['EXTERNAL_NAME'].toLowerCase()) {
				$(node).siblings('.ttk__input__droplist').remove()
				return false
			}

			this.addDropDown()
			break

		case 'street':

			if ($(node).val().length < 3) {

				$(node).siblings('.ttk__input__droplist').remove()
				return false
			}

			streetDropDown.call(this)

			break

		default:

			break
	}
}