import {readStore} from './Store'

export default function(name){

	console.log($(this))

	switch (name) {
		case 'city':

		const Store = readStore.call(this).City
			if ($(this).val() === '') {
				$(this).val('current' in Store.readState() ? Store.readState().current['EXTERNAL_NAME'] : '')
			}

			break

		default:
			break
	}
}