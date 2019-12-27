export default function( direction ) {

	const dropList = $(this).siblings('.ttk__input__droplist')

	if (dropList.length) {

		const listHeight = dropList[0].scrollHeight
		let active = dropList.find('.ttk__droplist__item--focused')

		switch (direction) {

			case 'ArrowUp' :
				console.log(direction)
				const prev = active.prev('.ttk__droplist__item')
				if (prev.length) {
					prev.addClass('ttk__droplist__item--focused')
					active.removeClass('ttk__droplist__item--focused')

					if (prev.offset().top < dropList.offset().top) {
						dropList.scrollTop(dropList.scrollTop() - (dropList.offset().top - prev.offset().top))
						return true
					}
				}
				return false
				break

			case 'ArrowDown' :
				console.log(direction)
				const next = active.next('.ttk__droplist__item')
				if (next.length) {
					next.addClass('ttk__droplist__item--focused')
					active.removeClass('ttk__droplist__item--focused')

					if (next.offset().top + next.innerHeight() > dropList.offset().top + dropList.innerHeight()) {
						

						dropList.scrollTop(dropList.scrollTop() + ((next.offset().top + next.innerHeight()) - (dropList.offset().top + dropList.innerHeight())))

						return true
					}
				}

				return false
				break

			default : //auto
				dropList.scrollTop(active.offset().top - dropList.offset().top + dropList.scrollTop())
				break
		}
	}
}