import changeCity from './changeCity'
import { readStore } from './Store'

export default (name = false, list = []) => {


	if (name) {
		return list.map(item => {
			const link = $('<a>', {
				href: 'javascript:;',
				html: item['EXTERNAL_NAME'],
				class:'ttk__droplist__item'
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