import jsonpRequest from './jsonpReqyest'
import addDropDown from './addDropDown'
import sortItems from './sortItems'
import buildDropList from './buildDropList'
import scrollDroplist from './scrollDroplist'
import streetDropDown from './streetDropDown'
// import changeCity from './changeCity'

export default function(){

	$(this.node).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
	$(this.node).closest('.ttk__input__wrap').addClass('ttk__input__wrap--focused')


	const thas = this
	const store = this.store.readState()[this.name]
	const requests = this.store.readState().Requests

	const showDropdown = () => {

		this.dropList.filterDropList(list => ([...list]))
		this.addDropDown()
		scrollDroplist.call(this)
	}

	switch (this.name) {
		case 'city':

			$(this.node)
				.val('')
				.attr('placeholder', 'current' in store.readState() ? store.readState().current['EXTERNAL_NAME'] : '')

			if (!('cities' in requests.readState())) {

				;( async () => {

					try {

						const result = await jsonpRequest('https://gate.myttk.ru/gate/jsonp/city.php', {name: store.readState()['EXTERNAL_NAME']})

						requests.updateState(state => ({
							...state,
							cities: sortItems(result.results)
						}))

						this.dropList.createDropList(result.results)

						showDropdown()

					} catch(error) {

						console.log('city error', error)
						return false
					}

				})()
			} else {

				showDropdown()
			}

			break

		case 'street': 

			if ($(this.node).val().length >= 3) {

				streetDropDown.call(this)
			}

			break

		default:
			break
	}
}