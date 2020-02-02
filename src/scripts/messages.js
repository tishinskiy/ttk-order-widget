export const showPreloader = function() {
	console.log(7, this);

	const modal = $('<div>', {
		class: 'ttk__modal__wrap'
	})

	const preloader = $('<div>', {
		class: 'ttk__preloader',
		html: 'loading...'
	})

	$(this.node)
		.append(modal.html(preloader))
		.addClass('ttk__order-widget--modal')
}