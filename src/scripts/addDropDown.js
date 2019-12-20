export default function(list) {

	let block

	if (! $(this).siblings(".ttk__input__droplist").length) {

		block = $('<div>', {
			class: 'ttk__input__droplist ttk__droplist'
		})
		block.insertAfter($(this))
	} else {

		block = $(this).siblings(".ttk__input__droplist")
	}

	block
		.html(list)
		.css({
			display: 'block'
		})
}