// import addDropDown from './addDropDown'
import sortItems from './sortItems'
// import {readStore} from './Store'
import jsonpRequest from './jsonpReqyest'
// import createDropDown from './dropDown'
import scrollDroplist from './scrollDroplist'
import { typeInValue } from './streetTypes'

export default function(go = false){
	console.log(this)
	const thas = this
	const node = this.node
	const Store = this.store.readState()[this.name]
	const city =  this.store.readState().city.readState().current

	let str = $(this.node).val()

	let type = typeInValue(str)

	console.log('type', type)

	if (!!type) {

		str = str.replace(type, '').replace(' ', '', 0)
		$(thas).val(str)
		$(thas).siblings('label').html(type)
		Store.Street.updateState(state => ({
			...state,
			type
		}))
	}

	const findStreetInAPI = async (str) => {

		str = str.slice(0, 3)

		try {

			const result = await jsonpRequest('https://gate.myttk.ru/gate/jsonp/street.php', {
					city: city['INTERNAL_ID'],
					search: str
				})

			let results

			try {

				results = result.results
			} catch(e) {

				results = []
			}

			const newStreet = {
				city: city['INTERNAL_ID'],
				search: str,
				results
			}

			Store.Requests.updateState(state => ({
				...state,
				street: !!state.street ? [ ...state.street, newStreet ] : [ newStreet ]
			}))

			return results

		} catch(error) {

			console.log('street error', error)
			return false
		}
	}

	const showDropdown = (thas) => {

		thas.dropdown.filterDropList(list => {

			try {
				type = Store.Street.readState().type

			} catch(err) {}

			if (!!type) {

				const newList = list.filter(item => {

					return (item['TYPE_NAME'].toLowerCase() === type && item['STREET_NAME'].toLowerCase().indexOf($(thas).val().toLowerCase()) != -1)
				})

				console.log('newList', newList);

				return sortItems(newList, str, 'STREET_NAME')

			} else {

				const newList = list.filter(item => {

					return (item['STREET_NAME'].toLowerCase().indexOf($(thas).val().toLowerCase().slice(0, 3)) != -1)
				})

				const listName = sortItems(newList, str, 'STREET_NAME')

				const newList2 = list.filter(item => {

					return (item['TYPE_NAME'].toLowerCase().indexOf($(thas).val().toLowerCase()) != -1)
				})

				const listType = sortItems(newList2, '', 'STREET_NAME')

				return [...listName, ...listType]
			}

		})



		if(this.addDropDown()) {

			console.log('1111=======11111')

			// scrollDroplist.call(thas)
		}
	}


	if (!city) {
		console.log('SHOW ERROR!!!')
		return false
	}

	;(async () => {

		let Result

		const requests = Store.Requests.readState()

		if ('street' in requests) {

			const exist = requests.street.some(item => {
				return item.city === city['INTERNAL_ID'] && item.search === str.slice(0, 3)
			})

			if (exist) {

				Result =  requests.street.filter(item => {
					return item.city === city['INTERNAL_ID'] && item.search === str.slice(0, 3)
				})[0].results

			}
		}

		console.log($(thas).val())

		if (!Result) {

			Result = await findStreetInAPI(str)
		}

		console.log('Result => ', Result)

		try {

			if (Result.length) {

				thas.dropdown = createDropDown(Store)
				thas.dropdown.createDropList(Result)
				showDropdown(thas)

			} else {

				$(thas).siblings('.ttk__input__droplist').remove()
			}
		} catch(err) {

			$(thas).siblings('.ttk__input__droplist').remove()
		}

	})()
}