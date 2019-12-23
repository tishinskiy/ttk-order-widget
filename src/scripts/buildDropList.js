import changeCity from './changeCity'
import { readStore } from './Store'

const buildValue = (value, str) => {

	const start = value.toLowerCase().indexOf(str.toLowerCase())
	const finish = start + str.length
	
	return `${value.slice(0, start)}<span>${value.slice(start, finish)}</span>${value.slice(finish, value.length)}`
}

export default (name = false, list = [], str = false, current = false) => {

	if (name) {

		return list.map(item => {

			const html = !!str ? buildValue(item['EXTERNAL_NAME'], str) : item['EXTERNAL_NAME']
			const link = $('<a>', {

				href: 'javascript:;',
				html,
				class:`ttk__droplist__item ${item['INTERNAL_ID'] == current['INTERNAL_ID'] ? 'ttk__droplist__item--selected' : ''}`
			})

			link.click(function() {

				$(this).closest('.ttk__input__droplist').css({
					display: 'none'
				})

				changeCity.call(this, item, readStore.call(this).City)

			})

			return link
		})

	} else {
		return false
	}
}