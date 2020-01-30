import errors from './errors'
export default function() {

	if (this.timer) {

		clearTimeout(this.timer)
	}

	const block = (() => {

		if (!$(this.node).find('.ttk__error__wrap').length) {

			const block = $('<diV>', {
				class: 'ttk__error__wrap',
			}).append(
				$('<a>', {
					href: "javascript:;",
					class: "ttk__error__close"
				}),
				$('<div>', {
					class: 'ttk__error__content'
				})
			)
			$(this.node).append(block)
			return block
		} else {
			return $(this.node).find('.ttk__error__wrap')
		}
	})()

	block.on('click', function(){
		block.slideUp(200)
	})

	const error = this.store.readState().error

	const content = block.find('.ttk__error__content')

	if (error && errors[error.code] ) {
		content.html($('<p>', {html: errors[error.code]}))
		block.slideDown('fast')
		$(error.node)
			.addClass('ttk__input--error')
	}

	this.timer = setTimeout(() => {
		block.slideUp('fast')
	}, 2000)
}
