import jsonpRequest from './jsonpReqyest'
import createDropDown from './dropDown'
import addDropDown from './addDropDown'
import {readStore} from './Store'
import sortItems from './sortItems'
// import changeCity from './changeCity'

export default function(name){

	const thas = this


	const Store = readStore.call(this)

	const showDropdown = (thas) => {

		thas.dropdown.filterDropList(list => ([...list]))

		addDropDown.call(thas, thas.dropdown.buildDropList('city', $(thas).val().length ? $(thas).val() : false, 'current' in Store.City.readState() ? Store.City.readState().current : false))
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

						thas.Store.Requests.updateState(state => ({
							...state,
							cities: sortItems(result.results)
						}))

						thas.dropdown.createDropList(result.results)
						showDropdown(thas)

					} catch(error) {

						console.log('error', error)
						return false
					}

				})()
			} else {

				showDropdown(thas)
			}



			$(this).on('keydown', function(event){
				console.log(event.key)
				switch (event.key) {

					case "ArrowDown":
						console.log("ArrowDown")
						return false
						break

					case "ArrowUp":
						console.log("ArrowUp")
						return false
						break

					case "Enter":
						console.log("Enter")
						return false
						break

					default:
						break
				}
			})

			break

		default:
			break
	}
}