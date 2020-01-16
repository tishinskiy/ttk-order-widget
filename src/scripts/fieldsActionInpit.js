import sortItems from './sortItems'
import streetDropDown from './streetDropDown'

export default function(){

	const node = this.node

	const Store = this.store.readState()[this.name]

	switch (this.name) {

		case 'city':

			this.dropList.filterDropList(list => {

				const newList =  list.filter(item => {

					return (item['EXTERNAL_NAME'].toLowerCase().indexOf($(node).val().toLowerCase()) != -1)
				})

				return sortItems(newList, $(node).val())
			})

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