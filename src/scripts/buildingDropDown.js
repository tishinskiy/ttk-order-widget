import sortItems from './sortItems'
import jsonpRequest from './jsonpReqyest'
import scrollDroplist from './scrollDroplist'
import { typeInValue } from './streetTypes'

export default function(go = false){

	const thas = this
	const node = this.node
	const Store = this.store.readState()[this.name]
	// const city =  this.store.readState().city.readState().current
	const street =  this.store.readState().street.readState().current
	const requests = this.store.readState().Requests

	let str = $(this.node).val()

	if (str.length < 1) return false

	const findBuildingInAPI = async () => {

		try {

			const result = await jsonpRequest('https://gate.myttk.ru/gate/jsonp/building.php', {
					street: street['STREET_ID'],
				})

			const results = {}

			try {

				for (let i = 0; i < result.results.length; i++) {
					results[result.results[i]['BUILDING_ID']] = result.results[i]
				}

			} catch(e) {
				console.log('ERR => ', e)
				// results = {}
			}

			const newBuilding = {
				street: street['STREET_ID'],
				results
			}

			requests.updateState(state => ({
				...state,
				building: !!state.building ? [ ...state.building, newBuilding ] : [ newBuilding ]
			}))

			Store.updateState(state => ({
				...state,
				results
			}))

			return result.results

		} catch(error) {

			console.log('building error', error)
			return false
		}
	}

	if (!street) {
		console.log('SHOW ERROR!!!')
		return false
	}

	;(async () => {

		let Result

		if ('building' in requests.readState()) {


			const arr =  requests.readState().street.filter(item => item.street === street['STREET_ID'])

			if (arr.length) {
				Result = arr[0].results
			}
		}

		if (!Result) {

			Result = await findBuildingInAPI()
		}

		if (Result.length) {

			this.dropList.createDropList(Result)
			this.dropList.filterDropList(list => {

				const newList = list.filter(item => {
					return (item['HOUSE_NUMBER'].toLowerCase().indexOf(str.toLowerCase()) != -1)
				})

				const sortArr = sortItems(newList, str, 'HOUSE_NUMBER')
				return sortArr
			})

			if (this.dropList.filterList.length === 1 && (Store.readState().current ? $(node).val().toLowerCase() === Store.readState().current['sortArr'].toLowerCase() : false)) {
				$(node).siblings('.ttk__input__droplist').remove()
				return false
			}

			this.addDropDown()

		} else {

			$(node).siblings('.ttk__input__droplist').remove()
		}
	})()
}