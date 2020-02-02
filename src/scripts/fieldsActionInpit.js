import sortItems from './sortItems'
import streetDropDown from './streetDropDown'
import buildingDropDown from './buildingDropDown'
import phoneMask from './phoneMask'
import { getCaretPosition, setCaretPosition } from './inputCaretPosition'

export default function(){


	const node = this.node

	const caret = getCaretPosition(node)

	$(node).val($(node).val().replace(/^\s*/,''))

	setCaretPosition($(node), caret)

	const Store = this.store.readState()[this.name]

	if (this.lang) {

		this.invertKeyboard()
	}

	switch (this.name) {

		case 'city':

			this.dropList.filterDropList(list => {

				const newList =  list.filter(item => {

					return (item['EXTERNAL_NAME'].toLowerCase().indexOf($(node).val().toLowerCase()) != -1)
				})

				return sortItems(newList, $(node).val())
			})

			if (this.dropList.filterList.length === 1 && $(node).val().toLowerCase() === this.dropList.filterList[0]['EXTERNAL_NAME'].toLowerCase()) {
				$(node).siblings('.ttk__input__droplist').remove()
				return false
			}

			this.addDropDown()
			break

		case 'street':

			streetDropDown.call(this)

			break

		case 'building':

			if ($(node).val().length < 1) {

				$(node).siblings('.ttk__input__droplist').remove()
				return false
			}

			buildingDropDown.call(this)

			break
		case 'family':
		case 'name':
		const str = $(node).val().replace(/\d/,'')

			if (str.length) {
				$(node).val(str[0].toUpperCase() + str.slice(1))
				setCaretPosition(node, caret)
			}

			break

		case 'phone':
			phoneMask.call(this)

			break

		default:

			break
	}
}
