import jsonpRequest from './jsonpReqyest'
import createDropDown from './dropDown'

export default function(name){

	const thas = this

	console.log('thas', thas.Store)


	switch (name) {
		case 'city':

			if (!('dropdown' in thas)) {

				thas.dropdown = createDropDown(this.Store)
			}
			if (!('cities' in this.Store.Requests.readState())) {

				;( async function() {

					try {

						const result = await jsonpRequest('https://gate.myttk.ru/gate/jsonp/city.php', {name: thas.Store.City.readState()['EXTERNAL_NAME']})


						thas.Store.Requests.updateState(state => ({
							...state,
							cities: result.results
						}))

						thas.dropdown.createDropList(result.results)

						thas.Store.City.updateState(state => ({
							...state,
							cities: result.current
						}))

						thas.dropdown.filterDropList(list => ([...list]))
						console.log(thas.dropdown.buildDropList('city'))


					} catch(error) {

						console.log('error', error)
					}

				})()
			} else {

				thas.dropdown.filterDropList(list => ([...list]))
				thas.dropdown.buildDropList('city')
			}

			console.log('thas.dropdown', thas.dropdown)
			
			$(...thas.dropdown.buildDropList('city')).insertAfter($(thas))

			break

		default:
			break
	}
}