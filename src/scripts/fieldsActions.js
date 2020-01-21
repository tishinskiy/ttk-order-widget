import fieldsActionFocus from './fieldsActionFocus'
import fieldsActionFocusout from './fieldsActionFocusout'
import fieldsActionInpit from './fieldsActionInpit'
import scrollDroplist from './scrollDroplist'

export default function() {

	const node = this.node

	$(node)

		.on('input', fieldsActionInpit.bind(this))

		.on('focus', fieldsActionFocus.bind(this))

		.on('focusout', event => {

			fieldsActionFocusout.call(this)
			$(node).attr('placeholder', '')

			if (event.originalEvent && $(event.originalEvent.relatedTarget).hasClass('ttk__droplist__item')) {
				return false
			}
			if (!$(node).val().length) {

				$(node).siblings('.ttk__input__label').removeClass('ttk__input__label--focused')
			}

			$(node).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')

			$(node).siblings('.ttk__input__droplist').hide()


		})

		.on('keydown', (event) => {

			switch (event.key) {

				case "ArrowDown":
				case "ArrowUp":
					let timer
					if (scrollDroplist.call(this, event.key)) {

						if (timer) clearTimeout(timer)

						this.store.readState()[this.name].updateState(state => ({
							...state,
							droplistItemBloc: true
						}))

						timer = setTimeout(() => {
							this.store.readState()[this.name].updateState(state => ({
								...state,
								droplistItemBloc: false
							}))
						}, 100)
					}
					return false
					break

				case "Enter":
					console.log("Enter")

					const dropList = $(this).siblings('.ttk__input__droplist')

					if (dropList.length) {
						const active = dropList.find('.ttk__droplist__item--focused')

						if( !active.hasClass('ttk__droplist__item--selected') ) {
							active.trigger('click');
						}
					}

					return false
					break

				default:
					break
			}
		})
}