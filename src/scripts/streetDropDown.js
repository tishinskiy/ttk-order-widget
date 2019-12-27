import addDropDown from './addDropDown'
import sortItems from './sortItems'
import {readStore} from './Store'
import jsonpRequest from './jsonpReqyest'
import createDropDown from './dropDown'
import scrollDroplist from './scrollDroplist'

export default function(){

	const thas = this
	const Store = readStore.call(thas)
	const city = Store.City.readState().current

	const showDropdown = (thas) => {

		thas.dropdown.filterDropList(list => {

			const newList = list.filter(item => {

				return (item['STREET_NAME'].toLowerCase().indexOf($(thas).val().toLowerCase()) != -1)
			})

			const listName = sortItems(newList, $(thas).val(), 'STREET_NAME')

			const newList2 = list.filter(item => {

				return (item['TYPE_NAME'].toLowerCase().indexOf($(thas).val().toLowerCase()) != -1)
			})

			const listType = sortItems(newList2, '', 'STREET_NAME')

			return [...listName, ...listType]
		})

		if(addDropDown.call(thas, thas.dropdown.buildDropList('street', $(thas).val().length ? $(thas).val() : false, 'current' in Store.Street.readState() ? Store.Street.readState().current : false))) {

			// scrollDroplist.call(thas)
		}
	}

	if (!city) {
		console.log('SHOW ERROR!!!')
		return false
	}

	;(async () => {

		let Result

		const requests  = Store.Requests.readState()

		if ('street' in requests) {

			const exist = requests.street.some(item => {
				return item.city === city['INTERNAL_ID'] && item.search === $(thas).val()
			})

			if (exist) {

				Result =  requests.street.filter(item => {
					return item.city === city['INTERNAL_ID'] && item.search === $(thas).val()
				})[0].results

			}
		}

		if (!Result) {

			try {

				const result = await jsonpRequest('https://gate.myttk.ru/gate/jsonp/street.php', {
						city: city['INTERNAL_ID'],
						search: $(thas).val()
					})

				let results

				try {

					results = result.results
				} catch(e) {

					results = []
				}

				const newStreet = {
					city: city['INTERNAL_ID'],
					search: $(thas).val(),
					results
				}

				Store.Requests.updateState(state => ({
					...state,
					street: !!state.street ? [ ...state.street, newStreet ] : [ newStreet ]
				}))

				Result = results

			// 	return true

			} catch(error) {

				console.log('street error', error)
				return false
			}

		} 

		console.log('Result => ', Result)

		if (Result.length) {
			thas.dropdown = createDropDown(Store)
			thas.dropdown.createDropList(Result)
			showDropdown(thas)
		} else {
			$(thas).siblings('.ttk__input__droplist').remove()
		}
	
	})()
}