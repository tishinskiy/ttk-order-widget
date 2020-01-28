import changeCity from './changeCity'
import changeStreet from './changeStreet'
import changeBuilding from './changeBuilding'

const buildValue = (value, str) => {

	if (value.toLowerCase().indexOf(str.toLowerCase()) === -1) {
		return value
	} else {

		const start = value.toLowerCase().indexOf(str.toLowerCase())
		const finish = start + str.length
		
		return `${value.slice(0, start)}<span class="ttk__droplist-item--blue">${value.slice(start, finish)}</span>${value.slice(finish, value.length)}`
	}
}

export default function () {

	const thas = this
	const name = this.name
	const store = this.store.readState()[this.name]
	const list = this.dropList.filterList
	const str = $(this.node).val().length ? $(this.node).val() : false
	const current = 'current' in store.readState() ? store.readState().current : false

	switch (name) {
		case 'city':
			return list.map(item => {

				const html = !!str ? buildValue(item['EXTERNAL_NAME'], str) : item['EXTERNAL_NAME']
				const link = $('<a>', {

					href: 'javascript:;',
					html,
					class:`ttk__droplist__item ttk__droplist__item--${name} ${item['EXTERNAL_ID'] === current['EXTERNAL_ID'] ? 'ttk__droplist__item--selected ttk__droplist__item--focused' : ''}`,
					key: item['EXTERNAL_ID']
				})

				link
					.click(function() {

						$(this).closest('.ttk__input__droplist').css({
							display: 'none'
						})

						changeCity.call(thas, item)

					})

					.hover(function(e) {

						if ( !store.readState().droplistItemBloc ) {

							$(this).siblings('.ttk__droplist__item--focused').removeClass('ttk__droplist__item--focused')
							$(this).addClass('ttk__droplist__item--focused')
						}

					})

				return link
			})

			break

		case 'street': 

			return list.map(item => {

				const html = !!str ? buildValue(item['STREET_NAME'], str) : item['STREET_NAME']
				const type = !!str ? buildValue(item['TYPE_NAME'], str) : item['TYPE_NAME']
				const link = $('<a>', {

					href: 'javascript:;',
					html: `<span class="ttk__droplist-item--gray">${type}</span><br>${html}`,
					class:`ttk__droplist__item ttk__droplist__item--${name} ${item['STREET_ID'] == current['STREET_ID'] ? 'ttk__droplist__item--selected ttk__droplist__item--focused' : ''}`,
					key: item['STREET_ID']
				})

				link
					.click(function() {

						$(this).closest('.ttk__input__droplist').css({
							display: 'none'
						})

						changeStreet.call(thas, item)

					})

					.hover(function(e) {

						if ( !store.readState().droplistItemBloc ) {

							$(this).siblings('.ttk__droplist__item--focused').removeClass('ttk__droplist__item--focused')
							$(this).addClass('ttk__droplist__item--focused')
						}

					})

				return link
			})
			break

		case 'building':
			return list.map(item => {


				const html = !!str ? buildValue(item['FULL_NAME'], str) : item['FULL_NAME']
				const link = $('<a>', {

					href: 'javascript:;',
					html,
					class:`ttk__droplist__item ttk__droplist__item--${name} ${item['BUILDING_ID'] === current['BUILDING_ID'] ? 'ttk__droplist__item--selected ttk__droplist__item--focused' : ''}`,
					key: item['BUILDING_ID']
				})

				link
					.click(function() {

						$(this).closest('.ttk__input__droplist').css({
							display: 'none'
						})

						changeBuilding.call(thas, item)

					})

					.hover(function(e) {

						if ( !store.readState().droplistItemBloc ) {

							$(this).siblings('.ttk__droplist__item--focused').removeClass('ttk__droplist__item--focused')
							$(this).addClass('ttk__droplist__item--focused')
						}

					})

				return link
			})

			break

		default:
			break


	}

	// if (name) {


	// } else {
	// 	return false
	// }
}