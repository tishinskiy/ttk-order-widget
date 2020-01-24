import fieldsActionFocus from './fieldsActionFocus'
import fieldsActionFocusout from './fieldsActionFocusout'
import fieldsActionInpit from './fieldsActionInpit'
import scrollDroplist from './scrollDroplist'

export default function(e) {

	const node = this.node
	const store = this.store.readState()[this.name]
	const changeEvent = `change${this.name[0].toUpperCase()}${this.name.slice(1)}`

	$(node)

		.on('input', fieldsActionInpit.bind(this))

		.on('focus', fieldsActionFocus.bind(this))

		.on('focusout', event => {
			$(node).val($(node).val().replace(/\s*$/,''))

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

						store.updateState(state => ({
							...state,
							droplistItemBloc: true
						}))

						timer = setTimeout(() => {
							store.updateState(state => ({
								...state,
								droplistItemBloc: false
							}))
						}, 100)
					}
					return false
					break

				case "Enter":

					if (store.readState().focus) {
						store.updateState(state => ({
							...state,
							current: store.readState().focus,
							focus: false
						}))

						this.observable.eventEmitter(changeEvent)
					}

					if ($(node).val() !== '') {
						
						$(`[tabindex=${1 + +$(node).attr('tabindex')}]`).focus()
					}

					return false
					break

				default:
					break
			}
		})
}