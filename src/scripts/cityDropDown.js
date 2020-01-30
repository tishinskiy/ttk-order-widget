import jsonpRequest from './jsonpRequest'
import addDropDown from './addDropDown'
import scrollDroplist from './scrollDroplist'


export default function() {

	const Store = this.store.readState()[this.name]
	const requests = this.store.readState().Requests

	const showDropdown = () => {
		this.dropList.filterDropList(list => ([...list]))
		this.addDropDown()
		scrollDroplist.call(this)
	}

	$(this.node)
		.val('')
		.attr('placeholder', 'current' in Store.readState() ? Store.readState().current['EXTERNAL_NAME'] : '')

	if (!('cities' in requests.readState())) {

		;( async () => {

			try {

				const result = await jsonpRequest('https://gate.myttk.ru/gate/jsonp/city.php', {name: Store.readState()['EXTERNAL_NAME']})

				const results = {}

				try {

					for (let i = 0; i < result.results.length; i++) {
						results[result.results[i]['EXTERNAL_ID']] = result.results[i]

						result.results[i]['key'] = result.results[i]['EXTERNAL_ID']
					}

				} catch(e) {
					console.log('ERR => ', e)
				}

				requests.updateState(state => ({
					...state,
					[this.name]: result.results
				}))

				Store.updateState(state => ({
					...state,
					results: result.results,
					items: state.items ? {
						...state.items,
						...results
					} : {
						...results
					}
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
}
