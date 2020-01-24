export default function( direction ) {

	const store = this.store.readState()[this.name]

	const addFocusItem = (key) => {

		store.updateState(state => ({
			...state,
			focus: store.readState().results[key]
		}))
	}
	
	const dropList = $(this.node).siblings('.ttk__input__droplist')

	if (dropList.length) {

		const listHeight = dropList[0].scrollHeight
		const active = dropList.find('.ttk__droplist__item--focused')


		switch (direction) {

			case 'ArrowUp' :
				
				
				const prev = active.length ? active.prev('.ttk__droplist__item') : dropList.find('.ttk__droplist__item').eq(0)

				if (prev.length) {

					addFocusItem(prev.attr('key'))
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

				const next = active.length ? active.next('.ttk__droplist__item') : dropList.find('.ttk__droplist__item').eq(0)

				if (next.length) {

					addFocusItem(next.attr('key'))
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

				if (active.length) {
					
					dropList.scrollTop(active.offset().top - dropList.offset().top + dropList.scrollTop())
				}
				break
		}
	}
}