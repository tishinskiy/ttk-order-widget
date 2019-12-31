import addDropDown from './addDropDown'
import sortItems from './sortItems'
import {readStore} from './Store'

import streetDropDown from './streetDropDown'

export default function(name){

	const thas = this

	const Store = readStore.call(this)

	switch (name) {
		case 'city':

			thas.dropdown.filterDropList(list => {

				const newList =  list.filter(item => {

					return (item['EXTERNAL_NAME'].toLowerCase().indexOf($(thas).val().toLowerCase()) != -1)
				})

				return sortItems(newList, $(thas).val())
			})
			addDropDown.call(thas, thas.dropdown.buildDropList('city', $(thas).val().length ? $(thas).val() : false, 'current' in Store.City.readState() ? Store.City.readState().current : false))
			break

		case 'street':

			if ($(thas).val().length < 3) {

				$(thas).siblings('.ttk__input__droplist').remove()
				return false
			}

			streetDropDown.call(this)

			break

		default:

			break
	}
}