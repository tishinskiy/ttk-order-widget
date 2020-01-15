import fieldsActionInpit from './fieldsActionInpit'
import fieldsActionFocus from './fieldsActionFocus'
import fieldsActionblur from './fieldsActionblur'
import {readStore} from './Store'
import scrollDroplist from './scrollDroplist'
import { hoverBlock } from './eventBusActions'

export default function(inputs) {

	for (let key in inputs) {

		const Store = readStore.call(inputs[key])

		$(inputs[key])

			.on('input focus focusout', function(event){

				switch (event.type) {

					case 'focus':
						console.log('focus')
						fieldsActionFocus.call(this, key)
						break

					case 'input':
						console.log('input')

						if ($(this).val().indexOf(' ') === 0) {
							$(this).val($(this).val().slice(0, 0))
							return false
						}

						fieldsActionInpit.call(this, key)
						break

					case 'focusout':
						console.log('focusout')
						fieldsActionblur.call(this, key)
						break

					default:
						break
				}
			})

			.focus(function() {

				$(this).siblings('.ttk__input__label').addClass('ttk__input__label--focused')
				$(this).closest('.ttk__input__wrap').addClass('ttk__input__wrap--focused')
			})

			.focusout(function(event) {

				const thas = $(this)

				thas.attr('placeholder', '')

				if (event.originalEvent && $(event.originalEvent.relatedTarget).hasClass('ttk__droplist__item')) {
					return false
				}
				if (!thas.val().length) {

					thas.siblings('.ttk__input__label').removeClass('ttk__input__label--focused')
				}

				$(this).closest('.ttk__input__wrap').removeClass('ttk__input__wrap--focused')

				thas.siblings('.ttk__input__droplist').hide()

			})

			.on('keydown', function(event){
				switch (event.key) {

					case "ArrowDown":
					case "ArrowUp":

						if (scrollDroplist.call(this, event.key)) hoverBlock.call(this)
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
}