import jsonpRequest from './jsonpReqyest'
import createDropDown from './dropDown'
import addDropDown from './addDropDown'
import {readStore} from './Store'
import sortItems from './sortItems'
import scrollDroplist from './scrollDroplist'
// import changeCity from './changeCity'

export default function(name){

	const thas = this


	const Store = readStore.call(this)

	const showDropdown = (thas) => {

		thas.dropdown.filterDropList(list => ([...list]))

		addDropDown.call(thas, thas.dropdown.buildDropList('city', $(thas).val().length ? $(thas).val() : false, 'current' in Store.City.readState() ? Store.City.readState().current : false))

		scrollDroplist.call(thas)
	}

	switch (name) {
		case 'city':

			$(thas)
				.val('')
				.attr('placeholder', 'current' in Store.City.readState() ? Store.City.readState().current['EXTERNAL_NAME'] : '')

			if (!('dropdown' in thas)) {

				thas.dropdown = createDropDown(Store)
			}
			if (!('cities' in Store.Requests.readState())) {

				;( async function() {

					try {

						const result = await jsonpRequest('https://gate.myttk.ru/gate/jsonp/city.php', {name: thas.Store.City.readState()['EXTERNAL_NAME']})

						Store.Requests.updateState(state => ({
							...state,
							cities: sortItems(result.results)
						}))

						thas.dropdown.createDropList(result.results)
						showDropdown(thas)

					} catch(error) {

						console.log('city error', error)
						return false
					}

				})()
			} else {

				showDropdown(thas)

			}

			break

		default:
			break
	}
}