import sortItems from './sortItems'
import jsonpRequest from './jsonpRequest'
import scrollDroplist from './scrollDroplist'
import { typeInValue } from './streetTypes'
import {strict} from './defaultParams'

export default function(){
	const thas = this
	const node = this.node
	const Store = this.store.readState()[this.name]
	const city =  this.store.readState().city.readState().current
	const requests = this.store.readState().Requests

	if (!this.store.readState().city.readState().Input.errorRevision()) return false

	if ($(node).val().length == 0) {

		$(node).siblings('label')
			.html('Улица')
			.removeClass('ttk__input__label--fixed')
			this.type = null
		return false
	}

	if ($(node).val().length < 3) {
		$(node).siblings('.ttk__input__droplist').remove()
		return false
	}

	let str = $(node).val()

	const type = typeInValue(str)

	if (!!type) {

		this.type = typeInValue(str)
		str = str.slice(this.type.length + 1)
		$(node).val(str)
		$(node).siblings('label').html(this.type[0].toUpperCase() + this.type.slice(1)).addClass('ttk__input__label--fixed')
	}

	const findStreetInAPI = async (str) => {

		str = str.slice(0, 3).toLowerCase()

		try {

			const result = await jsonpRequest(strict.api[this.name], {
					city: city['INTERNAL_ID'],
					search: str
				})

			const results = {}

			try {

				for (let i = 0; i < result.results.length; i++) {
					results[result.results[i]['STREET_ID']] = result.results[i]
					result.results[i]['key'] = result.results[i]['STREET_ID']
				}

			} catch(e) {
				console.log('ERR => ', e)
				// results = {}
			}

			const newItems = {

				city: city['EXTERNAL_ID'],
				search: str,
				results: result.results
			}

			requests.updateState(state => ({
				...state,
				[this.name]: !!state[this.name] ? [ ...state[this.name], newItems ] : [ newItems ]
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

			return result.results

		} catch(error) {

			console.log('street error', error)
			return false
		}
	}

	if (!city) {
		console.log('SHOW ERROR!!!')
		return false
	}

	;(async () => {

		let Result

		if ('street' in requests.readState()) {

			const arr = requests.readState().street.filter(item => {
				return item.city === city['EXTERNAL_ID'] && item.search === str.slice(0, 3).toLowerCase()
			})

			if (arr.length) {
				Result = arr[0].results
			}
		}

		if (!Result) {

			Result = await findStreetInAPI(str)
		}

		this.dropList.createDropList(Result)
		if (Result.length) {

			this.dropList.filterDropList(list => {

				const newList = list.filter(item => {
					return (item['STREET_NAME'].toLowerCase().indexOf(str.toLowerCase().slice(0, 3)) != -1)
				})

				const sortArr = sortItems(newList, str, 'STREET_NAME')
				const sortArrType = sortArr.filter(item => item['TYPE_NAME'].toLowerCase() === this.type)
				const sortArrName = sortArr.filter(item => item['TYPE_NAME'].toLowerCase() !== this.type)

				return !!this.type ? [...sortArrType, ...sortArrName] : [ ...sortArrName, ...sortArrType]

			})

			if (this.dropList.filterList.length === 1 && $(node).val().toLowerCase() === this.dropList.filterList[0]['STREET_NAME'].toLowerCase()) {
				$(node).siblings('.ttk__input__droplist').remove()
				return false
			}

			this.addDropDown()

		} else {
			$(node).siblings('.ttk__input__droplist').remove()
		}
	})()
}
