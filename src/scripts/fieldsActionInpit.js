import addDropDown from './addDropDown'
import sortItems from './sortItems'
import {readStore} from './Store'
import jsonpRequest from './jsonpReqyest'
import createDropDown from './dropDown'

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

			const city = Store.City.readState().current

			const showDropdown = (thas) => {

				thas.dropdown.filterDropList(list => ([...list]))

				addDropDown.call(thas, thas.dropdown.buildDropList('street', $(thas).val().length ? $(thas).val() : false, 'current' in Store.Street.readState() ? Store.Street.readState().current : false))

				scrollDroplist.call(thas)
			}

			if (!city) {
				console.log('SHOW ERROR!!!')
				return false
			}

			if ($(thas).val().length === 3) {

				let Result

				const requests  = Store.Requests.readState()

				if ('street' in requests) {

					const exist = requests.street.some(item => {
						return item.city === city['INTERNAL_ID'] && item.search === $(thas).val()
					})

					if (exist) {

						Result =  requests.street.filter(item => {
							return item.city === city['INTERNAL_ID'] && item.search === $(thas).val()
						})[0]

					}
				}

				if (!Result) {

					;(async () => {

						try {


							const result = await jsonpRequest('https://gate.myttk.ru/gate/jsonp/street.php', {
									city: city['INTERNAL_ID'],
									search: $(thas).val()
								})

							const newStreet = {
								city: city['INTERNAL_ID'],
								search: $(thas).val(),
								results: result.results
							}

							Store.Requests.updateState(state => ({
								...state,
								street: [ ...state.street, newStreet ]
							}))

							Result = result.results



						} catch(error) {

							console.log('street error', error)
							return false
						}

					})()
				}

				thas.dropdown = createDropDown(Store)
				thas.dropdown.createDropList(Result)
				// showDropdown(thas)
			}
			break

		default:
			break
	}
}