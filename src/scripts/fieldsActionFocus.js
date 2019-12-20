import jsonpRequest from './jsonpReqyest'
import createDropDown from './dropDown'
import addDropDown from './addDropDown'
import {readStore} from './Store'

export default function(name){

	const thas = this

	const Store = readStore.call(this)


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

						thas.Store.Requests.updateState(state => ({
							...state,
							cities: result.results
						}))

						thas.dropdown.createDropList(result.results)
						thas.dropdown.filterDropList(list => ([...list]))
						addDropDown.call(thas, thas.dropdown.buildDropList('city'))

					} catch(error) {

						console.log('error', error)
					}

				})()
			} else {

				thas.dropdown.filterDropList(list => ([...list]))
				addDropDown.call(thas, thas.dropdown.buildDropList('city'))
			}


			break

		default:
			break
	}
}