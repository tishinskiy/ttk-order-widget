import buildDropList from './buildDropList'

export default function() {

	const list = buildDropList.call(this)

	console.log('list', list)

	if (list.length) {

		let block

		if (! $(this.node).siblings(".ttk__input__droplist").length) {

			block = $('<div>', {
				class: 'ttk__input__droplist ttk__droplist'
			})
			block.insertAfter($(this.node))
		} else {

			block = $(this.node).siblings(".ttk__input__droplist")
		}

		block
			.html(list)
			.css({
				display: 'block'
			})

		return true
	} else {

		$(this.node).siblings(".ttk__input__droplist").remove()
		return false
	}

}