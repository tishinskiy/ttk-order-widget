import addDropDown from './addDropDown'

export default function(name){

	const thas = this

	switch (name) {
		case 'city':

			thas.dropdown.filterDropList(list => {

				return list.filter(item => {

					return (item['EXTERNAL_NAME'].toLowerCase().indexOf($(thas).val().toLowerCase()) != -1)
				})
			})
			addDropDown.call(thas, thas.dropdown.buildDropList('city'))
			break

		default:
			break
	}
}