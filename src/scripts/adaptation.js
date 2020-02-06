
const getStyle = (width) => {

	const breackPoints = {
		xs: 300,
		sm: 576,
		lm: 768,
		md: 992,
		// ld: 1200,
	}

	if (width <= breackPoints.xs) {
		return 'xs'
	}

	if (width > breackPoints.xs && width <= breackPoints.sm) {
		return 'sm'
	}

	if (width > breackPoints.sm && width <= breackPoints.lm) {
		return 'lm'
	}

	if (width > breackPoints.lm && width <= breackPoints.md) {
		return 'md'
	}

	if (width > breackPoints.md) {
		return 'ld'
	}
}

export default function() {

	const node = this.node

	$(window).on('load resize', () => {

		const newClass = `ttk__coverage-widget--width-${getStyle($(node).width())}`

		if (!($(node)).hasClass(newClass)) {

			$(node)
				.removeClass((index, className) => {
					return (className.match (/(^|\s)ttk__coverage-widget--width-\S+/g) || []).join(' ');
				})
				.addClass(`ttk__coverage-widget--width-${getStyle($(node).width())}`)
		}
	})
}
