// import jsonpRequest from './jsonpReqyest'
// import createDropDown from './dropDown'
// import addDropDown from './addDropDown'
// import {readStore} from './Store'
// import sortItems from './sortItems'
// import scrollDroplist from './scrollDroplist'
// import streetDropDown from './streetDropDown'
// import changeCity from './changeCity'

export default function(){

	$(this.node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
	$(this.node).closest('.ttk__input__wrap').addClass('ttk__input__wrap--focused')


	const thas = this


	const store = this.store.readState()[this.name]
	const requests = this.store.readState().Requests

	const showDropdown = (thas) => {

		thas.dropdown.filterDropList(list => ([...list]))

		addDropDown.call(thas, thas.dropdown.buildDropList('city', $(thas).val().length ? $(thas).val() : false, 'current' in store.readState() ? Store.City.readState().current : false))

		scrollDroplist.call(thas)
	}

	switch (this.name) {
		case 'city':
			console.log(8888, this.store.readState().city)
			$(thas.node)
				.val('')
				.attr('placeholder', 'current' in store.readState() ? store.readState().current['EXTERNAL_NAME'] : '')

			// if (!('dropdown' in thas)) {

			// 	thas.dropdown = createDropDown(Store)
			// }
			if (!('cities' in requests.readState())) {

				;( async function() {

					try {

						const result = await jsonpRequest('https://gate.myttk.ru/gate/jsonp/city.php', {name: thas.store.readState()['EXTERNAL_NAME']})

						requests.updateState(state => ({
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

		case 'street': 

			if ($(thas).val().length >= 3) {

				streetDropDown.call(this)
			}

			break

		default:
			break
	}
}