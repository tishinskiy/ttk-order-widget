export default (name = false, list = []) => {
	if (name) {
		const newList = list.map(item => {
			return $('<a>', {
				href: 'javascript:;',
				html: item['EXTERNAL_NAME']
			})
		})

		return $('<div>', {
			class: 'doroplist'
		}).append(newList)
	}
}