import sortItems from './sortItems'
import jsonpRequest from './jsonpRequest'
import scrollDroplist from './scrollDroplist'
import { typeInValue } from './streetTypes'
import fieldsRevision from './fieldsRevision'
import {strict} from './defaultParams'

export default function() {

	const node = this.node
	const Store = this.store.readState()[this.name]
	const street = this.store.readState().street.readState().current
	const requests = this.store.readState().Requests

	let str = $(node).val()


	if (!fieldsRevision.call(this, ['city', 'street'])) return false

	if (str.length < 1) return false

	const findBuildingInAPI = async () => {

		try {

			const result = await jsonpRequest(strict.api[this.name], {
					street: street['STREET_ID'],
				})

			const results = {}

			try {

				for (let i = 0; i < result.results.length; i++) {
					const item = result.results[i]
					results[item['BUILDING_ID']] = item
					item['key'] = item['BUILDING_ID']
					item['FULL_NAME'] = `${item['HOUSE_NUMBER']}${item['CORPUS'] !== '' ? ` корпус ${item['CORPUS']}` : '' }`
				}

			} catch(e) {
				console.log('ERR => ', e)
				// results = {}
			}

			const newItems = {
				street: street['STREET_ID'],
				results: result.results
			}

			requests.updateState(state => ({
				...state,
				[this.name]: !!state[this.name] ? [ ...state[this.name], newItems ] : [ newItems ]
			}))

			Store.updateState(state => ({
				...state,
				resuts: result.results,
				items: state.items ? {
					...state.items,
					...results
				} : {
					...results
				}
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


			const arr =  requests.readState().building.filter(item => item.street === street['STREET_ID'])

			if (arr.length) {
				Result = arr[0].results
			}
		}
		if (!Result) {

			Result = await findBuildingInAPI()
		}

		this.dropList.createDropList(Result)
		if (Result.length) {

			this.dropList.filterDropList(list => {


				const newList = list.filter(item => {
					return (item['FULL_NAME'].toLowerCase().indexOf(str.toLowerCase()) != -1)
				})

				const sortArr = sortItems(newList, str, 'FULL_NAME')

				return sortArr
			})

			if (this.dropList.filterList.length === 1 && ($(node).val().toLowerCase() === this.dropList.filterList[0]['FULL_NAME'].toLowerCase())) {
				$(node).siblings('.ttk__input__droplist').remove()
				return false
			}

			this.addDropDown()

		} else {

			$(node).siblings('.ttk__input__droplist').remove()
		}
	})()
}
