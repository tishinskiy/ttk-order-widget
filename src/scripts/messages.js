const getModalWrap = function() {
	let wrap = $(this.node).find('.ttk__modal__wrap')

	if (!wrap.length) {

		wrap = $('<div>', {
			class: 'ttk__modal__wrap'
		})
		$(this.node)
			.append(wrap)
			.addClass('ttk__order-widget--modal')
	}

	return wrap
}


export const showPreloader = function() {

	const preloader = $('<div>', {
		class: 'ttk__preloader',
		html: 'loading...'
	})

	getModalWrap.call(this).html(preloader)
}

export const hidePreloader = function() {

	$(this.node).find('.ttk__preloader').eq(0).remove()
}

export const hideModal = function() {
	$(this.node).find('.ttk__modal__wrap').eq(0).remove()
	$(this.node).removeClass('ttk__order-widget--modal')
}

export const showMessage = function(message) {

	const content = $('<div>', {
		class: 'ttk__message',
		html: message
	})

	hidePreloader.call(this)

	getModalWrap.call(this).html(content).on('click', hideModal.bind(this))
}

