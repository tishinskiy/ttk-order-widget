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

export const showMessage = function(message, obj) {


	const content = $('<div>', {
		class: 'ttk__message',
		html: message
	})

	const close = $('<button>', {
		class: 'ttk__message__close'
	})
	close.on('click', () => {
		hideModal.call(this)
	})

	hidePreloader.call(this)
	content.append(close)

	if(typeof this.store.readState().params.onButtonAction === 'function' && !!obj) {

		content.append(obj)
	}

	getModalWrap.call(this).html(content)

	setTimeout(() => {

		$(window).on('click', (e) => {

			if (!$(e.target).closest(content).length && content.is(':visible')) {

				hideModal.call(this)
			}
		})
	}, 0)
}

